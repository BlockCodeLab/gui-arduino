import { ScratchBlocks } from '@blockcode/blocks';

const ARGUMENT_TYPES = {
  argument_reporter_string_number: 'String',
  argument_reporter_boolean: 'bool',
  argument_reporter_number: 'float',
};

const PROCEDURES_CALL_TYPE_STATEMENT = 0;
const PROCEDURES_CALL_TYPE_BOOLEAN = 1;
const PROCEDURES_CALL_TYPE_REPORTER = 2;
const PROCEDURES_CALL_TYPE_REPORTER_STRING = 3;
const RETURN_TYPES = {
  [PROCEDURES_CALL_TYPE_STATEMENT]: 'void',
  [PROCEDURES_CALL_TYPE_BOOLEAN]: 'bool',
  [PROCEDURES_CALL_TYPE_REPORTER]: 'float',
  [PROCEDURES_CALL_TYPE_REPORTER_STRING]: 'String',
};

export default () => ({
  id: 'procedures',
  skipXML: true,
  blocks: [
    {
      id: 'definition',
      ino(block) {
        const myBlock = block.childBlocks_[0];
        const funcName = this.getFunctionName(myBlock.getProcCode());
        const branchCode = this.statementToCode(block);

        // 参数格式：type name
        const args = myBlock.childBlocks_.map(
          (argBlock) => `${ARGUMENT_TYPES[argBlock.type]} ${this.getVariableName(argBlock.getFieldValue('VALUE'))}`,
        );
        // 返回类型
        const returnType = RETURN_TYPES[myBlock.return_ ?? PROCEDURES_CALL_TYPE_STATEMENT];

        // 声明函数
        this.definitions_[`declare_${funcName}`] = `${returnType} ${funcName}();`;

        // 定义函数
        let code = '';
        code += `${funcName}(${args.join(', ')}) {\n`;
        code += branchCode;
        code += '}';
        this.definitions_[funcName] = `${returnType} ${code}`;
      },
    },
    {
      id: 'call',
      ino(block) {
        const funcName = this.getFunctionName(block.getProcCode());
        const args = block.argumentIds_.map((arg) => this.valueToCode(block, arg, this.ORDER_NONE) || 'false');
        const code = `${funcName}(${args.join(', ')})`;

        if (block.return_) {
          return [code, this.ORDER_FUNCTION_CALL];
        }
        return code + ';\n';
      },
    },
    {
      id: 'return',
      ino(block) {
        const valueCode = this.valueToCode(block, 'VALUE', this.ORDER_NONE);
        const code = `return ${valueCode};\n`;
        return code;
      },
    },
    {
      id: 'return_string',
      ino(block) {
        const valueCode = this.valueToCode(block, 'STR', this.ORDER_NONE);
        const code = `return String(${valueCode});\n`;
        return code;
      },
    },
  ],
});
