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
      ino(block){
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        const baud = block.getFieldValue('BAUDRATE') || '9600';
        code += `Serial.begin(${baud});\n`;
        return code;
      }
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
      ino(block){
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        const timeout = this.valueToCode(block, 'TIMEOUT', this.ORDER_NONE) || 1000;
        code += `Serial.setTimeout(${timeout});\n`;
        return code;
      }
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
      ino(block){
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        const mode = block.getFieldValue('MODE') || 'WARP';
        const str = this.valueToCode(block, 'STRING', this.ORDER_NONE) || 'a';
        if (mode === 'WARP') {
          code += `Serial.println(${str});\n`;
        } else if (mode === 'NOWARP') {
          code += `Serial.print(${str});\n`;
        }else if (mode === 'HEX') {
          code += `Serial.print(${str}, HEX);\n`;
        }
        return code;
      }
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
      ino(block){
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        const num = this.valueToCode(block, 'NUM', this.ORDER_NONE) || 0;
        code += `Serial.println(${num});\n`;
        return code;
      }
    },
    '---',
    {
      // 接收到？
      id: 'available',
      text: translate('arduino.blocks.serialAvailable', 'available data?'),
      output: 'boolean',
      ino(block){
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        code += `Serial.available() > 0\n`;
        return code;
      }
    },
    {
      // 接收到？
      id: 'available_length',
      text: translate('arduino.blocks.serialAvailableLength', 'available data length'),
      output: 'number',
      ino(block){
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        code += `Serial.available()\n`;
        return code;
      }
    },
    '---',
    {
      // 读取文本
      id: 'read_string',
      text: translate('arduino.blocks.serialReadString', 'read a string'),
      output: 'string',
      ino(block){
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        code += `Serial.readString()\n`;
        return code;
      }
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
      ino(block){
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        const char = this.valueToCode(block, 'CHAR', this.ORDER_NONE) || 'a';
        code += `Serial.readStringUntil(${char})\n`;
        return code;
      }
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
      ino(block){
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        const type = block.getFieldValue('TYPE') || 'INT';
        if (type === 'INT') {
          code += `Serial.parseInt()\n`;  
        } else if (type === 'FLOAT') {
          code += `Serial.parseFloat()\n`;
        } 
        return code;
      }
    },
    '---',
    {
      // 读取字节
      id: 'read',
      text: translate('arduino.blocks.serialRead', 'read a byte'),
      output: true,
      ino(block){
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        code += `Serial.readBytes(1)\n`;
        return code;
      }
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
      ino(block){
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        const len = this.valueToCode(block, 'LEN', this.ORDER_NONE) || 2;
        code += `Serial.readBytes(${len})\n`;
        return code;  
      }
    },
  ],
});
