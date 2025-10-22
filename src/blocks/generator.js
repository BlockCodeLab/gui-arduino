import { ClangGenerator } from '@blockcode/blocks';

const GENERATOR_COMMENT = '/* Generate by BlockCode */\n';

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
    const setups = [];
    for (let name in this.definitions_) {
      const def = this.definitions_[name];
      if (name.match('include_')) {
        includes.push(def);
      } else if (name.match('declare_')) {
        declarations.push(def); // declaration
      } else if (name.match('define_')) {
        defines.push(def); // #define
      } else if (name.match('variable_')) {
        defvars.push(def); // variable
      } else if (name.match('setup_')) {
        setups.push(def); // setup
      } else {
        func_definitions.push(def); // definition
      }
    }
    //imports--> #include
    //definitions--> function def, #def
    let allDefs = '';
    if (includes.length > 0) {
      allDefs += includes.join('\n') + '\n\n';
    }
    if (declarations.length > 0) {
      allDefs += declarations.join('\n') + '\n\n';
    }
    if (defines.length > 0) {
      allDefs += defines.join('\n') + '\n\n';
    }
    if (defvars.length > 0) {
      allDefs += defvars.join('\n') + '\n\n';
    }

    if (setups.length > 0) {
      this.setup_ = this.INDENT + setups.join(`\n${this.INDENT}`) + `\n${this.setup_}`;
    }

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

    return GENERATOR_COMMENT + allDefs.replace(/\n\n+/g, '\n\n') + code + allFuncs.replace(/\n\n+/g, '\n\n');
  }
}
