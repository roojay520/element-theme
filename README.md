# element-theme-generator

Element ui 主题生成器, fork 自[element-theme](https://github.com/ElementUI/element-theme), 增加命名空间选项, 调整了一些过时的依赖包, 当前版本仅兼容 element-ui@2.x

## 安装

1. 安装主题生成器:
`yarn add @feq/element-theme-generator -D`
2. 安装官方原生主题:
`yarn add element-theme-chalk -D`

## 添加配置文件

在项目根目录下添加相关的配置文件`.etgconfig.js`

```javascript
module.exports = {
  vars: './theme/element-variables.scss', // 变量生成路径也是打包的变量入口
  out: './theme/default', // 主题生成路径
  theme: 'element-theme-chalk', // 官方主题名
  minimize: true, // 开启压缩
  watch: false, // 监听编译
  scope: '', // 命名空间 css 选择器, 默认为空不开启
  components: [], // 按需编译组件列表
  browsers: ['ie > 10', 'last 2 versions'], // 浏览器兼容版本
};
```

执行`etg`, 完成编译

## 命令行方式使用

> `etg` 命令仅当全局安装 `@feq/element-theme-generator` 时有效, 或者使用 `npx etg`

```shell
etg -h

Usage: etg [options]

Options:
  -V, --version              查看版本
  --init [filePath]          初始化变量文件
  -w --watch                 监听编译
  -o --out <outPath>         主题输出路径
  -s --scope <scopeName>     命名空间
  -m --minimize              压缩
  -i --input <varsFilePath>  指定变量文件
  -b --browsers <items>      浏览器兼容列表
  -h, --help                 帮助
```

示例:

```shell
# 生成变量文件, 默认生成变量路径为: `./theme/element-variables.scss`
etg --init [file path]

# 监听编译
etg --watch [--input variable file path] [--out theme path]

# 压缩编译编译
etg [--input variable file path] [--out theme path] [--minimize]

# 命名空间
etg [--input variable file path] [--out theme path] [--minimize] [--scope css selector]
```

## node 配置文件方式使用
其中 options 和 .etgconfig.js 中文件格式一致

```javascript
var etg = require('@feq/element-theme-generator')

// watch mode
etg.watch(options)

// build
etg.run(options)
```

## License
MIT
