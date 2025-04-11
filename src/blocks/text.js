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
          defaultValue: 'hello',
        },
        STRING2: {
          type: 'string',
          defaultValue: 'arduino',
        },
      },
      ino(block) {
        const str1 = this.valueToCode(block, 'STRING1', this.ORDER_NONE);
        const str2 = this.valueToCode(block, 'STRING2', this.ORDER_NONE);
        const code = `(${str1} + ${str2})`;
        return [code, this.ORDER_ADDITION];
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
          defaultValue: 'arduino',
        },
      },
      ino(block) {
        const letterIndex = this.getAdjusted(block, 'LETTER'); // 将位置值换成下标值
        const str = this.valueToCode(block, 'STRING', this.ORDER_NONE);
        const code = `${str}.charAt(${letterIndex})`;
        return [code, this.ORDER_FUNCTION_CALL];
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
          defaultValue: 'arduino',
        },
      },
      ino(block) {
        const str = this.valueToCode(block, 'STRING', this.ORDER_NONE);
        code += `${str}.length()`;
        return [code, this.ORDER_FUNCTION_CALL];
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
          defaultValue: 'arduino',
        },
        STRING2: {
          type: 'string',
          defaultValue: 'ino',
        },
      },
      ino(block) {
        const str1 = this.valueToCode(block, 'STRING1', this.ORDER_NONE);
        const str2 = this.valueToCode(block, 'STRING2', this.ORDER_NONE);
        code += `(${str1}.indexOf(${str2}) != -1)`;
        return [code, this.ORDER_EQUALITY];
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
          defaultValue: 'arduino',
        },
        STRING2: {
          type: 'string',
          defaultValue: 'Arduino',
        },
      },
      ino(block) {
        const str1 = this.valueToCode(block, 'STRING1', this.ORDER_NONE);
        const str2 = this.valueToCode(block, 'STRING2', this.ORDER_NONE);
        code += `${str1}.equalsIgnoreCase(${str2})\n`;
        return [code, this.ORDER_EQUALITY];
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
          defaultValue: 'arduino',
        },
      },
      ino(block) {
        const from = this.getAdjusted(block, 'FROM');
        const to = this.valueToCode(block, 'TO', this.ORDER_NONE);
        const str = this.valueToCode(block, 'STRING', this.ORDER_NONE);
        const code = `${str}.remove(${from}, (${to} - ${from}));\n`;
        return code;
      },
    },
    {
      // 替换
      id: 'replace',
      text: translate('arduino.blocks.textReplace', 'replace %1 of %2 with %3'),
      inputs: {
        STRING1: {
          type: 'string',
          defaultValue: 'a',
        },
        STRING2: {
          type: 'string',
          defaultValue: 'arduino',
        },
        STRING3: {
          type: 'string',
          defaultValue: 'The A',
        },
      },
      ino(block) {
        const str1 = this.valueToCode(block, 'STRING1', this.ORDER_NONE);
        const str2 = this.valueToCode(block, 'STRING2', this.ORDER_NONE);
        const str3 = this.valueToCode(block, 'STRING3', this.ORDER_NONE);
        const code = `${str2}.replace(${str1}, ${str3});\n`;
        return code;
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
          defaultValue: 'arduino',
        },
        LETTER: {
          type: 'string',
          defaultValue: 'A',
        },
      },
      ino(block) {
        const index = this.getAdjusted(block, 'INDEX', this.ORDER_NONE);
        const str = this.valueToCode(block, 'STRING', this.ORDER_NONE);
        const letter = this.valueToCode(block, 'LETTER', this.ORDER_NONE);
        const code = `${str}.setCharAt(${index}, ${letter})\n`;
        return code;
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
          defaultValue: 'arduino',
        },
        FROM: {
          type: 'integer',
          defaultValue: 5,
        },
        TO: {
          type: 'integer',
          defaultValue: 7,
        },
      },
      ino(block) {
        const from = this.getAdjusted(block, 'FROM', this.ORDER_NONE);
        const to = this.valueToCode(block, 'TO', this.ORDER_NONE);
        const str = this.valueToCode(block, 'STRING', this.ORDER_NONE);
        const code = `${str}.substring(${from}, ${to})`;
        return [code, this.ORDER_FUNCTION_CALL];
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
          defaultValue: 'arduino',
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
          defaultValue: 'a',
        },
      },
      ino(block) {
        const str1 = this.valueToCode(block, 'STRING1', this.ORDER_NONE);
        const str2 = this.valueToCode(block, 'STRING2', this.ORDER_NONE);
        const with_ = block.getFieldValue('WITH') || 'START';
        const code = `${str1}.${with_.toLowerCase()}sWith(${str2})`;
        return [code, this.ORDER_FUNCTION_CALL];
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
          defaultValue: 'Arduino',
        },
      },
      ino(block) {
        const with_ = block.getFieldValue('WITH') || 'LOWER';
        const str = this.valueToCode(block, 'STRING', this.ORDER_NONE);
        const code = `${str}.${with_.toLowerCase()}Case();\n`;
        return code;
      },
    },
    {
      // 清除空白
      id: 'trim',
      text: translate('arduino.blocks.textTrim', 'remove %1 leading and trailing whitespace'),
      inputs: {
        STRING: {
          type: 'string',
          defaultValue: 'arduino',
        },
      },
      ino(block) {
        const str = this.valueToCode(block, 'STRING', this.ORDER_NONE);
        const code = `${str}.trim();\n`;
        return code;
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
          defaultValue: 'a',
        },
        TYPE: {
          menu: ['int', 'float', 'char array', 'byte array'],
        },
      },
      ino(block) {
        const str = this.valueToCode(block, 'STRING', this.ORDER_NONE);
        const type = block.getFieldValue('TYPE') || 'int';
        let code = `String(${str})`;
        if (type === 'int') {
          code += `.toInt()`;
        } else if (type === 'float') {
          code += `.toFloat()`;
        } else if (type === 'char array') {
          code += `.toCharArray()`;
        } else if (type === 'byte array') {
          code += `.getBytes()`;
        }
        return [code, this.ORDER_FUNCTION_CALL];
      },
    },
    {
      // 转换为文本
      id: 'convert_from',
      text: translate('arduino.blocks.textConvertFrom', 'convert %1 to String'),
      output: true,
      inputs: {
        NUM: {
          type: 'number',
          defaultValue: 1,
        },
      },
      ino(block) {
        const num = this.valueToCode(block, 'NUM', this.ORDER_NONE);
        const code = `String(${num})`;
        return [code, this.ORDER_FUNCTION_CALL];
      },
    },
  ],
});
