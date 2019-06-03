const gulp = require('gulp');
const chalk = require('chalk');
const task = require('./lib/task');
const vars = require('./lib/gen-vars');
const config = require('./lib/config')();

const build = opts => () => task.compileSass(Object.assign(opts, { message: `${chalk.green('etg: build element theme')}\n` }));

const fonts = opts => () => task.copyFonts(Object.assign(opts, { message: `${chalk.green('etg: build theme fonts')}\n` }));

exports.init = (filePath) => {
  const _filePath = {}.toString.call(filePath) === '[object String]' ? filePath : '';
  vars.init(_filePath);
};

exports.watch = (opts) => {
  gulp.task('build', build(opts));
  exports.run(opts);
  const varsPath = opts.vars || config.vars;
  gulp.watch(varsPath, gulp.series('build'));
};

exports.run = (opts, cb) => {
  gulp.task('build', build(opts));
  gulp.task('fonts', fonts(opts));
  if (typeof cb === 'function') {
    return gulp.series('build', 'fonts', cb)();
  }
  return gulp.series('build', 'fonts')();
};
