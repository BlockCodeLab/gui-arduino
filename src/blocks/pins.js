import { translate, themeColors } from '@blockcode/core';
import { ScratchBlocks } from '@blockcode/blocks';

export default () => ({
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
          menu: 'PINS',
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
          menu: 'PINS',
        },
        VALUE: {
          inputMode: true,
          type: 'number',
          defaultValue: 1,
          menu: [
            [translate('arduino.blocks.digitalHigh', 'high'), 1],
            [translate('arduino.blocks.digitalLow', 'low'), 0],
          ],
        },
      },
      ino(block) {
        const pin = block.getFieldValue('PIN') || 0;
        const value = block.getFieldValue('VALUE') || 0;
        const code = `digitalWrite(${pin}, ${value});\n`;
        return code;
      },
    },
    {
      // pwm引脚设为
      id: 'setanalog',
      text: translate('arduino.blocks.setanalog', 'set pwm pin %1 to %2'),
      inputs: {
        PIN: {
          menu: 'PWM_PINS',
        },
        VALUE: {
          type: 'integer',
          defaultValue: 127,
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
      // 数字引脚是否为高电平？
      id: 'digital',
      text: translate('arduino.blocks.isDigitalHigh', 'digital pin %1 is high?'),
      output: 'boolean',
      inputs: {
        PIN: {
          menu: 'PINS',
        },
      },
      ino(block) {
        const pin = block.getFieldValue('PIN') || 0;
        const code = `digitalRead(${pin}) == HIGH\n`;
        return code;
      },
    },
    {
      // 模拟引脚值
      id: 'analog',
      text: translate('arduino.blocks.analogValue', 'analog pin %1'),
      output: 'number',
      inputs: {
        PIN: {
          menu: 'ANALOG_PINS',
        },
      },
      ino(block) {
        const pin = block.getFieldValue('PIN') || 0;
        const code = `analogRead(${pin})\n`;
        return code;
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
          menu: 'PINS',
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
          menu: 'PINS',
        },
      },
      ino(block) {
        const pin = block.getFieldValue('PIN') || 0;
        const code = `detachInterrupt(digitalPinToInterrupt(${pin}));\n`;
        return code;
      },
    },
  ],
  menus: {
    PINS: {
      // 所有引脚
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
    PWM_PINS: {
      // 模拟写引脚
      items: [
        ['3', '3'],
        ['5', '5'],
        ['6', '6'],
        ['9', '9'],
        ['10', '10'],
        ['11', '11'],
      ],
    },
    ANALOG_PINS: {
      // 模拟读引脚
      items: [
        ['A0', 'A0'],
        ['A1', 'A1'],
        ['A2', 'A2'],
        ['A3', 'A3'],
        ['A4', 'A4'],
        ['A5', 'A5'],
      ],
    },
  },
});
