import { translate, themeColors } from '@blockcode/core';
import { ScratchBlocks } from '@blockcode/blocks';

export default (classicEvents) => {
  // setup...loop 联合函数
  ScratchBlocks.Blocks['event_whensetuploop'] = {
    init() {
      this.jsonInit({
        message0: translate('arduino.blocks.whensetup', 'when Arduino setup'),
        message1: '%1',
        message2: ScratchBlocks.Msg.CONTROL_FOREVER,
        message3: '%1',
        message4: '%1', // Icon
        lastDummyAlign4: 'RIGHT',
        args1: [
          {
            type: 'input_statement',
            name: 'SUBSTACK1',
          },
        ],
        args3: [
          {
            type: 'input_statement',
            name: 'SUBSTACK2',
          },
        ],
        args4: [
          {
            type: 'field_image',
            src: './assets/blocks-media/repeat.svg',
            width: 24,
            height: 24,
            alt: '*',
            flip_rtl: true,
          },
        ],
        category: 'event',
        extensions: ['colours_event'],
      });
      this.setPreviousStatement(false);
      this.setNextStatement(false);
    },
  };

  return {
    id: 'event',
    name: '%{BKY_CATEGORY_EVENTS}',
    themeColor: themeColors.blocks.events.primary,
    inputColor: themeColors.blocks.events.secondary,
    otherColor: themeColors.blocks.events.tertiary,
    blocks: [
      {
        label: translate('arduino.blocks.classicEventsLabel', 'Classic events turned on from Edit.'),
        hidden: classicEvents,
      },
      {
        // setup...loop 联合函数
        id: 'whensetuploop',
        custom: true,
        hidden: !classicEvents,
        ino(block) {
          const setupCode = this.statementToCode(block, 'SUBSTACK1') || '';
          this.setup_ += setupCode;

          const loopCode = this.statementToCode(block, 'SUBSTACK2') || '';
          this.loop_ += loopCode;
        },
      },
      '---',
      {
        // setup 函数
        id: 'whensetup',
        text: translate('arduino.blocks.whensetup', 'when Arduino setup'),
        hat: true,
        ino(block) {
          const branchCode = this.statementToCode(block) || '';
          this.setup_ += branchCode;
        },
      },
      {
        // loop 函数
        id: 'whenloop',
        text: translate('arduino.blocks.whenloop', 'when Arduino loop'),
        hat: true,
        ino(block) {
          const branchCode = this.statementToCode(block) || '';
          this.loop_ += branchCode;
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
          this.definitions_['include_mstimer2'] = `#include <MsTimer2.h>`;

          const delayMs = this.valueToCode(block, 'TIME', this.ORDER_NONE) || 500;
          const funcName = `msTimer_${delayMs}`;

          // 定义定时器回调函数
          const branchCode = this.statementToCode(block) || '';
          this.definitions_[`declare_${funcName}`] = `void ${funcName}();`;
          this.definitions_[funcName] = `void ${funcName}() {\n${branchCode}}`;

          // 将设置定时器放入setup最前面
          const code = this.INDENT + `MsTimer2::set(${delayMs}, ${funcName});\n`;
          this.setup_ = code + this.setup_;
        },
      },
      {
        // 开启定时器
        id: 'timeron',
        text: translate('arduino.blocks.timeron', 'start timer'),
        ino(block) {
          this.definitions_['include_mstimer2'] = `#include <MsTimer2.h>`;
          const code = `MsTimer2::start();\n`;
          return code;
        },
      },
      {
        // 关闭定时器
        id: 'timeroff',
        text: translate('arduino.blocks.timeroff', 'stop timer'),
        ino(block) {
          this.definitions_['include_mstimer2'] = `#include <MsTimer2.h>`;
          const code = `MsTimer2::stop();\n`;
          return code;
        },
      },
    ],
  };
};
