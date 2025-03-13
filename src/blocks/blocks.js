import getPinsBlocks from './pins';
import getTextBlocks from './text';
import getSerialBlocks from './serial';
import getEventsBlocks from './events';
import getControlBlocks from './control';
import getProtocolsBlocks from './protocols';
import getDataBlocks from './data';
import getOperatorsBlocks from './operators';

export { ArduinoGenerator } from './generator';

export function buildBlocks() {
  const pinsBlocks = getPinsBlocks();
  const textBlocks = getTextBlocks();
  const serialBlocks = getSerialBlocks();
  const eventsBlocks = getEventsBlocks();
  const controlBlocks = getControlBlocks();
  const protocolsBlocks = getProtocolsBlocks();
  const operatorsBlocks = getOperatorsBlocks();
  const dataBlocks = getDataBlocks();

  return [
    pinsBlocks,
    textBlocks,
    serialBlocks,
    eventsBlocks,
    controlBlocks,
    protocolsBlocks,
    operatorsBlocks,
    dataBlocks,
  ];
}
