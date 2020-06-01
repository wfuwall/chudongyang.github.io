### es6语法-模块化
ES6 模块化的设计思想是尽可能的静态化，使得在编译的时候就确定模块之间的依赖关系，以及输入和输出的变量。由于目前浏览器还没有对 ES6 模块化的进行支持，所以我们需要使用 babel 进行转义。

#### commonJS 和 esModule
- commonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用
- commonJS 是运行时加载，ES6 模块是编译时输出

#### ES6 模块用法
- 导出模块的方式
```js
// 导出方式一 ( 默认文件是 a.js )
export const a = 1; 
// 导出方式二
const a = 1;
export {
  a
}
// 导出方式三
const a = 1;
export default a
// 导出方式四 配置别名导出
const a = 1;
const b = 2;
export {
  a as aa,
  b as default
}
```

- 导入模块的方式 （对应👆的导出）
```js
// 导入方式一（对应导出方式一和二）
import { a } from './a.js'
// 导入方式二 (对应导出方式三)
import a from './a.js'
// 导入方式三 (对应的导出方式四 xxx 取的 b的值，aa 取的是 a 的值)
import xxx, { aa } from './a.js'
// 导入当时四 对应导出方式一和二）
import * as obj from './a.js' 
```
> 导入方式四，是把导出的变量放在了 obj 对象中，取值的时候 obj.a 即可

- 如果我们有很多文件，需要一次性导出
```js
// a.js 
export const a = 1;
export const b = 2;
// b.js
export const c = 3;
export const d = 4;
// index.js
export * from './a.js'
export * from './b.js'
```
> 这样不管我们在其他任何文件中需要访问 a.js 或者 b.js 中的变量和函数，只要使用导入方式一导入 index.js 即可，vue 源码中就大量使用了这种导出语法

- 命名式导出与默认导出
export { 变量 } 这种属于命名式导出，导出的是一个变量的引用。export default 属于默认导出，默认导出的是一个值
```js
// a.js
export let a = 1;
let b = 2;
setInterval(() => {
  a++
  b++
}, 1000)
export default b
// index.js
import b, { a } from './module/a'
setInterval(() => {
  console.log(b, a, '改变后的值') // 2 a的值是一直变化的
}, 1200)
console.log(b, a, '初始值') // 2, 1
```
