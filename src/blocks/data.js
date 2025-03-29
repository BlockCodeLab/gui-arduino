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
        return code;
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
          defaultValue: 'abc',
        },
      },
      ino(block) {
        const data = this.valueToCode(block, 'DATA', this.ORDER_NONE);
        const code = `strlen(${data})`;
        return code;
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
        const code = `constrain(${data}, ${from}, ${to})`;
        return code;
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
        return code;
      },
    },
    // 变量积木
    {
      // 声明变量
      id: 'data_setvariableto',
      ino(block) {},
    },
    {
      // 设置变量
      id: 'data_changevariableby',
      ino(block) {},
    },
    {
      // 声明数组
      id: 'data_insertatlist',
      ino(block) {},
    },
    {
      // 设置数组项
      id: 'data_replaceitemoflist',
      ino(block) {},
    },
    {
      // 获取数组项
      id: 'data_itemoflist',
    },
  ],
});
