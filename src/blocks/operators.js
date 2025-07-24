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
        const num1 = this.valueToCode(block, 'NUM1', this.ORDER_NONE);
        const num2 = this.valueToCode(block, 'NUM2', this.ORDER_NONE);
        const symbol = block.getFieldValue('SYMBOL') || '+';

        const orders = {
          '+': this.ORDER_ADDITION,
          '-': this.ORDER_SUBTRACTION,
          '*': this.ORDER_MULTIPLICATION,
          '/': this.ORDER_DIVISION,
        };
        const code = `(${num1} ${symbol} ${num2})`;
        return [code, orders[symbol]];
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
      ino(block) {
        const from = this.valueToCode(block, 'FROM', this.ORDER_NONE);
        const to = this.valueToCode(block, 'TO', this.ORDER_NONE);
        const code = `random(${from}, ${to})`;
        return [code, this.ORDER_FUNCTION_CALL];
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
            ['>', '>'],
            ['<', '<'],
            ['=', '=='],
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
        const num1 = this.valueToCode(block, 'NUM1', this.ORDER_NONE);
        const num2 = this.valueToCode(block, 'NUM2', this.ORDER_NONE);
        const symbol = block.getFieldValue('SYMBOL') || '>';

        const orders = {
          '>': this.ORDER_RELATIONAL,
          '<': this.ORDER_RELATIONAL,
          '==': this.ORDER_EQUALITY,
          '>=': this.ORDER_RELATIONAL,
          '<=': this.ORDER_RELATIONAL,
          '!=': this.ORDER_EQUALITY,
        };
        const code = `(${num1} ${symbol} ${num2})`;
        return [code, orders[symbol]];
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
      ino(block) {
        const operand1 = this.valueToCode(block, 'OPERAND1', this.ORDER_NONE);
        const operand2 = this.valueToCode(block, 'OPERAND2', this.ORDER_NONE);
        const code = `(${operand1} && ${operand2})`;
        return [code, this.ORDER_LOGICAL_AND];
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
      ino(block) {
        const operand1 = this.valueToCode(block, 'OPERAND1', this.ORDER_NONE);
        const operand2 = this.valueToCode(block, 'OPERAND2', this.ORDER_NONE);
        const code = `(${operand1} || ${operand2})`;
        return [code, this.ORDER_LOGICAL_OR];
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
      ino(block) {
        const operand = this.valueToCode(block, 'OPERAND', this.ORDER_NONE);
        const code = `(!${operand})`;
        return [code, this.ORDER_LOGICAL_NOT];
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
        const num1 = this.valueToCode(block, 'NUM1', this.ORDER_NONE);
        const num2 = this.valueToCode(block, 'NUM2', this.ORDER_NONE);
        const symbol = block.getFieldValue('SYMBOL') || '&';

        const orders = {
          '&': this.ORDER_BITWISE_AND,
          '|': this.ORDER_BITWISE_OR,
          '^': this.ORDER_BITWISE_XOR,
          '<<': this.ORDER_BITWISE_SHIFT,
          '>>': this.ORDER_BITWISE_SHIFT,
        };
        const code = `(${num1} ${symbol} ${num2})`;
        return [code, orders[symbol]];
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
      ino(block) {
        const num = this.valueToCode(block, 'NUM', this.ORDER_NONE);
        const code = `(~${num})`;
        return [code, this.ORDER_BITWISE_NOT];
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
      ino(block) {
        const num1 = this.valueToCode(block, 'NUM1', this.ORDER_NONE);
        const num2 = this.valueToCode(block, 'NUM2', this.ORDER_NONE);
        const code = `max(${num1}, ${num2})`;
        return [code, this.ORDER_FUNCTION_CALL];
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
      ino(block) {
        const num1 = this.valueToCode(block, 'NUM1', this.ORDER_NONE);
        const num2 = this.valueToCode(block, 'NUM2', this.ORDER_NONE);
        const code = `min(${num1}, ${num2})`;
        return [code, this.ORDER_FUNCTION_CALL];
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
      ino(block) {
        const num1 = this.valueToCode(block, 'NUM1', this.ORDER_NONE);
        const num2 = this.valueToCode(block, 'NUM2', this.ORDER_NONE);
        const code = `(${num1} % ${num2})`;
        return [code, this.ORDER_MODULUS];
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
      ino(block) {
        const num = this.valueToCode(block, 'NUM', this.ORDER_NONE);
        const code = `round(${num})`;
        return [code, this.ORDER_FUNCTION_CALL];
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
        const operator = block.getFieldValue('OPERATOR') || 'abs';
        const num = this.valueToCode(block, 'NUM', this.ORDER_NONE);

        let code = '';
        if (operator === 'pow10') {
          code += `pow(10, ${num})`;
        } else {
          code += `${operator}(${num})`;
        }
        return [code, this.ORDER_FUNCTION_CALL];
      },
    },
    '---',
    {
      // 类型转换
      id: 'convert',
      text: translate('arduino.blocks.dataConvert', 'convert %1 to %2'),
      output: true,
      inputs: {
        DATA: {
          type: 'string',
          defaultValue: '3.1415',
        },
        TYPE: {
          menu: ['int', 'float', 'String'],
        },
      },
      ino(block) {
        const data = this.valueToCode(block, 'DATA', this.ORDER_NONE);
        const type = block.getFieldValue('TYPE') || 'int';
        let code = `String(${data})`;
        switch (type) {
          case 'int':
            code += '.toInt()';
            break;
          case 'float':
            code += '.toFloat()';
            break;
          case 'String':
            break;
        }
        return [code, this.ORDER_FUNCTION_CALL];
      },
    },
    '---',
    {
      // 长度
      id: 'sizeof',
      text: translate('arduino.blocks.dataLengthOf', 'length of %1'),
      output: 'number',
      inputs: {
        DATA: {
          type: 'string',
          defaultValue: 'arduino',
        },
      },
      ino(block) {
        const data = this.valueToCode(block, 'DATA', this.ORDER_NONE);
        return [`strlen(${data})`, this.ORDER_FUNCTION_CALL];
      },
    },
    '---',
    {
      // 约束
      id: 'constrain',
      text: translate('arduino.blocks.dataConstrain', 'constrain %1 between %2 to %3'),
      output: 'number',
      inputs: {
        DATA: {
          type: 'integer',
          defaultValue: 0,
        },
        FROM: {
          type: 'integer',
          defaultValue: 0,
        },
        TO: {
          type: 'integer',
          defaultValue: 255,
        },
      },
      ino(block) {
        const data = this.valueToCode(block, 'DATA', this.ORDER_NONE);
        const from = this.valueToCode(block, 'FROM', this.ORDER_NONE);
        const to = this.valueToCode(block, 'TO', this.ORDER_NONE);
        return [`constrain(${data}, ${from}, ${to})`, this.ORDER_FUNCTION_CALL];
      },
    },
    {
      // 映射
      id: 'map',
      text: translate('arduino.blocks.dataMap', 'map %1 from %2 - %3 to %4 - %5'),
      output: 'number',
      inputs: {
        DATA: {
          type: 'integer',
          defaultValue: 0,
        },
        FROMLOW: {
          type: 'integer',
          defaultValue: 0,
        },
        FROMHIGH: {
          type: 'integer',
          defaultValue: 1023,
        },
        TOLOW: {
          type: 'integer',
          defaultValue: 0,
        },
        TOHIGHT: {
          type: 'integer',
          defaultValue: 255,
        },
      },
      ino(block) {
        const data = this.valueToCode(block, 'DATA', this.ORDER_NONE);
        const fromlow = this.valueToCode(block, 'FROMLOW', this.ORDER_NONE);
        const fromhigh = this.valueToCode(block, 'FROMHIGH', this.ORDER_NONE);
        const tolow = this.valueToCode(block, 'TOLOW', this.ORDER_NONE);
        const tohigh = this.valueToCode(block, 'TOHIGHT', this.ORDER_NONE);
        const code = `map(${data}, ${fromlow}, ${fromhigh}, ${tolow}, ${tohigh})`;
        return [code, this.ORDER_FUNCTION_CALL];
      },
    },
  ],
});
