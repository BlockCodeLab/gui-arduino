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
      ino(block){
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        const str1 = this.valueToCode(block, 'STRING1', this.ORDER_NONE) || ScratchBlocks.Msg.OPERATORS_JOIN_APPLE;
        const str2 = this.valueToCode(block, 'STRING2', this.ORDER_NONE) || ScratchBlocks.Msg.OPERATORS_JOIN_BANANA;
        code += `String(${str1}) + String(${str2})\n`;
        return code;
      }
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
      ino(block){
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        const letter = this.valueToCode(block, 'LETTER', this.ORDER_NONE) || 1;
        const str = this.valueToCode(block, 'STRING', this.ORDER_NONE) || ScratchBlocks.Msg.OPERATORS_JOIN_APPLE;
        code += `String(${str}).charAt(${letter} - 1)\n`;
        return code;
      }
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
      ino(block){
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        const str = this.valueToCode(block, 'STRING', this.ORDER_NONE) || ScratchBlocks.Msg.OPERATORS_JOIN_APPLE;
        code += `String(${str}).length()\n`;
        return code;
      }
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
      ino(block){
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        const str1 = this.valueToCode(block, 'STRING1', this.ORDER_NONE) || ScratchBlocks.Msg.OPERATORS_JOIN_APPLE;
        const str2 = this.valueToCode(block, 'STRING2', this.ORDER_NONE) || ScratchBlocks.Msg.OPERATORS_LETTEROF_APPLE;
        code += `String(${str1}).indexOf(String(${str2})) != -1\n`;
        return code;
      }
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
      ino(block){
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        const str1 = this.valueToCode(block, 'STRING1', this.ORDER_NONE) || ScratchBlocks.Msg.OPERATORS_JOIN_APPLE;
        const str2 = this.valueToCode(block, 'STRING2', this.ORDER_NONE) || ScratchBlocks.Msg.OPERATORS_JOIN_BANANA;
        code += `String(${str1}).equalsIgnoreCase(String(${str2}))\n`;
        return code;
      }
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
      ino(block){
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        const from = this.valueToCode(block, 'FROM', this.ORDER_NONE) || 1;
        const to = this.valueToCode(block, 'TO', this.ORDER_NONE) || 2;
        const str = this.valueToCode(block, 'STRING', this.ORDER_NONE) || ScratchBlocks.Msg.OPERATORS_JOIN_APPLE;
        code += `String(${str}).substring(${from} - 1, ${to})\n`;
        return code;
      }
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
      ino(block){
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        const str1 = this.valueToCode(block, 'STRING1', this.ORDER_NONE) || ScratchBlocks.Msg.OPERATORS_LETTEROF_APPLE; 
        const str2 = this.valueToCode(block, 'STRING2', this.ORDER_NONE) || ScratchBlocks.Msg.OPERATORS_JOIN_APPLE;
        const str3 = this.valueToCode(block, 'STRING3', this.ORDER_NONE) || ScratchBlocks.Msg.OPERATORS_JOIN_BANANA[0];
        code += `String(${str2}).replace(String(${str1}), String(${str3}))\n`;
        return code;
      }
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
      ino(block){
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        const index = this.valueToCode(block, 'INDEX', this.ORDER_NONE) || 1;
        const str = this.valueToCode(block, 'STRING', this.ORDER_NONE) || ScratchBlocks.Msg.OPERATORS_JOIN_APPLE;
        const letter = this.valueToCode(block, 'LETTER', this.ORDER_NONE) || ScratchBlocks.Msg.OPERATORS_JOIN_BANANA[0];
        code += `String(${str}).setCharAt(${index} - 1, String(${letter}))\n`;
        return code;
      }
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
      ino(block){
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        const from = this.valueToCode(block, 'FROM', this.ORDER_NONE) || 1;
        const to = this.valueToCode(block, 'TO', this.ORDER_NONE) || 2; 
        const str = this.valueToCode(block, 'STRING', this.ORDER_NONE) || ScratchBlocks.Msg.OPERATORS_JOIN_APPLE;
        code += `String(${str}).substring(${from} - 1, ${to})\n`;
        return code;
      }
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
      ino(block){
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        const str1 = this.valueToCode(block, 'STRING1', this.ORDER_NONE) || ScratchBlocks.Msg.OPERATORS_JOIN_APPLE;
        const str2 = this.valueToCode(block, 'STRING2', this.ORDER_NONE) || ScratchBlocks.Msg.OPERATORS_LETTEROF_APPLE;
        const with_ = block.getFieldValue('WITH') || 'START';
        if (with_ === 'START') {
          code += `String(${str1}).startsWith(String(${str2}))\n`;
        } else {
          code += `String(${str1}).endsWith(String(${str2}))\n`;
        }
        return code;
      }
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
          defaultValue: 'Abc',
        },
      },
      ino(block){
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        const with_ = block.getFieldValue('WITH') || 'LOWER';
        const str = this.valueToCode(block, 'STRING', this.ORDER_NONE) || 'Abc';  
        code += `String(${str}).${with_}Case()\n`;  
        return code;
      }
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
      ino(block){
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        const str = this.valueToCode(block, 'STRING', this.ORDER_NONE) || ScratchBlocks.Msg.OPERATORS_JOIN_APPLE;
        code += `String(${str}).trim()\n`;
        return code;
      }
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
      ino(block){
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        const str = this.valueToCode(block, 'STRING', this.ORDER_NONE) || 'a';
        const type = block.getFieldValue('TYPE') || 'int';
        if (type === 'int') {
          code += `String(${str}).toInt()\n`;
        } else if (type === 'float') {
          code += `String(${str}).toFloat()\n`;
        } else if (type === 'char array') {
          code += `String(${str}).toCharArray()\n`;
        } else if (type === 'byte array') {
          code += `String(${str}).getBytes()\n`;
        } 
        return code;
      }
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
      ino(block){
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        const num = this.valueToCode(block, 'NUM', this.ORDER_NONE) || 1;
        code += `String(${num})\n`;
        return code;
      }
    },
  ],
});
