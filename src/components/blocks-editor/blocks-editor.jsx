import { useCallback } from 'preact/hooks';
import { useAppContext, useProjectContext } from '@blockcode/core';
import { BlocksEditor } from '@blockcode/blocks';
import { ArduinoGenerator, buildBlocks, VARIABLE_TYPES } from '../../blocks/blocks';
import { extensionTags } from './extension-tags';

const generator = new ArduinoGenerator();

const handleExtensionsFilter = () => ['arduino'];

export function ArduinoBlocksEditor() {
  const { tabIndex } = useAppContext();

  const { meta } = useProjectContext();

  const handleBuildinExtensions = useCallback(() => {
    return buildBlocks(meta.value.boardType, meta.value.classicEvents);
  }, [meta.value.boardType, meta.value.classicEvents]);

  return (
    <BlocksEditor
      enableCodePreview
      enableProcedureReturns
      disableSensingBlocks
      extensionTags={extensionTags}
      disableGenerateCode={tabIndex.value !== 0}
      variableTypes={VARIABLE_TYPES}
      generator={generator}
      onBuildinExtensions={handleBuildinExtensions}
      onExtensionsFilter={handleExtensionsFilter}
    />
  );
}
