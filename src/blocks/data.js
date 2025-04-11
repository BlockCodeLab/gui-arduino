import { translate, themeColors } from '@blockcode/core';
import { ScratchBlocks } from '@blockcode/blocks';

export const VARIABLE_TYPES = ['int', 'float', 'boolean', 'char', 'byte', 'String'];

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
          defaultValue: 'arduino',
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
      id: 'setvariableto',
      ino(block) {
        const varType = block.getFieldValue('TYPE') || 'int';
        const varName = this.getVariableName(block.getFieldValue('VARIABLE'));
        const code = `${varType} ${varName};`;

        // 全局变量
        const rootBlock = block.getRootBlock();
        if (rootBlock.type === 'event_whensetup') {
          this.definitions_[`variable_${varName}`] = code;
          return '';
        }
        // 私有变量
        return code + '\n';
      },
    },
    {
      // 设置变量
      id: 'changevariableby',
      ino(block) {
        const varName = this.getVariableName(block.getFieldValue('VARIABLE'));
        const varValue = this.valueToCode(block, 'VALUE', this.ORDER_NONE);
        const code = `${varName} = ${varValue};\n`;
        return code;
      },
    },
    {
      // 获取变量
      id: 'variable',
      ino(block) {
        const varName = this.getVariableName(block.getFieldValue('VARIABLE'));
        return [varName, this.ORDER_ATOMIC];
      },
    },
    {
      // 声明数组
      id: 'insertatlist',
      ino(block) {
        const arrType = block.getFieldValue('TYPE') || 'int';
        const arrName = 'arr' + this.getVariableName(block.getFieldValue('LIST'));
        const arrSize = this.valueToCode(block, 'INDEX', this.ORDER_NONE);
        const code = `${arrType} ${arrName}[${arrSize}];`;

        // 全局变量
        const rootBlock = block.getRootBlock();
        if (rootBlock.type === 'event_whensetup') {
          this.definitions_[`variable_${arrName}`] = code;
          return '';
        }
        // 私有变量
        return code + '\n';
      },
    },
    {
      // 设置数组项
      id: 'replaceitemoflist',
      ino(block) {
        const arrName = 'arr' + this.getVariableName(block.getFieldValue('LIST'));
        const arrValue = this.valueToCode(block, 'ITEM', this.ORDER_NONE);
        const index = this.valueToCode(block, 'INDEX', this.ORDER_NONE);
        const code = `${arrName}[${index}] = ${arrValue};\n`;
        return code;
      },
    },
    {
      // 获取数组
      id: 'listcontents',
      ino(block) {
        const arrName = 'arr' + this.getVariableName(block.getFieldValue('LIST'));
        return [arrName, this.ORDER_ATOMIC];
      },
    },
    {
      // 获取数组项
      id: 'itemoflist',
      ino(block) {
        const arrName = 'arr' + this.getVariableName(block.getFieldValue('LIST'));
        const index = this.valueToCode(block, 'INDEX', this.ORDER_NONE);
        const code = `${arrName}[${index}]`;
        return [code, this.ORDER_MEMBER];
      },
    },
    {
      // 数组长度
      id: 'lengthoflist',
      ino(block) {
        const arrName = 'arr' + this.getVariableName(block.getFieldValue('LIST'));
        const code = `(sizeof(${arrName}) / sizeof(${arrName}[0]))`;
        return [code, this.ORDER_DIVIDE];
      },
    },
  ],
});
