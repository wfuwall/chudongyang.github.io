### vue.js 源码分析-准备阶段
通过对 vue 源码的分析，并通过自己去实现一套简化版的 vue，加深对 vue 的理解。

### 什么 flow
JavaScript 是动态类型的语言，比较灵活，所以有些 bug 在编译期发现不了，但是在运行期就会出现。为了更早的发现问题，解决问题，所以 vue 引入了 [flow](https://flow.org/) 做静态类型检查。

### Vue.js 源码目录设计
```
src
  |--compiler   编译相关
  |--core       核心代码
  |--platforms  不同平台的支持
  |--server     服务端渲染
  |--sfc        .vue 文件解析
  |--shared     共享代码
```
- compiler 目录包含了所有 vue.js 编译相关的代码
  - 包括把模板解析成 ast 语法树，ast 语法树的优化，代码生成等功能；
  - 编译可以借助 webpack，vue-loader 等辅助插件在构建时做，也可以在运行时做，但是因为编译是一件耗性能的事情，所以推荐前者离线编译。

- core 目录包含了 vue.js 的核心代码，包括内置组件、全局 API、Vue 实例化、观察者，虚拟 DOM 和工具函数等等。
- platform 目录包含了运行在 web 和 weex 两个平台上不同的 vue.js。
- server 目录是服务端渲染相关的代码实现。
- sfc 目录下的代码会是把 .vue 文件解析成一个 JavaScript 对象。
- shared 目录定义了浏览器端和服务端共享的方法。

### Vue.js 源码构建
vue.js 的构建时基于 [rollup](https://www.rollupjs.com/) ,相关的构建配置在 scripts 目录下。rollup 是一个 JavaScript 模块打包器， 更适合去打包类库。 而 Webpack 更适合去打包工程化的项目或应用程序。
- 查看 vue.js 的执行脚本, 可以看到下面三条构建的运行脚本
```js
{
  "scripts": {
    "build": "node scripts/build.js",
    "build:ssr": "npm run build -- web-runtime-cjs,web-server-renderer",
    "build:weex": "npm run build -- weex",
  }
}
```
- 打开构建的 scripts/build.js 入口文件, 发现执行的是 scripts/config.js 文件导出的 getAllBuilds 方法
```js
let builds = require('./config').getAllBuilds()

// filter builds via command line arg
if (process.argv[2]) {
  const filters = process.argv[2].split(',')
  builds = builds.filter(b => {
    return filters.some(f => b.output.file.indexOf(f) > -1 || b._name.indexOf(f) > -1)
  })
} else {
  // filter out weex builds by default
  builds = builds.filter(b => {
    return b.output.file.indexOf('weex') === -1
  })
}

build(builds)
```
- 在 scripts/config.js 文件中，通过 builds 变量定义了很多构建配置
```js
const builds = {
  // Runtime only (CommonJS). Used by bundlers e.g. Webpack & Browserify
  'web-runtime-cjs-dev': {
    entry: resolve('web/entry-runtime.js'), // 入口文件 resolve函数返回的是 entry-runtime.js 所在的绝对路径
    dest: resolve('dist/vue.runtime.common.dev.js'), // 出口文件 
    format: 'cjs', // 构建类型 cjs: 表示构建后文件遵循 commonJs 规范，es: 表示遵循 ESModule 规范，umd: 表示遵循 UMD 规范
    env: 'development', // 环境
    banner
  },
  'web-runtime-cjs-prod': {
    entry: resolve('web/entry-runtime.js'),
    dest: resolve('dist/vue.runtime.common.prod.js'),
    format: 'cjs',
    env: 'production',
    banner
  },
  ...
}
```
### Runtime Only VS Runtime + Compiler
- Runtime Only 运行时，一般我们使用 vue-cli 构建的项目都会借助 webpack 和 vue-loader 等工具在编译阶段就把 .vue 文件 编译成了 JavaScript 代码，所以一般打包后的项目使用 vue.runtime.min.js 运行时的 vue 代码即可，体积更小更轻量。
- Runtime + Compiler 运行时 + 编译器，vue.min.js 文件相比于运行时大了约 30%，当我们使用了 Vue 的 template 模板并传入了一个字符串，则需要在客户端编译模板，因此可以选用这个版本。

### vue.js 的入口


参考文章：
- [《Vue.js 技术揭秘》](https://ustbhuangyi.github.io/vue-analysis/)