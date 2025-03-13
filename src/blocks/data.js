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
          type: 'raw',
        },
        TYPE: {
          menu: ['int', 'float', 'char', 'byte', 'String'],
        },
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
          type: 'raw',
        },
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
    },
  ],
});
