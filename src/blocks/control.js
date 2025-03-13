import { translate, themeColors } from '@blockcode/core';
import { ScratchBlocks } from '@blockcode/blocks';

export default () => ({
  id: 'control',
  name: '%{BKY_CATEGORY_CONTROL}',
  themeColor: themeColors.blocks.control.primary,
  inputColor: themeColors.blocks.control.secondary,
  otherColor: themeColors.blocks.control.tertiary,
  blocks: [
    {
      // 等待
      id: 'wait',
      text: translate('arduino.blocks.wait', 'wait %1 milliseconds'),
      inputs: {
        MS: {
          type: 'integer',
          defaultValue: 500,
        },
      },
    },
    '---',
    {
      // 重复次数
      id: 'repeat',
      text: ScratchBlocks.Msg.CONTROL_REPEAT,
      repeat: true,
      inputs: {
        TIMES: {
          type: 'integer',
          defaultValue: 10,
        },
      },
    },
    {
      // 无限重复
      id: 'forever',
      text: ScratchBlocks.Msg.CONTROL_FOREVER,
      repeat: true,
      end: true,
    },
    '---',
    {
      // 如果
      id: 'if',
      text: ScratchBlocks.Msg.CONTROL_IF,
      substack: true,
      inputs: {
        CONDITION: {
          type: 'boolean',
        },
      },
    },
    {
      // 否则，如果
      id: 'elseif',
      text: translate('arduino.blocks.elseif', 'else if %1 then'),
      substack: true,
      inputs: {
        CONDITION: {
          type: 'boolean',
        },
      },
    },
    {
      // 否则
      id: 'else',
      text: translate('arduino.blocks.else', 'else'),
      substack: true,
    },
    '---',
    {
      // 重复直到
      id: 'repeat_until',
      text: ScratchBlocks.Msg.CONTROL_REPEATUNTIL,
      repeat: true,
      inputs: {
        CONDITION: {
          type: 'boolean',
        },
      },
    },
    {
      // 当重复
      id: 'while',
      text: ScratchBlocks.Msg.CONTROL_WHILE,
      repeat: true,
      inputs: {
        CONDITION: {
          type: 'boolean',
        },
      },
    },
    '---',
    {
      // 运行时长
      id: 'runtime',
      text: translate('arduino.blocks.runtime', 'run time %1'),
      output: 'number',
      inputs: {
        UNIT: {
          menu: [
            [translate('arduino.blocks.runtimeMilliseconds', 'milliseconds'), 'MS'],
            [translate('arduino.blocks.runtimeSeconds', 'seconds'), 'SEC'],
          ],
        },
      },
      ino(block) {},
    },
  ],
});
