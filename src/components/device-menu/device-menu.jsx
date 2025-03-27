import { nanoid } from '@blockcode/utils';
import { useProjectContext, setAlert, delAlert, openPromptModal } from '@blockcode/core';

import { Spinner, Text, MenuSection, MenuItem } from '@blockcode/core';

let downloadAlertId = null;

const removeDownloading = () => {
  delAlert(downloadAlertId);
  downloadAlertId = null;
};

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
