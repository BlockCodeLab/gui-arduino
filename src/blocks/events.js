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
      ino(block) {},
    },
    {
      // loop 函数
      id: 'whenloop',
      text: translate('arduino.blocks.whenloop', 'when Arduino loop'),
      hat: true,
      ino(block) {},
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
      ino(block) {},
    },
    {
      // 开启定时器
      id: 'timeron',
      text: translate('arduino.blocks.timeron', 'start timer'),
      ino(block) {},
    },
    {
      // 关闭定时器
      id: 'timeroff',
      text: translate('arduino.blocks.timeroff', 'stop timer'),
      ino(block) {},
    },
  ],
});
