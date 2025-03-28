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
            ['+', '+'],
            ['-', '-'],
            ['×', '*'],
            ['÷', '/'],
          ],
        },
        NUM2: {
          type: 'number',
          defaultValue: 0,
        },
      },
      ino(block) {
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        const num1 = this.valueToCode(block, 'NUM1', this.ORDER_NONE) || 0;
        const symbol = this.getFieldValue('SYMBOL') || '+';
        const num2 = this.valueToCode(block, 'NUM2', this.ORDER_NONE) || 0;
        code += `${num1} ${symbol} ${num2}`;
        return code;
      }
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
      ino(block) {
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        const from = this.valueToCode(block, 'FROM', this.ORDER_NONE) || 1;
        const to = this.valueToCode(block, 'TO', this.ORDER_NONE) || 10;
        code += `random(${from}, ${to})`;
        return code;
      }
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
            ['>', '>'],
            ['<', '<'],
            ['=', '='],
            ['≥', '>='],
            ['≤', '<='],
            ['≠', '!='],
          ],
        },
        NUM2: {
          type: 'number',
          defaultValue: 0,
        },
      },
      ino(block) {
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        const num1 = this.valueToCode(block, 'NUM1', this.ORDER_NONE) || 0;
        const symbol = this.getFieldValue('SYMBOL') || '>';
        const num2 = this.valueToCode(block, 'NUM2', this.ORDER_NONE) || 0;
        code += `${num1} ${symbol} ${num2}`;
        return code;
      }
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
      ino(block) {
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        const operand1 = this.valueToCode(block, 'OPERAND1', this.ORDER_NONE) || false;
        const operand2 = this.valueToCode(block, 'OPERAND2', this.ORDER_NONE) || false;
        code += `${operand1} && ${operand2}`;
        return code;
      }
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
      ino(block) {
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        const operand1 = this.valueToCode(block, 'OPERAND1', this.ORDER_NONE) || false;
        const operand2 = this.valueToCode(block, 'OPERAND2', this.ORDER_NONE) || false;
        code += `${operand1} || ${operand2}`;
        return code;
      }
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
      ino(block) {
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        const operand = this.valueToCode(block, 'OPERAND', this.ORDER_NONE) || false;
        code += `!${operand}`;
        return code;
      }
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
            ['&', '&'],
            ['|', '|'],
            ['^', '^'],
            ['<<', '<<'],
            ['>>', '>>'],
          ],
        },
        NUM2: {
          type: 'integer',
          defaultValue: 0,
        },
      },
      ino(block) {
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        const num1 = this.valueToCode(block, 'NUM1', this.ORDER_NONE) || 0;
        const symbol = this.getFieldValue('SYMBOL') || '&';
        const num2 = this.valueToCode(block, 'NUM2', this.ORDER_NONE) || 0;
        code += `${num1} ${symbol} ${num2}`;
        return code;
      }
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
      ino(block) {
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        const num = this.valueToCode(block, 'NUM', this.ORDER_NONE) || 0;
        code += `~${num}`;
        return code;
      }
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
      ino(block) {
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        const num1 = this.valueToCode(block, 'NUM1', this.ORDER_NONE) || 0;
        const num2 = this.valueToCode(block, 'NUM2', this.ORDER_NONE) || 0; 
        code += `max(${num1}, ${num2})`;
        return code;
      }
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
      ino(block) {
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        const num1 = this.valueToCode(block, 'NUM1', this.ORDER_NONE) || 0;
        const num2 = this.valueToCode(block, 'NUM2', this.ORDER_NONE) || 0;
        code += `min(${num1}, ${num2})`;
        return code;
      }
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
      ino(block) {
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        const num1 = this.valueToCode(block, 'NUM1', this.ORDER_NONE) || 0; 
        const num2 = this.valueToCode(block, 'NUM2', this.ORDER_NONE) || 0;
        code += `${num1} % ${num2}`;
        return code;
      }
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
      ino(block) {
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        const num = this.valueToCode(block, 'NUM', this.ORDER_NONE) || 0;
        code += `round(${num})`;
        return code;
      }
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
            [ScratchBlocks.Msg.OPERATORS_MATHOP_LN, 'log'],
            [ScratchBlocks.Msg.OPERATORS_MATHOP_LOG, 'log10'],
            [ScratchBlocks.Msg.OPERATORS_MATHOP_EEXP, 'exp'],
            [ScratchBlocks.Msg.OPERATORS_MATHOP_10EXP, 'pow10'],
          ],
        },
        NUM: {
          type: 'integer',
          defaultValue: 0,
        },
      },
      ino(block) {
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        const operator = this.getFieldValue('OPERATOR') || 'abs';
        const num = this.valueToCode(block, 'NUM', this.ORDER_NONE) || 0;
        if(operator === 'pow10'){
          code += `pow(10,${num})`;
        }else{
          code += `${operator}(${num})`;
        }
        return code;
      }
    },
  ],
});
