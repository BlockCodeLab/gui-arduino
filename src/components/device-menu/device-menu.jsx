import { nanoid } from '@blockcode/utils';
import { useProjectContext, setAlert, delAlert, openPromptModal } from '@blockcode/core';

import { Spinner, Text, MenuSection, MenuItem } from '@blockcode/core';

let downloadAlertId = null;

const removeDownloading = () => {
  delAlert(downloadAlertId);
  downloadAlertId = null;
};

const getHex = async (code, fqbn='arduino:avr:uno') => {
  const params =  {
        sketch: code,
        fqbn: fqbn,
        client: 'blockcode' //这行临时的，目前没有这个功能，可以去掉
   }
   const data = JSON.stringify({ json: JSON.stringify(params)})
   const res = await fetch('https://maker.huiwancode.com/api_v1/getarduinocompile/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    })
    const resData = await res.json()
    return resData?.data?.hex
   
}

const downloadingAlert = () => {
  if (!downloadAlertId) {
    downloadAlertId = nanoid();
  }
};

const errorAlert = (err) => {
  if (err === 'NotFoundError') return;
  setAlert('connectionError', 1000);
};

export function DeviceMenu({ itemClassName }) {
  const { key, files, assets } = useProjectContext();

  return (
    <>
      <MenuSection>
        <MenuItem
          disabled={downloadAlertId}
          className={itemClassName}
          label={
            <Text
              id="gui.menubar.device.download"
              defaultMessage="Download program"
            />
          }
          onClick={async () => {
            if (downloadAlertId) return;
          }}
        />
      </MenuSection>
    </>
  );
}
