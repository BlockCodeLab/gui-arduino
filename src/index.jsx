import './l10n';

import { svgAsDataUri } from '@blockcode/utils';
import { ScratchBlocks, blocksTab } from '@blockcode/blocks';
import { codeTab } from '@blockcode/code';

import { ArduinoCodeEditor } from './components/code-editor/code-editor';
import { ArduinoBlocksEditor } from './components/blocks-editor/blocks-editor';
import { DeviceIcon } from './components/device-menu/device-icon';
import { DeviceLabel } from './components/device-menu/device-label';
import { DeviceMenu } from './components/device-menu/device-menu';
import { defaultProject } from './lib/default-project';
import { ArduinoBoards } from './lib/boards';

export default {
  onNew() {
    return defaultProject;
  },

  onSave(files, assets, meta) {
    const extensions = [];
    files = files.map((file) => {
      extensions.push(file.extensions);
      return {
        id: file.id,
        type: file.type,
        xml: file.xml,
      };
    });
    return {
      files,
      assets,
      meta: {
        extensions: Array.from(new Set(extensions.flat())),
        boardType: meta.boardType ?? ArduinoBoards.ArduinoUno,
      },
    };
  },

  async onThumb() {
    const workspace = ScratchBlocks.getMainWorkspace();
    if (workspace) {
      const canvas = workspace.getCanvas();
      if (canvas) {
        return await svgAsDataUri(canvas, {});
      }
    }
  },

  onUndo(e) {
    if (e instanceof MouseEvent) {
      const workspace = ScratchBlocks.getMainWorkspace();
      workspace?.undo?.(false);
    }
  },

  onRedo(e) {
    if (e instanceof MouseEvent) {
      const workspace = ScratchBlocks.getMainWorkspace();
      workspace?.undo?.(true);
    }
  },

  onEnableUndo() {
    const workspace = ScratchBlocks.getMainWorkspace();
    return workspace?.undoStack_ && workspace.undoStack_.length !== 0;
  },

  onEnableRedo() {
    const workspace = ScratchBlocks.getMainWorkspace();
    return workspace?.redoStack_ && workspace.redoStack_.length !== 0;
  },

  menuItems: [
    {
      icon: <DeviceIcon />,
      label: <DeviceLabel />,
      Menu: DeviceMenu,
    },
  ],

  tabs: [
    {
      ...blocksTab,
      Content: ArduinoBlocksEditor,
    },
    {
      ...codeTab,
      Content: ArduinoCodeEditor,
    },
  ],
};
