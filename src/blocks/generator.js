import { ClangGenerator } from '@blockcode/blocks';

export class ArduinoGenerator extends ClangGenerator {
  constructor() {
    super('INO');
  }

  init(workspace) {
    super.init(workspace);

    // 获取用户定义
    this.onDefinitions?.();

    // 获取变量定义
    if (this.onVariableDefinitions) {
      delete this.definitions_['variables'];
      this.onVariableDefinitions(workspace);
    }
  }
}
