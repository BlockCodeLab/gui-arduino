import { translate, themeColors } from '@blockcode/core';
import { ScratchBlocks } from '@blockcode/blocks';

export default () => ({
  id: 'control',
  name: '%{BKY_CATEGORY_CONTROL}',
  themeColor: themeColors.blocks.control.primary,
  inputColor: themeColors.blocks.control.secondary,
  otherColor: themeColors.blocks.control.tertiary,
  blocks: [
    {
      // 等待
      id: 'wait',
      text: translate('arduino.blocks.wait', 'wait %1 milliseconds'),
      inputs: {
        MS: {
          type: 'integer',
          defaultValue: 500,
        },
      },
      ino(block) {
        const delayMs = this.valueToCode(block, 'MS', this.ORDER_NONE);
        const code = `delay(${delayMs});\n`;
        return code;
      },
    },
    '---',
    {
      // 重复次数
      id: 'repeat',
      text: ScratchBlocks.Msg.CONTROL_REPEAT,
      repeat: true,
      inputs: {
        TIMES: {
          type: 'integer',
          defaultValue: 10,
        },
      },
      ino(block) {
        const times = this.valueToCode(block, 'TIMES', this.ORDER_NONE);

        let branchCode = this.statementToCode(block, 'SUBSTACK');
        branchCode = this.addLoopTrap(branchCode, block.id);

        let code = '';
        code += `for (int i = 0; i < ${times}; i++) {\n`;
        code += branchCode;
        code += '}\n';
        return code;
      },
    },
    {
      // 无限重复
      id: 'forever',
      text: ScratchBlocks.Msg.CONTROL_FOREVER,
      repeat: true,
      end: true,
      ino(block) {
        let branchCode = this.statementToCode(block, 'SUBSTACK');
        branchCode = this.addLoopTrap(branchCode, block.id);

        let code = '';
        code += 'while (true) {\n';
        code += branchCode;
        code += '}\n';
        return code;
      },
    },
    '---',
    {
      // 如果
      id: 'if',
      text: ScratchBlocks.Msg.CONTROL_IF,
      substack: true,
      inputs: {
        CONDITION: {
          type: 'boolean',
        },
      },
      ino(block) {
        const condition = this.valueToCode(block, 'CONDITION', this.ORDER_NONE) || 'false';
        const branchCode = this.statementToCode(block, 'SUBSTACK');

        let code = '';
        code += `if (${condition}) {\n`;
        code += branchCode;
        code += '}\n';
        return code;
      },
    },
    {
      // 否则，如果
      id: 'elseif',
      text: translate('arduino.blocks.elseif', 'else if %1 then'),
      substack: true,
      inputs: {
        CONDITION: {
          type: 'boolean',
        },
      },
      ino(block) {
        const condition = this.valueToCode(block, 'CONDITION', this.ORDER_NONE) || 'false';
        const branchCode = this.statementToCode(block, 'SUBSTACK');

        // [TODO] 处理 elseif 前面没有 if 的错误情况
        let code = '';
        code += `else if (${condition}) {\n`;
        code += branchCode;
        code += '}\n';
        return code;
      },
    },
    {
      // 否则
      id: 'else',
      text: translate('arduino.blocks.else', 'else'),
      substack: true,
      ino(block) {
        const branchCode = this.statementToCode(block, 'SUBSTACK');

        // [TODO] 处理 else 前面没有 if 的错误情况
        let code = '';
        code += `else {\n`;
        code += branchCode;
        code += '}\n';
        return code;
      },
    },
    '---',
    {
      // 重复直到
      id: 'repeat_until',
      text: ScratchBlocks.Msg.CONTROL_REPEATUNTIL,
      repeat: true,
      inputs: {
        CONDITION: {
          type: 'boolean',
        },
      },
      ino(block) {
        const condition = this.valueToCode(block, 'CONDITION', this.ORDER_NONE) || 'true';
        let branchCode = this.statementToCode(block, 'SUBSTACK');
        branchCode = this.addLoopTrap(branchCode, block.id);

        let code = '';
        code += `while (!(${condition})) {\n`;
        code += branchCode;
        code += '}\n';
        return code;
      },
    },
    {
      // 当重复
      id: 'while',
      text: ScratchBlocks.Msg.CONTROL_WHILE,
      repeat: true,
      inputs: {
        CONDITION: {
          type: 'boolean',
        },
      },
      ino(block) {
        const condition = this.valueToCode(block, 'CONDITION', this.ORDER_NONE) || 'true';
        let branchCode = this.statementToCode(block, 'SUBSTACK');
        branchCode = this.addLoopTrap(branchCode, block.id);

        let code = '';
        code += `while ((${condition})) {\n`;
        code += branchCode;
        code += '}\n';
        return code;
      },
    },
    {
      // continue
      id: 'continue',
      text: translate('arduino.blocks.continue', 'continue'),
      end: true,
      ino(block) {
        let code = '';
        code += 'continue;\n';
        return code;
      },
    },
    {
      // break
      id: 'break',
      text: translate('arduino.blocks.break', 'break'),
      end: true,
      ino(block) {
        let code = '';
        code += 'break;\n';
        return code;
      },
    },
    '---',
    {
      // 运行时长
      id: 'runtime',
      text: translate('arduino.blocks.runtime', 'run time %1'),
      output: 'number',
      inputs: {
        UNIT: {
          menu: [
            [translate('arduino.blocks.runtimeMilliseconds', 'milliseconds'), 'MS'],
            [translate('arduino.blocks.runtimeSeconds', 'seconds'), 'SEC'],
          ],
        },
      },
      ino(block) {
        const unit = block.getFieldValue('UNIT');
        const code = `(millis()${unit === 'SEC' ? '/1000' : ''})`;
        return code;
      },
    },
  ],
});
