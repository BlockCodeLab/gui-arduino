import { useCallback } from 'preact/hooks';
import { useAppContext } from '@blockcode/core';
import { BlocksEditor } from '@blockcode/blocks';
import { ArduinoGenerator, buildBlocks, VARIABLE_TYPES } from '../../blocks/blocks';

const generator = new ArduinoGenerator();

const handleExtensionsFilter = () => ['arduino'];

export function ArduinoBlocksEditor() {
  const { appState } = useAppContext();

  const handleBuildinExtensions = useCallback(() => {
    return buildBlocks(appState.value.boardType);
  }, [appState.value?.boardType]);

  return (
    <BlocksEditor
      enableProcedureReturns
      disableSensingBlocks
      variableTypes={VARIABLE_TYPES}
      generator={generator}
      onBuildinExtensions={handleBuildinExtensions}
      onExtensionsFilter={handleExtensionsFilter}
    />
  );
}
