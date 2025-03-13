import { translate, themeColors } from '@blockcode/core';
import { ScratchBlocks } from '@blockcode/blocks';

export default () => ({
  id: 'operator',
  name: '%{BKY_CATEGORY_OPERATORS}',
  themeColor: themeColors.blocks.operators.primary,
  inputColor: themeColors.blocks.operators.secondary,
  otherColor: themeColors.blocks.operators.tertiary,
  blocks: [
    {
      // 运算
      id: 'calculate',
      text: '%1 %2 %3',
      output: 'number',
      inputs: {
        NUM1: {
          type: 'number',
          defaultValue: 0,
        },
        SYMBOL: {
          menu: [
            ['+', 'ADD'],
            ['-', 'SUB'],
            ['×', 'MUL'],
            ['÷', 'DIV'],
          ],
        },
        NUM2: {
          type: 'number',
          defaultValue: 0,
        },
      },
    },
    '---',
    {
      // 随机
      id: 'random',
      text: ScratchBlocks.Msg.OPERATORS_RANDOM,
      output: 'number',
      inputs: {
        FROM: {
          type: 'integer',
          defaultValue: 1,
        },
        TO: {
          type: 'integer',
          defaultValue: 10,
        },
      },
    },
    '---',
    {
      // 比较
      id: 'compare',
      text: '%1 %2 %3',
      output: 'boolean',
      inputs: {
        NUM1: {
          type: 'number',
          defaultValue: 0,
        },
        SYMBOL: {
          menu: [
            ['>', 'GT'],
            ['<', 'LT'],
            ['=', 'EQ'],
            ['≥', 'GE'],
            ['≤', 'LE'],
            ['≠', 'NE'],
          ],
        },
        NUM2: {
          type: 'number',
          defaultValue: 0,
        },
      },
    },
    '---',
    {
      // 与
      id: 'and',
      text: ScratchBlocks.Msg.OPERATORS_AND,
      output: 'boolean',
      inputs: {
        OPERAND1: {
          type: 'boolean',
        },
        OPERAND2: {
          type: 'boolean',
        },
      },
    },
    {
      // 或
      id: 'or',
      text: ScratchBlocks.Msg.OPERATORS_OR,
      output: 'boolean',
      inputs: {
        OPERAND1: {
          type: 'boolean',
        },
        OPERAND2: {
          type: 'boolean',
        },
      },
    },
    {
      // 非
      id: 'not',
      text: ScratchBlocks.Msg.OPERATORS_NOT,
      output: 'boolean',
      inputs: {
        OPERAND: {
          type: 'boolean',
        },
      },
    },
    '---',
    {
      // 位运算
      id: 'bitwise',
      text: '%1 %2 %3',
      output: 'number',
      inputs: {
        NUM1: {
          type: 'integer',
          defaultValue: 0,
        },
        SYMBOL: {
          menu: [
            ['&', 'AND'],
            ['|', 'OR'],
            ['^', 'XOR'],
            ['<<', 'LEFT'],
            ['>>', 'RIGHT'],
          ],
        },
        NUM2: {
          type: 'integer',
          defaultValue: 0,
        },
      },
    },
    {
      // 位运算非
      id: 'bitwise_not',
      text: '~ %1',
      output: 'number',
      inputs: {
        NUM: {
          type: 'integer',
          defaultValue: 0,
        },
      },
    },
    '---',
    {
      // 最大值
      id: 'larger',
      text: translate('arduino.blocks.operatorLarger', 'larger of %1 and %2'),
      output: 'number',
      inputs: {
        NUM1: {
          type: 'number',
          defaultValue: 0,
        },
        NUM2: {
          type: 'number',
          defaultValue: 0,
        },
      },
    },
    {
      // 最小值
      id: 'smaller',
      text: translate('arduino.blocks.operatorSmaller', 'smaller of %1 and %2'),
      output: 'number',
      inputs: {
        NUM1: {
          type: 'number',
          defaultValue: 0,
        },
        NUM2: {
          type: 'number',
          defaultValue: 0,
        },
      },
    },
    {
      // 余数
      id: 'mod',
      text: ScratchBlocks.Msg.OPERATORS_MOD,
      output: 'number',
      inputs: {
        NUM1: {
          type: 'integer',
          defaultValue: 0,
        },
        NUM2: {
          type: 'integer',
          defaultValue: 0,
        },
      },
    },
    {
      // 四舍五入
      id: 'round',
      text: ScratchBlocks.Msg.OPERATORS_ROUND,
      output: 'number',
      inputs: {
        NUM: {
          type: 'number',
          defaultValue: 0,
        },
      },
    },
    '---',
    {
      // 函数
      id: 'mathop',
      text: ScratchBlocks.Msg.MATHOP,
      output: 'number',
      inputs: {
        OPERATOR: {
          menu: [
            [ScratchBlocks.Msg.OPERATORS_MATHOP_ABS, 'abs'],
            [ScratchBlocks.Msg.OPERATORS_MATHOP_FLOOR, 'floor'],
            [ScratchBlocks.Msg.OPERATORS_MATHOP_CEILING, 'ceiling'],
            [ScratchBlocks.Msg.OPERATORS_MATHOP_SQRT, 'sqrt'],
            [ScratchBlocks.Msg.OPERATORS_MATHOP_SIN, 'sin'],
            [ScratchBlocks.Msg.OPERATORS_MATHOP_COS, 'cos'],
            [ScratchBlocks.Msg.OPERATORS_MATHOP_TAN, 'tan'],
            [ScratchBlocks.Msg.OPERATORS_MATHOP_ASIN, 'asin'],
            [ScratchBlocks.Msg.OPERATORS_MATHOP_ACOS, 'acos'],
            [ScratchBlocks.Msg.OPERATORS_MATHOP_ATAN, 'atan'],
            [ScratchBlocks.Msg.OPERATORS_MATHOP_LN, 'ln'],
            [ScratchBlocks.Msg.OPERATORS_MATHOP_LOG, 'log'],
            [ScratchBlocks.Msg.OPERATORS_MATHOP_EEXP, 'e ^'],
            [ScratchBlocks.Msg.OPERATORS_MATHOP_10EXP, '10 ^'],
          ],
        },
        NUM: {
          type: 'integer',
          defaultValue: 0,
        },
      },
    },
  ],
});
