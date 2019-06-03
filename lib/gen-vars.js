const path = require('path');
const fs = require('fs-extra');
const ora = require('ora');
const inquirer = require('inquirer');
const config = require('./config')();

module.exports = {
  check: () => {
    if (!fs.pathExistsSync(config.varsPath)) {
      ora(`Please install ${config.theme}`).fail();
      process.exit(1);
    }
  },
  init: async (inputVarsFile = '') => {
    const spinner = ora('Generator variables file').start();
    // vars 目标文件输出位置
    const varsfilePath = inputVarsFile
      ? path.resolve(process.cwd(), inputVarsFile)
      : config.vars;
    try {
      const options = { overwrite: false, errorOnExist: true };
      await fs.copy(config.varsPath, varsfilePath, options);
      spinner.text = `Variables file already created: ${varsfilePath}`;
      spinner.succeed();
    } catch (error) {
      spinner.text = error.message;
      spinner.fail();
      const answers = await inquirer.prompt([{
        type: 'confirm',
        name: 'overwrite',
        message: 'Overwrite variables file?',
        default: true,
      }]);
      if (answers.overwrite) {
        await fs.copy(config.varsPath, varsfilePath);
        spinner.text = `Variables file already created: ${path.resolve(varsfilePath)}`;
        spinner.succeed();
      }
    }
  },
};
