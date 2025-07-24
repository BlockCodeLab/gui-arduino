export const VARIABLE_TYPES = ['int', 'float', 'boolean', 'char', 'byte', 'String'];

export default () => ({
  id: 'data',
  skipXML: true,
  blocks: [
    {
      // 声明变量
      id: 'setvariableto',
      ino(block) {
        const varType = block.getFieldValue('TYPE') || 'int';
        const varName = this.getVariableName(block.getFieldValue('VARIABLE'));
        const code = `${varType} ${varName};`;

        // 全局变量
        const rootBlock = block.getRootBlock();
        if (rootBlock.type === 'event_whensetup') {
          this.definitions_[`variable_${varName}`] = code;
          return '';
        }
        // 私有变量
        return code + '\n';
      },
    },
    {
      // 设置变量
      id: 'changevariableby',
      ino(block) {
        const varName = this.getVariableName(block.getFieldValue('VARIABLE'));
        const varValue = this.valueToCode(block, 'VALUE', this.ORDER_NONE);
        const code = `${varName} = ${varValue};\n`;
        return code;
      },
    },
    {
      // 获取变量
      id: 'variable',
      ino(block) {
        const varName = this.getVariableName(block.getFieldValue('VARIABLE'));
        return [varName, this.ORDER_ATOMIC];
      },
    },
    {
      // 声明数组
      id: 'insertatlist',
      ino(block) {
        const arrType = block.getFieldValue('TYPE') || 'int';
        const arrName = 'arr' + this.getVariableName(block.getFieldValue('LIST'));
        const arrSize = this.valueToCode(block, 'INDEX', this.ORDER_NONE);
        const code = `${arrType} ${arrName}[${arrSize}];`;

        // 全局变量
        const rootBlock = block.getRootBlock();
        if (rootBlock.type === 'event_whensetup') {
          this.definitions_[`variable_${arrName}`] = code;
          return '';
        }
        // 私有变量
        return code + '\n';
      },
    },
    {
      // 设置数组项
      id: 'replaceitemoflist',
      ino(block) {
        const arrName = 'arr' + this.getVariableName(block.getFieldValue('LIST'));
        const arrValue = this.valueToCode(block, 'ITEM', this.ORDER_NONE);
        const index = this.valueToCode(block, 'INDEX', this.ORDER_NONE);
        const code = `${arrName}[${index}] = ${arrValue};\n`;
        return code;
      },
    },
    {
      // 获取数组
      id: 'listcontents',
      ino(block) {
        const arrName = 'arr' + this.getVariableName(block.getFieldValue('LIST'));
        return [arrName, this.ORDER_ATOMIC];
      },
    },
    {
      // 获取数组项
      id: 'itemoflist',
      ino(block) {
        const arrName = 'arr' + this.getVariableName(block.getFieldValue('LIST'));
        const index = this.valueToCode(block, 'INDEX', this.ORDER_NONE);
        const code = `${arrName}[${index}]`;
        return [code, this.ORDER_MEMBER];
      },
    },
    {
      // 数组长度
      id: 'lengthoflist',
      ino(block) {
        const arrName = 'arr' + this.getVariableName(block.getFieldValue('LIST'));
        const code = `(sizeof(${arrName}) / sizeof(${arrName}[0]))`;
        return [code, this.ORDER_DIVIDE];
      },
    },
  ],
});
