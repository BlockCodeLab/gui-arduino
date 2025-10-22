import { translate, themeColors } from '@blockcode/core';
import { ArduinoBoards } from '../lib/boards';

export default (boardType) => ({
  id: 'pin',
  name: translate('arduino.blocks.pin', 'Pins'),
  themeColor: themeColors.blocks.motion.primary,
  inputColor: themeColors.blocks.motion.secondary,
  otherColor: themeColors.blocks.motion.tertiary,
  order: 0,
  blocks: [
    {
      // 设置模式
      id: 'setmode',
      text: translate('arduino.blocks.setmode', 'set pin %1 mode to %2'),
      inputs: {
        PIN: {
          menu: [ArduinoBoards.ArduinoNano, ArduinoBoards.BLENANO].includes(boardType) ? 'NANO_PINS' : 'UNO_PINS',
        },
        MODE: {
          menu: [
            [translate('arduino.blocks.inputMode', 'input'), 'INPUT'],
            [translate('arduino.blocks.ouputMode', 'output'), 'OUTPUT'],
            [translate('arduino.blocks.inputPullUpMode', 'input pull-up'), 'INPUT_PULLUP'],
          ],
        },
      },
      ino(block) {
        const pin = block.getFieldValue('PIN') || 0;
        const mode = block.getFieldValue('MODE') || 'INPUT';
        const code = `pinMode(${pin}, ${mode});\n`;
        return code;
      },
    },
    '---',
    {
      // 数字引脚设为
      id: 'setdigital',
      text: translate('arduino.blocks.setdigital', 'set digital pin %1 to %2'),
      inputs: {
        PIN: {
          menu: [ArduinoBoards.ArduinoNano, ArduinoBoards.BLENANO].includes(boardType) ? 'NANO_PINS' : 'UNO_PINS',
        },
        VALUE: {
          inputMode: true,
          type: 'number',
          defaultValue: '1',
          menu: [
            [translate('arduino.blocks.digitalHigh', 'high'), '1'],
            [translate('arduino.blocks.digitalLow', 'low'), '0'],
          ],
        },
      },
      ino(block) {
        const pin = block.getFieldValue('PIN') || 0;
        const value = this.valueToCode(block, 'VALUE', this.ORDER_NONE);
        const code = `digitalWrite(${pin}, ${value});\n`;
        return code;
      },
    },
    {
      // 模拟/PWM 引脚设为
      id: 'setanalog',
      text: translate('arduino.blocks.setanalog', 'set pwm pin %1 to %2'),
      inputs: {
        PIN: {
          menu: boardType === ArduinoBoards.ArduinoUnoR4 ? 'R4_PWM_PINS' : 'PWM_PINS',
        },
        VALUE: {
          shadow: 'slider255',
        },
      },
      ino(block) {
        const pin = block.getFieldValue('PIN') || 0;
        const value = this.valueToCode(block, 'VALUE', this.ORDER_NONE);
        const code = `analogWrite(${pin}, ${value});\n`;
        return code;
      },
    },
    {
      // 0-255 滑块
      id: 'slider255',
      shadow: true,
      output: 'number',
      inputs: {
        VALUE: {
          type: 'slider',
          min: 0,
          max: 255,
          step: 1,
          defaultValue: 128,
        },
      },
      ino(block) {
        const value = block.getFieldValue('VALUE') || 0;
        return [value, this.ORDER_ATOMIC];
      },
    },
    {
      // 数字引脚是否为高电平？
      id: 'digital',
      text: translate('arduino.blocks.isDigitalHigh', 'digital pin %1 is high?'),
      output: 'boolean',
      inputs: {
        PIN: {
          menu: [ArduinoBoards.ArduinoNano, ArduinoBoards.BLENANO].includes(boardType) ? 'NANO_PINS' : 'UNO_PINS',
        },
      },
      ino(block) {
        const pin = block.getFieldValue('PIN') || 0;
        const code = `digitalRead(${pin}) == HIGH`;
        return [code, this.ORDER_ATOMIC];
      },
    },
    {
      // 模拟引脚值
      id: 'analog',
      text: translate('arduino.blocks.analogValue', 'pin %1 analog value'),
      output: 'number',
      inputs: {
        PIN: {
          menu: [ArduinoBoards.ArduinoNano, ArduinoBoards.BLENANO].includes(boardType)
            ? 'NANO_ANALOG_PINS'
            : 'UNO_ANALOG_PINS',
        },
      },
      ino(block) {
        const pin = block.getFieldValue('PIN') || 0;
        const code = `analogRead(${pin})`;
        return [code, this.ORDER_ATOMIC];
      },
    },
    '---',
    {
      // 设置中断
      id: 'attachinterrupt',
      text: translate('arduino.blocks.attachinterrupt', 'attach pin %1 interrupt to %2'),
      substack: true,
      inputs: {
        PIN: {
          menu: [ArduinoBoards.ArduinoNano, ArduinoBoards.BLENANO].includes(boardType) ? 'NANO_PINS' : 'UNO_PINS',
        },
        INTERRUPT: {
          menu: [
            [translate('arduino.blocks.interruptRising', 'rising'), 'RISING'],
            [translate('arduino.blocks.interruptFalling', 'falling'), 'FALLING'],
            [translate('arduino.blocks.interruptChange', 'change'), 'CHANGE'],
            //[translate('arduino.blocks.interruptHigh', 'high'), 'HIGH'],
            [translate('arduino.blocks.interruptLow', 'low'), 'LOW'],
          ],
        },
      },
      ino(block) {
        const pin = block.getFieldValue('PIN') || 0;
        const interrupt = block.getFieldValue('INTERRUPT') || 'RISING';
        const funcName = `interrupt_${pin}_${interrupt}`;

        // 定义中断回调函数
        const branchCode = this.statementToCode(block, 'SUBSTACK') || '';
        this.definitions_[`declare_${funcName}`] = `void ${funcName}();`;
        this.definitions_[funcName] = `void ${funcName}() {\n${branchCode}}`;

        const code = `attachInterrupt(digitalPinToInterrupt(${pin}), ${funcName}, ${interrupt});\n`;
        return code;
      },
    },
    {
      // 解除中断
      id: 'detachinterrupt',
      text: translate('arduino.blocks.detachinterrupt', 'detach pin %1 interrupt'),
      inputs: {
        PIN: {
          menu: [ArduinoBoards.ArduinoNano, ArduinoBoards.BLENANO].includes(boardType) ? 'NANO_PINS' : 'UNO_PINS',
        },
      },
      ino(block) {
        const pin = block.getFieldValue('PIN') || 0;
        const code = `detachInterrupt(digitalPinToInterrupt(${pin}));\n`;
        return code;
      },
    },
    '---',
    {
      // 设置R4的点阵灯
      id: 'setMatrix',
      hidden: boardType !== ArduinoBoards.ArduinoUnoR4,
      text: translate('arduino.blocks.displayMatrix', 'display [MATRIX]'),
      inputs: {
        MATRIX: {
          shadow: 'matrixR4',
        },
      },
      ino(block) {
        // 引入点整灯头文件并创建全局变量
        this.definitions_['include_Arduino_LED_Matrix'] = '#include "Arduino_LED_Matrix.h"';
        this.definitions_['variable_matrix'] = 'ArduinoLEDMatrix _matrix;';
        this.definitions_['variable_matrix_frame'] = 'uint32_t _MATRIX_FRAME_[] = {0x0,0x0,0x0};';

        // 在setup函数中加入matrix的初始化
        this.definitions_['setup_matrix'] = '_matrix.begin();';

        const matrix = this.valueToCode(block, 'MATRIX', this.ORDER_NONE).split(',');
        let code = '';
        code += `_MATRIX_FRAME_[0] = 0x${matrix[0]};\n`;
        code += `_MATRIX_FRAME_[1] = 0x${matrix[1]};\n`;
        code += `_MATRIX_FRAME_[2] = 0x${matrix[2]};\n`;
        code += '_matrix.loadFrame(_MATRIX_FRAME_);\n';
        return code;
      },
    },
    {
      // 设置R4的点阵灯
      id: 'clearMatrix',
      hidden: boardType !== ArduinoBoards.ArduinoUnoR4,
      text: translate('arduino.blocks.clearDisplay', 'clear display'),
      ino(block) {
        // 引入点整灯头文件并创建全局变量
        this.definitions_['include_Arduino_LED_Matrix'] = '#include "Arduino_LED_Matrix.h"';
        this.definitions_['variable_matrix'] = 'ArduinoLEDMatrix _matrix;';
        this.definitions_['variable_matrix_frame'] = 'uint32_t _MATRIX_FRAME_[] = {0x0,0x0,0x0};';

        // 在setup函数中加入matrix的初始化
        this.definitions_['setup_matrix'] = '_matrix.begin();';

        let code = '';
        code += '_MATRIX_FRAME_[0] = 0x0;\n';
        code += '_MATRIX_FRAME_[1] = 0x0;\n';
        code += '_MATRIX_FRAME_[2] = 0x0;\n';
        code += '_matrix.loadFrame(_MATRIX_FRAME_);\n';
        return code;
      },
    },
    {
      // 8x12点阵灯
      id: 'matrixR4',
      shadow: true,
      output: 'string',
      inputs: {
        MATRIX: {
          type: 'matrix',
          width: 12,
          height: 8,
        },
      },
      ino(block) {
        const matrix = block.getFieldValue('MATRIX');
        const frame = [];
        for (let i = 0; i < 3; i++) {
          const bin = matrix.slice(i * 32, (i + 1) * 32);
          const hex = parseInt(bin, 2).toString(16);
          frame.push(hex);
        }
        return [frame.join(','), this.ORDER_ATOMIC];
      },
    },
  ],
  menus: {
    UNO_PINS: {
      // Arduino Uno R3/R4 所有引脚
      items: [
        ['0', '0'],
        ['1', '1'],
        ['2', '2'],
        ['3', '3'],
        ['4', '4'],
        ['5', '5'],
        ['6', '6'],
        ['7', '7'],
        ['8', '8'],
        ['9', '9'],
        ['10', '10'],
        ['11', '11'],
        ['12', '12'],
        ['13', '13'],
        ['A0', 'A0'],
        ['A1', 'A1'],
        ['A2', 'A2'],
        ['A3', 'A3'],
        ['A4', 'A4'],
        ['A5', 'A5'],
      ],
    },
    NANO_PINS: {
      // Arduino Nano 所有引脚
      items: [
        ['0', '0'],
        ['1', '1'],
        ['2', '2'],
        ['3', '3'],
        ['4', '4'],
        ['5', '5'],
        ['6', '6'],
        ['7', '7'],
        ['8', '8'],
        ['9', '9'],
        ['10', '10'],
        ['11', '11'],
        ['12', '12'],
        ['13', '13'],
        ['A0', 'A0'],
        ['A1', 'A1'],
        ['A2', 'A2'],
        ['A3', 'A3'],
        ['A4', 'A4'],
        ['A5', 'A5'],
        ['A6', 'A6'],
        ['A7', 'A7'],
      ],
    },
    PWM_PINS: {
      // Arduino UNO/Nano PWM 写引脚
      items: [
        ['3', '3'],
        ['5', '5'],
        ['6', '6'],
        ['9', '9'],
        ['10', '10'],
        ['11', '11'],
      ],
    },
    R4_PWM_PINS: {
      // Arduino UNO R4 模拟和 PWM 写引脚
      items: [
        ['3', '3'],
        ['5', '5'],
        ['6', '6'],
        ['9', '9'],
        ['10', '10'],
        ['11', '11'],
        ['A0', 'A0'],
      ],
    },
    UNO_ANALOG_PINS: {
      // Arduino UNO 模拟读引脚
      items: [
        ['A0', 'A0'],
        ['A1', 'A1'],
        ['A2', 'A2'],
        ['A3', 'A3'],
        ['A4', 'A4'],
        ['A5', 'A5'],
      ],
    },
    NANO_ANALOG_PINS: {
      // Arduino Nano 模拟读引脚
      items: [
        ['A0', 'A0'],
        ['A1', 'A1'],
        ['A2', 'A2'],
        ['A3', 'A3'],
        ['A4', 'A4'],
        ['A5', 'A5'],
        ['A6', 'A6'],
        ['A7', 'A7'],
      ],
    },
  },
});
