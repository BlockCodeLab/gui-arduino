import { BlocksEditor } from '@blockcode/blocks';
import { ArduinoGenerator, buildBlocks } from '../../blocks/blocks';

const VARIABLE_TYPES = ['int', 'float', 'boolean', 'char', 'byte', 'String'];

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
