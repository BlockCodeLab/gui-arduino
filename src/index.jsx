import './l10n';

import { svgAsDataUri } from '@blockcode/utils';
import { ScratchBlocks, blocksTab, codeReviewTab } from '@blockcode/blocks';

import { Text } from '@blockcode/core';
import { CodeReview } from '@blockcode/blocks';
import { ArduinoBlocksEditor } from './components/blocks-editor/blocks-editor';
import { DeviceIcon } from './components/device-menu/device-icon';
import { DeviceMenu } from './components/device-menu/device-menu';
import { defaultProject } from './lib/default-project';

export default {
  onNew() {
    return defaultProject;
  },

  onSave(files, assets) {
    const extensions = [];
    files = files.map((file) => {
      extensions.push(file.extensions);
      return {
        id: file.id,
        type: file.type,
        xml: file.xml,
      };
    });
    const meta = {
      extensions: Array.from(new Set(extensions.flat())),
    };
    return {
      meta,
      files,
      assets,
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
      label: (
        <Text
          id="arduino.menubar.device"
          defaultMessage="Device"
        />
      ),
      Menu: DeviceMenu,
    },
  ],

  tabs: [
    {
      ...blocksTab,
      Content: ArduinoBlocksEditor,
    },
    {
      ...codeReviewTab,
      Content: CodeReview,
    },
  ],
};
