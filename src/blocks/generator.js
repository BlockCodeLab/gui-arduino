import { ClangGenerator } from '@blockcode/blocks';

export class ArduinoGenerator extends ClangGenerator {
  constructor() {
    super('INO');
  }

  init(workspace) {
    super.init(workspace);

    // include 基础头文件
    this.definitions_['include_arduino'] = '#include <Arduino.h>';

    // 用于合并setup
    this.setup_ = '';

    // 用于合并loop
    this.loop_ = '';

    // 获取用户定义
    this.onDefinitions?.();
  }

  finish(code) {
    // Convert the definitions dictionary into a list.
    const includes = [];
    const declarations = [];
    const defines = [];
    const defvars = [];
    const func_definitions = [];
    for (let name in this.definitions_) {
      const def = this.definitions_[name];
      if (name.match('include')) {
        includes.push(def);
      } else if (name.match('declare')) {
        declarations.push(def); // declaration
      } else if (name.match('define')) {
        defines.push(def); // #define
      } else if (name.match('variable')) {
        defvars.push(def); // variable
      } else {
        func_definitions.push(def); // definition
      }
    }
    //imports--> #include
    //definitions--> function def, #def
    const allDefs =
      includes.join('\n') +
      '\n\n' +
      declarations.join('\n') +
      '\n\n' +
      defines.join('\n') +
      '\n\n' +
      defvars.join('\n');
    const allFuncs =
      `void setup() {\n${this.setup_}}` + // setup
      '\n\n' +
      `void loop() {\n${this.loop_}}` + // loop
      '\n\n' +
      func_definitions.join('\n\n');

    delete this.definitions_;
    delete this.functionNames_;
    delete this.setup_;
    delete this.loop_;
    this.variableDB_.reset();

    return allDefs.replace(/\n\n+/g, '\n\n') + '\n\n' + code + allFuncs.replace(/\n\n+/g, '\n\n');
  }
}
