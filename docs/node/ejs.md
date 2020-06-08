### node-模板引擎
ssr 服务端渲染的原理：服务端使用模板加数据渲染好一个字符串返给客户端，常用的模板引擎有很多，ejs，jsp等等。

#### ejs模板引擎
- 使用 ejs 模板引擎
```js
// template 是需要被渲染的模板
const ejs = require('ejs')
const result = ejs.render(template, { name: 'Tom', age: 10  })
```
- ejs 模板引擎的实现原理，使用 with 语法, 正则替换和 new Function(arg1, arg2..., functionBody), new Function 的最后一项是函数本身的字符串，前面都是函数的形参
```js
function render(template, data){
  let header = `let str;\r\n with(obj){\r\n`
  header += 'str = `\r\n';
  template = template.replace(/\<\%=(.+?)\%\>/g, function() {
    return '${' + arguments[1] + '}';
  })
  template = template.replace(/\<\%(.+?)\%\>/g, function() {
    return '`\r\n' + arguments[1] + '\r\nstr +=`'
  })
  let tail = '`\r\n}return str';
  const fn = new Function('obj', header + template + tail)
  return fn(data)
}
const result = render(template, { arr: [1, 2, 3], name: 'Tom'})
```