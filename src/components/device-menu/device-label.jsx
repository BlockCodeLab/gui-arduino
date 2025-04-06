import { useAppContext, Text } from '@blockcode/core';
import { ArduinoBoards } from '../../lib/boards';

import deviceIcon from './icon-device.png';

export function DeviceLabel() {
  const { appState } = useAppContext();

  if (appState.value?.boardType === ArduinoBoards.ArduinoUnoR4) {
    return (
      <Text
        id="arduino.menubar.device.unoR4"
        defaultMessage="Arduino Uno R4"
      />
    );
  }

  if (appState.value?.boardType === ArduinoBoards.ArduinoNano) {
    return (
      <Text
        id="arduino.menubar.device.nano"
        defaultMessage="Arduino Nano"
      />
    );
  }

  return (
    <Text
      id="arduino.menubar.device.uno"
      defaultMessage="Arduino Uno"
    />
  );
}
