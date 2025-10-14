const { resolve } = require('node:path');
const { existsSync } = require('node:fs');
import zl from 'zip-lib';

[
  // 按不同系统版本压缩
  'darwin_arm64',
  'darwin_x64',
  'win32_ia32',
  'win32_x64',
].forEach(async (name) => {
  const sourcePath = resolve(process.cwd(), 'arduino_cli', name);
  const targetPath = sourcePath + '.zip';
  if (!existsSync(sourcePath) || existsSync(targetPath)) return;
  await zl.archiveFolder(sourcePath, targetPath);
  console.log(`archive arduino_cli:${name} done.`);
});
