import styles from './device-menu.module.css';

import deviceIcon from './icon-device.png';

export function DeviceIcon() {
  return (
    <img
      className={styles.deviceIcon}
      src={deviceIcon}
    />
  );
}
