import { BlocksEditor } from '@blockcode/blocks';
import { ArduinoGenerator, buildBlocks, VARIABLE_TYPES } from '../../blocks/blocks';

const generator = new ArduinoGenerator();

const handleExtensionsFilter = () => ['arduino'];

export function ArduinoBlocksEditor() {
  return (
    <BlocksEditor
      enableProcedureReturns
      disableSensingBlocks
      variableTypes={VARIABLE_TYPES}
      generator={generator}
      onBuildinExtensions={buildBlocks}
      onExtensionsFilter={handleExtensionsFilter}
    />
  );
}
