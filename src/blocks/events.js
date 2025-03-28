import { translate, themeColors } from '@blockcode/core';
import { ScratchBlocks } from '@blockcode/blocks';

export default () => ({
  id: 'event',
  name: '%{BKY_CATEGORY_EVENTS}',
  themeColor: themeColors.blocks.events.primary,
  inputColor: themeColors.blocks.events.secondary,
  otherColor: themeColors.blocks.events.tertiary,
  blocks: [
    {
      // setup 函数
      id: 'whensetup',
      text: translate('arduino.blocks.whensetup', 'when Arduino setup'),
      hat: true,
      ino(block) {
        this.definitions_['include_arduino'] = `#include <Arduino.h>`;
        var code = `void setup() {\n`;
        code += `/* setupCode */`;
        code += `}\n`;
        return code;
      },
    },
    {
      // loop 函数
      id: 'whenloop',
      text: translate('arduino.blocks.whenloop', 'when Arduino loop'),
      hat: true,
      ino(block) {
        this.definitions_['include_arduino'] = `#include <Arduino.h>`;
        var code = `void loop() {\n`;
        code += `/* loopCode */`;
        code += `}\n`;
        return code;
      },
    },
    '---',
    {
      // 定时器
      id: 'whentimer',
      text: translate('arduino.blocks.whentimer', 'when timer per %1 milliseconds'),
      hat: true,
      inputs: {
        TIME: {
          type: 'integer',
          defaultValue: 500,
        },
      },
      ino(block) {
        const delayMS = this.valueToCode(block, 'TIME', this.ORDER_NONE) || 500;
        this.definitions_['Func_declare_timer'] = `#include <MsTimer2.h>`;
        var code = `void msTimer2_func() {\n`;
        code += `/* timerCode */`;
        code += `}\n`;
        this.setupAdd_ += `MsTimer2::set(${delayMS}, msTimer2_func);\n`;
        return code;
      },
    },
    {
      // 开启定时器
      id: 'timeron',
      text: translate('arduino.blocks.timeron', 'start timer'),
      ino(block) {
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        code += `MsTimer2::start();\n`;
        return code;
      },
    },
    {
      // 关闭定时器
      id: 'timeroff',
      text: translate('arduino.blocks.timeroff', 'stop timer'),
      ino(block) {
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        code += `MsTimer2::stop();\n`;
        return code;
      },
    },
  ],
});
