const { resolve } = require('node:path');
const { existsSync } = require('node:fs');
const { copydir } = require('./scripts/copy');

module.exports = {
  hooks: {
    // 将 arduino-cli 复制到 resources 文件夹
    packageAfterCopy: async (forgeConfig, buildPath, electronVersion, platform, arch) => {
      // 检查对应系统版本的 arduino_cli 文件夹是否存在
      const assetsDir = resolve(__dirname, `arduino_cli/${platform}_${arch}`);
      if (!existsSync(assetsDir)) return;

      // 复制到 resources 文件夹
      const resourcesDir = resolve(buildPath, '../arduino_cli');
      copydir(assetsDir, resourcesDir);
    },
  },
};
