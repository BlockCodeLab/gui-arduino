import { translate, themeColors } from '@blockcode/core';
import { ScratchBlocks } from '@blockcode/blocks';

export default () => ({
  id: 'serial',
  name: translate('arduino.blocks.serial', 'Serial'),
  themeColor: themeColors.blocks.sounds.primary,
  inputColor: themeColors.blocks.sounds.secondary,
  otherColor: themeColors.blocks.sounds.tertiary,
  order: 2,
  blocks: [
    {
      // 波特率
      id: 'baudrate',
      text: translate('arduino.blocks.serialBaudrate', 'set baudrate to %1'),
      inputs: {
        BAUDRATE: {
          menu: ['4800', '9600', '38400', '57600', '115200'],
        },
      },
    },
    {
      // 超时
      id: 'timeout',
      text: translate('arduino.blocks.serialTimeout', 'set timeout to %1'),
      inputs: {
        TIMEOUT: {
          type: 'integer',
          defaultValue: 1000,
        },
      },
    },
    '---',
    {
      // 打印
      id: 'print',
      text: translate('arduino.blocks.serialPrint', 'print %1 with %2'),
      inputs: {
        STRING: {
          type: 'string',
          defaultValue: ScratchBlocks.Msg.OPERATORS_JOIN_BANANA,
        },
        MODE: {
          menu: [
            [translate('arduino.blocks.serialPrintWarp', 'warp'), 'WARP'],
            [translate('arduino.blocks.serialPrintNoWarp', 'no-warp'), 'NOWARP'],
            [translate('arduino.blocks.serialPrintHEX', 'hex'), 'HEX'],
          ],
        },
      },
    },
    {
      // 打印数字
      id: 'print_number',
      text: translate('arduino.blocks.serialPrintNumber', 'print %1'),
      inputs: {
        NUM: {
          type: 'number',
          defaultValue: 0,
        },
      },
    },
    '---',
    {
      // 接收到？
      id: 'available',
      text: translate('arduino.blocks.serialAvailable', 'available data?'),
      output: 'boolean',
    },
    {
      // 接收到？
      id: 'available_length',
      text: translate('arduino.blocks.serialAvailableLength', 'available data length'),
      output: 'number',
    },
    '---',
    {
      // 读取文本
      id: 'read_string',
      text: translate('arduino.blocks.serialReadString', 'read a string'),
      output: 'string',
    },
    {
      // 读取文本直到
      id: 'read_string_until',
      text: translate('arduino.blocks.serialReadStringUntil', 'read a string until %1'),
      output: 'string',
      inputs: {
        CHAR: {
          type: 'string',
          defaultValue: 'a',
        },
      },
    },
    '---',
    {
      // 读取数字
      id: 'read_parse',
      text: translate('arduino.blocks.serialReadParse', 'read a %1 number'),
      output: 'number',
      inputs: {
        TYPE: {
          menu: [
            [translate('arduino.blocks.serialReadParseInteger', 'int'), 'INT'],
            [translate('arduino.blocks.serialReadParseFloat', 'float'), 'FLOAT'],
          ],
        },
      },
    },
    '---',
    {
      // 读取字节
      id: 'read',
      text: translate('arduino.blocks.serialRead', 'read a byte'),
      output: true,
    },
    {
      // 读取长度字节
      id: 'read_bytes',
      text: translate('arduino.blocks.serialReadBytes', 'read %1 bytes'),
      output: true,
      inputs: {
        LEN: {
          type: 'integer',
          defaultValue: 2,
        },
      },
    },
  ],
});
