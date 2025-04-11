import { useCallback } from 'preact/hooks';
import { nanoid, classNames, sleepMs } from '@blockcode/utils';
import { useProjectContext, setAlert, delAlert, openPromptModal } from '@blockcode/core';
import { ArduinoUtils } from '@blockcode/board';
import { compile } from '../../lib/compile';

import { Spinner, Text, MenuSection, MenuItem } from '@blockcode/core';
import { BoardsSection } from './boards-section';
import styles from './device-menu.module.css';

let downloadAlertId = null;

const removeDownloading = () => {
  delAlert(downloadAlertId);
  downloadAlertId = null;
};

const compilingAlert = () => {
  if (!downloadAlertId) {
    downloadAlertId = nanoid();
  }
  setAlert('compiling', { id: downloadAlertId });
};

const compileErrorAlert = () => {
  if (!downloadAlertId) {
    downloadAlertId = nanoid();
  }
  setAlert('compileError', { id: downloadAlertId });
};

const downloadingAlert = (progress) => {
  if (!downloadAlertId) {
    downloadAlertId = nanoid();
  }
  if (progress < 100) {
    setAlert({
      id: downloadAlertId,
      icon: <Spinner level="success" />,
      message: (
        <Text
          id="gui.alert.downloadingProgress"
          defaultMessage="Downloading...{progress}%"
          progress={progress}
        />
      ),
    });
  } else {
    setAlert('downloadCompleted', { id: downloadAlertId });
    setTimeout(removeDownloading, 2000);
  }
};

const errorAlert = (err) => {
  if (err === 'NotFoundError') return;
  setAlert('connectionError', 1000);
};

const downloadProgram = async (device, content) => {
  // const checker = ArduinoUtils.check(device).catch(() => {
  //   errorAlert();
  //   removeDownloading();
  // });

  // 编译
  compilingAlert();
  let hex;
  try {
    hex = await compile(content);
  } catch (err) {}
  if (!hex) {
    compileErrorAlert();
    return;
  }

  downloadingAlert(0);
  try {
    await ArduinoUtils.write(device, hex, downloadingAlert);
    await sleepMs(500);
    device.disconnect();
  } catch (err) {
    console.log(err);
    errorAlert(err.name);
    removeDownloading();
  }

  // checker.cancel();
};

export function DeviceMenu({ itemClassName }) {
  const { file } = useProjectContext();

  const handleDownload = useCallback(async () => {
    if (downloadAlertId) return;

    let device;
    try {
      device = await ArduinoUtils.connect({ baudRate: 115200 });
    } catch (err) {
      errorAlert(err.name);
    }
    if (!device) return;
    await downloadProgram(device, file.value.content);
  }, []);

  const handleDownloadBLE = useCallback(async () => {
    if (downloadAlertId) return;

    let device;
    try {
      device = await ArduinoUtils.connectBLE();
    } catch (err) {
      errorAlert(err.name);
    }
    if (!device) return;
    await downloadProgram(device, file.value.content);
  }, []);

  return (
    <>
      <MenuSection>
        <MenuItem
          disabled={downloadAlertId}
          className={classNames(itemClassName, styles.blankCheckItem)}
          label={
            <Text
              id="arduino.menubar.device.download"
              defaultMessage="Download program via Serial Port"
            />
          }
          onClick={handleDownload}
        />

        <MenuItem
          disabled={downloadAlertId}
          className={classNames(itemClassName, styles.blankCheckItem)}
          label={
            <Text
              id="arduino.menubar.device.downloadBle"
              defaultMessage="Download program via Bluetooth (BLE)"
            />
          }
          onClick={handleDownloadBLE}
        />
      </MenuSection>

      <BoardsSection itemClassName={itemClassName} />
    </>
  );
}
