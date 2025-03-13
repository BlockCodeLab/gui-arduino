import { translate, themeColors } from '@blockcode/core';
import { ScratchBlocks } from '@blockcode/blocks';

export default () => ({
  id: 'text',
  name: translate('arduino.blocks.text', 'Text'),
  themeColor: themeColors.blocks.looks.primary,
  inputColor: themeColors.blocks.looks.secondary,
  otherColor: themeColors.blocks.looks.tertiary,
  order: 1,
  blocks: [
    {
      // 连接
      id: 'join',
      text: ScratchBlocks.Msg.OPERATORS_JOIN,
      output: 'string',
      inputs: {
        STRING1: {
          type: 'string',
          defaultValue: ScratchBlocks.Msg.OPERATORS_JOIN_APPLE,
        },
        STRING2: {
          type: 'string',
          defaultValue: ScratchBlocks.Msg.OPERATORS_JOIN_BANANA,
        },
      },
    },
    {
      // 字符
      id: 'letter_of',
      text: ScratchBlocks.Msg.OPERATORS_LETTEROF,
      output: 'string',
      inputs: {
        LETTER: {
          type: 'integer',
          defaultValue: 1,
        },
        STRING: {
          type: 'string',
          defaultValue: ScratchBlocks.Msg.OPERATORS_JOIN_APPLE,
        },
      },
    },
    {
      // 字符长度
      id: 'length',
      text: ScratchBlocks.Msg.OPERATORS_LENGTH,
      output: 'number',
      inputs: {
        STRING: {
          type: 'string',
          defaultValue: ScratchBlocks.Msg.OPERATORS_JOIN_APPLE,
        },
      },
    },
    {
      // 包含
      id: 'contains',
      text: ScratchBlocks.Msg.OPERATORS_CONTAINS,
      output: 'boolean',
      inputs: {
        STRING1: {
          type: 'string',
          defaultValue: ScratchBlocks.Msg.OPERATORS_JOIN_APPLE,
        },
        STRING2: {
          type: 'string',
          defaultValue: ScratchBlocks.Msg.OPERATORS_LETTEROF_APPLE,
        },
      },
    },
    {
      // 相同
      id: 'equals',
      text: translate('arduino.blocks.textEquals', '%1 equals %2 (not case-sensitive)?'),
      output: 'boolean',
      inputs: {
        STRING1: {
          type: 'string',
          defaultValue: ScratchBlocks.Msg.OPERATORS_JOIN_APPLE,
        },
        STRING2: {
          type: 'string',
          defaultValue: ScratchBlocks.Msg.OPERATORS_JOIN_BANANA,
        },
      },
    },
    '---',
    {
      // 删除
      id: 'remove',
      text: translate('arduino.blocks.textRemove', 'remove letters from %1 to %2 of %3'),
      inputs: {
        FROM: {
          type: 'integer',
          defaultValue: 1,
        },
        TO: {
          type: 'integer',
          defaultValue: 2,
        },
        STRING: {
          type: 'string',
          defaultValue: ScratchBlocks.Msg.OPERATORS_JOIN_APPLE,
        },
      },
    },
    {
      // 替换
      id: 'replace',
      text: translate('arduino.blocks.textReplace', 'replace %1 of %2 with %3'),
      inputs: {
        STRING1: {
          type: 'string',
          defaultValue: ScratchBlocks.Msg.OPERATORS_LETTEROF_APPLE,
        },
        STRING2: {
          type: 'string',
          defaultValue: ScratchBlocks.Msg.OPERATORS_JOIN_APPLE,
        },
        STRING3: {
          type: 'string',
          defaultValue: ScratchBlocks.Msg.OPERATORS_JOIN_BANANA[0],
        },
      },
    },
    {
      // 替换字符
      id: 'replace_letter',
      text: translate('arduino.blocks.textReplaceLetter', 'replace letter %1 of %2 with %3'),
      inputs: {
        INDEX: {
          type: 'integer',
          defaultValue: 1,
        },
        STRING: {
          type: 'string',
          defaultValue: ScratchBlocks.Msg.OPERATORS_JOIN_APPLE,
        },
        LETTER: {
          type: 'string',
          defaultValue: ScratchBlocks.Msg.OPERATORS_JOIN_BANANA[0],
        },
      },
    },
    {
      // 截取
      id: 'substring',
      text: translate('arduino.blocks.textSubstring', 'substring of %1 from %2 to %3'),
      output: 'string',
      inputs: {
        STRING: {
          type: 'string',
          defaultValue: ScratchBlocks.Msg.OPERATORS_JOIN_APPLE,
        },
        FROM: {
          type: 'integer',
          defaultValue: 1,
        },
        TO: {
          type: 'integer',
          defaultValue: 2,
        },
      },
    },
    {
      // 开始/结束于
      id: 'with',
      text: translate('arduino.blocks.textWith', '%1 %2 with %3 ?'),
      output: 'boolean',
      inputs: {
        STRING1: {
          type: 'string',
          defaultValue: ScratchBlocks.Msg.OPERATORS_JOIN_APPLE,
        },
        WITH: {
          type: 'string',
          menu: [
            [translate('arduino.blocks.textStartsWith', 'starts'), 'START'],
            [translate('arduino.blocks.textEndsWith', 'ends'), 'END'],
          ],
        },
        STRING2: {
          type: 'string',
          defaultValue: ScratchBlocks.Msg.OPERATORS_LETTEROF_APPLE,
        },
      },
    },
    '---',
    {
      // 转换大小写
      id: 'case',
      text: translate('arduino.blocks.textCase', 'get %1 case of %2'),
      inputs: {
        WITH: {
          menu: [
            [translate('arduino.blocks.textLowerCase', 'lower'), 'LOWER'],
            [translate('arduino.blocks.textUpperCase', 'upper'), 'UPPER'],
          ],
        },
        STRING: {
          type: 'string',
          defaultValue: ScratchBlocks.Msg.OPERATORS_JOIN_APPLE,
        },
      },
    },
    {
      // 清除空白
      id: 'trim',
      text: translate('arduino.blocks.textTrim', 'remove %1 leading and trailing whitespace'),
      inputs: {
        STRING: {
          type: 'string',
          defaultValue: ScratchBlocks.Msg.OPERATORS_JOIN_APPLE,
        },
      },
    },
    '---',
    {
      // 转换
      id: 'convert',
      text: translate('arduino.blocks.textConvert', 'convert %1 to %2'),
      output: true,
      inputs: {
        STRING: {
          type: 'string',
          defaultValue: ScratchBlocks.Msg.OPERATORS_JOIN_APPLE,
        },
        TYPE: {
          menu: ['int', 'float', 'char array', 'byte array'],
        },
      },
    },
  ],
});
