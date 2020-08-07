const path = require('path');
const fs = require('fs-extra');
const ora = require('ora');
const gulp = require('gulp');
const nop = require('gulp-nop');
const sass = require('gulp-sass');
const cssMin = require('@feq/gulp-css-min');
const cssWrap = require('@feq/gulp-css-wrap');
const autoprefixer = require('gulp-autoprefixer');
const isEmpty = require('lodash.isempty');
const config = require('./config')();

sass.compiler = require('dart-sass');

// opts 用户命令行输入参数
exports.copyFonts = (opts) => {
  const spin = ora(opts.message).start();
  const stream = gulp.src(path.resolve(config.themePath, './src/fonts/**'))
    .pipe((opts.minimize || config.minimize) ? cssMin() : nop())
    .pipe(gulp.dest(path.resolve(opts.out || config.out, './fonts')))
    .on('end', () => spin.succeed());
  return stream;
};

exports.compileSass = (opts) => {
  const spin = ora(opts.message).start();
  let components;
  let cssFiles = '*';

  if (!isEmpty(config.components)) {
    components = config.components.concat(['base']);
    cssFiles = `{${components.join(',')}}`;
  }
  // 自定义主题变量路径
  const customPath = path.resolve(process.cwd(), opts.vars || config.vars);
  const customVarsContent = fs.pathExistsSync(customPath)
    ? fs.readFileSync(customPath, 'utf8')
    : fs.readFileSync(config.varsPath, 'utf-8');

  const stream = gulp.src([
    opts.vars || config.varsPath,
    path.resolve(config.themePath, `./src/${cssFiles}.scss`),
  ])
    .pipe(sass.sync({
      importer(url, prev) {
        const dir = path.dirname(prev);
        let filePath = path.resolve(dir, url);
        if (!filePath.endsWith('.scss')) filePath += '.scss';
        if (filePath === config.varsPath) {
          return { contents: customVarsContent };
        }
      },
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: config.browserslist,
      cascade: false,
    }))
    .pipe((!isEmpty(opts.scope) || !isEmpty(config.scope))
      ? cssWrap({ selector: `${opts.scope || config.scope}` })
      : nop())
    .pipe((opts.minimize || config.minimize) ? cssMin() : nop())
    .pipe(gulp.dest(opts.out || config.out))
    .on('end', () => spin.succeed());

  return stream;
};
