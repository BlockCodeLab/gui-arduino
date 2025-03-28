import { ScratchBlocks } from '@blockcode/blocks';

export default () => ({
  id: 'procedures',
  skipXML: true,
  blocks: [
    {
      id: 'definition',
      ino(block) {
        const myBlock = block.childBlocks_[0];
        let funcName = this.getVariableName(myBlock.getProcCode(), ScratchBlocks.Procedures.NAME_TYPE);
        const args = myBlock.childBlocks_.map((argBlock) => this.getVariableName(argBlock.getFieldValue('VALUE')));
        console.log(args);
        console.log(funcName);
      },
    },
    {
      id: 'call',
      ino(block) {},
    },
    {
      id: 'return',
      ino(block) {},
    },
  ],
});
