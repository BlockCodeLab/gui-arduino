import { useEffect, useCallback } from 'preact/hooks';
import { classNames } from '@blockcode/utils';
import { useProjectContext, setMeta, Text, MenuSection, MenuItem } from '@blockcode/core';
import { ArduinoBoards } from '../../lib/boards';
import styles from './device-menu.module.css';

import checkIcon from './icon-check.svg';

export function BoardsSection({ itemClassName }) {
  const { meta } = useProjectContext();

  useEffect(() => {
    if (!meta.value.boardType) {
      setMeta('boardType', ArduinoBoards.ArduinoUno);
    }
  }, []);

  const chooseBoardHandler = useCallback(
    (boardType) => () => {
      setMeta({ boardType });
    },
    [],
  );

  return (
    <>
      <MenuSection>
        <MenuItem
          className={itemClassName}
          onClick={chooseBoardHandler(ArduinoBoards.ArduinoUno)}
        >
          <img
            className={classNames(styles.checkIcon, {
              [styles.checked]: meta.value.boardType === ArduinoBoards.ArduinoUno,
            })}
            src={checkIcon}
          />
          <Text
            id="arduino.menubar.device.uno"
            defaultMessage="Arduino Uno"
          />
        </MenuItem>
        {/* <MenuItem
          className={itemClassName}
          onClick={chooseBoardHandler(ArduinoBoards.ArduinoUnoR4)}
        >
          <img
            className={classNames(styles.checkIcon, {
              [styles.checked]: meta.value.boardType === ArduinoBoards.ArduinoUnoR4,
            })}
            src={checkIcon}
          />
          <Text
            id="arduino.menubar.device.unoR4"
            defaultMessage="Arduino Uno R4"
          />
        </MenuItem> */}
        <MenuItem
          className={itemClassName}
          onClick={chooseBoardHandler(ArduinoBoards.ArduinoNano)}
        >
          <img
            className={classNames(styles.checkIcon, {
              [styles.checked]: meta.value.boardType === ArduinoBoards.ArduinoNano,
            })}
            src={checkIcon}
          />
          <Text
            id="arduino.menubar.device.nano"
            defaultMessage="Arduino Nano"
          />
        </MenuItem>
      </MenuSection>

      <MenuSection>
        <MenuItem
          className={itemClassName}
          onClick={chooseBoardHandler(ArduinoBoards.BLEUNO)}
        >
          <img
            className={classNames(styles.checkIcon, {
              [styles.checked]: meta.value.boardType === ArduinoBoards.BLEUNO,
            })}
            src={checkIcon}
          />
          <Text
            id="arduino.menubar.device.bleuno"
            defaultMessage="BLE-UNO/NANO"
          />
        </MenuItem>
      </MenuSection>
    </>
  );
}
