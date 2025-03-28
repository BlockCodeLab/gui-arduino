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
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        const delayMS = this.valueToCode(block, 'MS', this.ORDER_NONE) || 500;
        code += `delay(${delayMS});\n`;
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
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
      
        let branchCode = this.statementToCode(block, 'SUBSTACK') || '';
        if (this.STATEMENT_SUFFIX) {
          branchCode = this.prefixLines(this.injectId(this.STATEMENT_SUFFIX, block), this.INDENT) + branchCode;
        }
        const timesCode = this.valueToCode(block, 'TIMES', this.ORDER_NONE) || 0;
        code += `for (int i = 0; i < ${timesCode}; i++) {\n`;
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
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
      
        let branchCode = this.statementToCode(block, 'SUBSTACK') || '';
        if (this.STATEMENT_SUFFIX) {
          branchCode = this.prefixLines(this.injectId(this.STATEMENT_SUFFIX, block), this.INDENT) + branchCode;
        }
      
        code += `while (true) {\n${branchCode}}\n`;
        return code;
      }
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
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
      
        let branchCode = this.statementToCode(block, 'SUBSTACK') || '';
        if (this.STATEMENT_SUFFIX) {
          branchCode = this.prefixLines(this.injectId(this.STATEMENT_SUFFIX, block), this.INDENT) + branchCode;
        }
      
        const conditionCode = this.valueToCode(block, 'CONDITION', this.ORDER_NONE) || 'false';
        code += `if (${conditionCode}) {\n${branchCode}}\n`;
      
        return code;
      }
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
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
      
        let branchCode = this.statementToCode(block, 'SUBSTACK') || '';
        if (this.STATEMENT_SUFFIX) {
          branchCode = this.prefixLines(this.injectId(this.STATEMENT_SUFFIX, block), this.INDENT) + branchCode;
        }
      
        const conditionCode = this.valueToCode(block, 'CONDITION', this.ORDER_NONE) || 'false';
        code += `else if (${conditionCode}) {\n${branchCode}}\n`;
      
        return code;
      }
    },
    {
      // 否则
      id: 'else',
      text: translate('arduino.blocks.else', 'else'),
      substack: true,
      ino(block) {
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
      
        let branchCode = this.statementToCode(block, 'SUBSTACK') || '';
        if (this.STATEMENT_SUFFIX) {
          branchCode = this.prefixLines(this.injectId(this.STATEMENT_SUFFIX, block), this.INDENT) + branchCode;
        }
        code += `else {\n${branchCode}}\n`;
      
        return code;
      }
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
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }

        let branchCode = this.statementToCode(block, 'SUBSTACK') || '';
        if (this.STATEMENT_SUFFIX) {
          branchCode = this.prefixLines(this.injectId(this.STATEMENT_SUFFIX, block), this.INDENT) + branchCode;
        }
        const conditionCode = this.valueToCode(block, 'CONDITION', this.ORDER_NONE) || 'true';

        code += `while (!(${conditionCode})) {\n${branchCode}}\n`;
        return code;
      }
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
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }

        let branchCode = this.statementToCode(block, 'SUBSTACK') || '';
        if (this.STATEMENT_SUFFIX) {
          branchCode = this.prefixLines(this.injectId(this.STATEMENT_SUFFIX, block), this.INDENT) + branchCode;
        }
        const conditionCode = this.valueToCode(block, 'CONDITION', this.ORDER_NONE) || 'true';

        code += `while ((${conditionCode})) {\n${branchCode}}\n`;
        return code;
      }
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
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }

        const unit = this.getFieldValue('UNIT');
        code += `millis()${unit === 'SEC' ? '/1000' : ''}`;
        return code; 
      },
    },
  ],
});
