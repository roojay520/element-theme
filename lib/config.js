const path = require('path');
const merge = require('lodash.merge');
const clonedeep = require('lodash.clonedeep');
const log = require('fancy-log');
const chalk = require('chalk');
const fs = require('fs-extra');

const cwd = file => path.resolve(process.cwd(), file);

const loadConfig = (opts = {}) => {
  /**
   * opts: 命令行输入
   * packageJson: package.json 里面定义的 element-theme-generator
   * etgConfig: 项目根目录下的 .etgconfig.js 文件
   * defaultConfig: 默认配置文件
   * 配置优先级顺序: 命令行指定 optsConfig > etgConfig > packageJsonConfig> defaultConfig
   */
  let packageJson = { 'element-theme-generator': {} };
  let etgConfig = {};
  let defaultConfig = {};
  try {
    if (fs.pathExistsSync(cwd('package.json'))) packageJson = require(cwd('package.json'));
    if (fs.pathExistsSync(cwd('.etgconfig.js'))) etgConfig = require(cwd('.etgconfig.js'));
    defaultConfig = require(path.resolve(__dirname, '../.etgconfig.js'));
    const config = merge(
      defaultConfig,
      etgConfig,
      packageJson['element-theme-generator'],
      etgConfig,
      opts,
    );
    // 原始主题路径
    config.themePath = path.resolve(process.cwd(), `./node_modules/${config.theme}`);
    // 原始主题变量路径
    config.varsPath = path.resolve(config.themePath, './src/common/var.scss');
    return clonedeep(config);
  } catch (err) {
    log(chalk.yellow('etg: config file load filed'), chalk.red(err.message));
  }
};

module.exports = loadConfig;
