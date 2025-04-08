import { nanoid, classNames } from '@blockcode/utils';
import { useProjectContext, setAlert, delAlert, openPromptModal } from '@blockcode/core';

import { Spinner, Text, MenuSection, MenuItem } from '@blockcode/core';
import { BoardsSection } from './boards-section';
import styles from './device-menu.module.css';
import { BleSerialPort } from '@blockcode/board';
import { ASerialPort } from '@blockcode/board';

let downloadAlertId = null;

const removeDownloading = () => {
  delAlert(downloadAlertId);
  downloadAlertId = null;
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

const parseHex = async (code, fqbn = 'arduino:avr:uno') => {
  const params = {
    sketch: code,
    fqbn: fqbn,
    client: 'blockcode', //这行临时的，目前没有这个功能，可以去掉
  };
  const data = JSON.stringify({ json: JSON.stringify(params) });
  const res = await fetch('https://maker.huiwancode.com/api_v1/getarduinocompile/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: data,
  });
  const resData = await res.json();
  const base64Data = resData?.data?.hex;
  if(base64Data){
    return atob(base64Data);
  }else{
    return null;
  }
};

export function DeviceMenu({ itemClassName }) {
  const { file } = useProjectContext();

  return (
    <>
      <MenuSection>
        <MenuItem
          disabled={downloadAlertId}
          className={classNames(itemClassName, styles.blankCheckItem)}
          label={
            <Text
              id="gui.menubar.device.ble_download"
              defaultMessage="Download program by ble"
            />
          }
          onClick={async () => {
            if (downloadAlertId) return;
            const options = {
              filters: [{ services: ['0000ffe0-0000-1000-8000-00805f9b34fb'] }],
            };
            let gattServer
            try {
              const device = await navigator.bluetooth.requestDevice(options);
              gattServer = await device.gatt.connect();
            } catch (err) {
              console.log(err);
              errorAlert(err.name);
              return;
            }
            downloadingAlert('0.0');
            try {
              const server = new BleSerialPort();
              server.init(gattServer);
              downloadingAlert(25);
              const ret = await parseHex(file.value.content);
              downloadingAlert(50);
              await server.flash(ret);
              downloadingAlert(100);
              await new Promise((resolve) => setTimeout(resolve, 2000));
              server.disconnect();
            } catch (err) {
              errorAlert(err.name);
            }
            removeDownloading();
          }}
        />
        <MenuItem
          disabled={downloadAlertId}
          className={classNames(itemClassName, styles.blankCheckItem)}
          label={
            <Text
              id="gui.menubar.device.usb_download"
              defaultMessage="Download program by usb"
            />
          }
          onClick={async () => {
            if (downloadAlertId) return;
            const options = {
              filters: [],
            };
            let serialPort;
            try {
              serialPort = await navigator.serial.requestPort(options);
              
            } catch (err) {
              console.log(err);
              errorAlert(err.name);
              return;
            }
            downloadingAlert('0.0');
            try {
              const server = new ASerialPort(serialPort);
              server.open({baudRate: 57600})
              await new Promise((resolve) => setTimeout(resolve, 500));
              downloadingAlert(25);
              const ret = await parseHex(file.value.content);
              downloadingAlert(50);
              await server.flashFile(ret);
              downloadingAlert(100);
              await new Promise((resolve) => setTimeout(resolve, 2000));
              server.close();
            } catch (err) {
              errorAlert(err.name);
            }
            removeDownloading();
          }}
        />
      </MenuSection>

      <BoardsSection itemClassName={itemClassName} />
    </>
  );
}
