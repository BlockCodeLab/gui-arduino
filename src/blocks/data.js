import { translate, themeColors } from '@blockcode/core';
import { ScratchBlocks } from '@blockcode/blocks';

export default () => ({
  id: 'data',
  name: translate('arduino.blocks.data', 'Data'),
  themeColor: themeColors.blocks.monitor.primary,
  inputColor: themeColors.blocks.monitor.secondary,
  otherColor: themeColors.blocks.monitor.tertiary,
  order: 7,
  blocks: [
    {
      // 类型转换
      id: 'convert',
      text: translate('arduino.blocks.dataConvert', 'convert %1 to %2'),
      output: true,
      inputs: {
        DATA: {
          type: 'string',
          defaultValue: '123',
        },
        TYPE: {
          menu: ['int', 'float', 'String'],
        },
      },
      ino(block) {
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        const data = this.valueToCode(block, 'DATA', this.ORDER_NONE) || '0';
        const type = block.getFieldValue('TYPE') || 'int';
        switch (type) {
          case 'int':
            code += `String(${data}).toInt()`;
            break;
          case 'float':
            code += `String(${data}).toFloat()`;
            break;
          case 'String':
            code += `String(${data})`;
            break;
        }
        return code;
      }
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
          defaultValue: 'abc',
        },
      },
      ino(block) {
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        const data = this.valueToCode(block, 'DATA', this.ORDER_NONE) || '0';
        code += `strlen(${data})`;
        return code;
      }
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
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        const data = this.valueToCode(block, 'DATA', this.ORDER_NONE) || '0';
        const from = this.valueToCode(block, 'FROM', this.ORDER_NONE) || '0';
        const to = this.valueToCode(block, 'TO', this.ORDER_NONE) || '0';
        code += `constrain(${data}, ${from}, ${to})`;
        return code;
      }
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
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        const data = this.valueToCode(block, 'DATA', this.ORDER_NONE) || '0';
        const fromlow = this.valueToCode(block, 'FROMLOW', this.ORDER_NONE) || '0';
        const fromhigh = this.valueToCode(block, 'FROMHIGH', this.ORDER_NONE) || '0';
        const tolow = this.valueToCode(block, 'TOLOW', this.ORDER_NONE) || '0';
        const tohigh = this.valueToCode(block, 'TOHIGHT', this.ORDER_NONE) || '0';
        code += `map(${data}, ${fromlow}, ${fromhigh}, ${tolow}, ${tohigh})`;
        return code;
      }
    },
  ],
});
