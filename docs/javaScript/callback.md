### 高阶函数
高阶函数的功能很大程度上可以用普通的函数实现，但是高阶函数是代码更加抽象容易理解，使功能更加简洁，在函数复杂时可以很便捷地实现需要的功能。只要符合函数中的参数是一个函数（回调），或者函数的返回值是一个函数（拆分函数），我们都可以称他们为高阶函数。

#### 函数的 before
在函数的原型上定义一个 before 方法, 在调用某函数之前执行
```js
Function.prototype.brfore = function (callback) {
  return (...args) => { // 箭头函数中没有this指向和arguments
    callback()
    this(...args)
  }
}
const say = function(...args) { console.log(args.join(' and ')) }
const newSay = say.brfore(() => { console.log('hello') })
newSay('Tom', 'Lucy')
```

#### react 中的事务概念
在函数开始的时候做，在函数结束的时候做某件事
```js
const perform = (callback, wrappers) => {
  wrappers.forEach(wrapper => wrapper.initilizae())
  callback()
  wrappers.forEach(wrapper => wrapper.close())
}
perform(() => { console.log('hello') },[
  {
    initialize() { console.log('Tom') },
    close() { console.log('goodbey Tom') }
  },
  {
    initialize() { console.log('Lucy') },
    close() { console.log('goodbey Lucy')}
  }
])
```

#### 函数柯里化
将一个函数拆分成多个具体的功能。
- 函数柯里化就是对高阶函数的降阶处理，缩小适用范围，创建一个针对性更强的函数。
- 也可以说是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数的技术。
```js
// 检测数据类型
const utils = {}
function checkType(type) {
  return (content) => {
    return Object.prototype.toString.call(content) === `[object ${type}]`
  }
}
['Number', 'String', 'Boolean', 'Object'].forEach(type => {
  utils['is' + type] = checkType(type)
})
utils.isNumber(123)

// 柯里化面试题
function add(a, b, c, d, e) {
  return a + b + c + d + e
}
function currying(fn, arr = []) {
  return (...args) => {
    arr = [...arr, ...args]
    if (arr.length < fn.length) {
      return currying(add, arr)
    }
    return fn(...arr)
  }
}
currying(add)(1, 2, 3, 4, 5)
currying(add)(1)(2)(3)(4)(5)
currying(add)(1, 2)(3)(4, 5)
```

#### 反柯里化
反柯里化其实反映的是一种思想，即扩大方法的适用范围, 让方法使用场景更大。
- 反柯里化的实现
```js
Function.prototype.unCurrying = function() {
  const self = this
  return function(...rest) {
    return Function.prototype.call.apply(self, rest)
  }
}
const push = Array.prototype.push.unCurrying()
const obj = { a: '嘻嘻' }
push(obj, '呵呵', '哈哈', '嘿嘿')
console.log(obj) // { '0': '呵呵', '1': '哈哈', '2': '嘿嘿', a: '嘻嘻', length: 3 }
```

#### after 函数
等待函数执行次数达到预期时执行，比如lodash库中的
```js
const newAfter = after(3, () => {
  console.log('三次之后执行')
})
function after(time, callback) {
  return () => {
    if (--time === 0) {
      callback()
    }
  }
}
newAfter()
newAfter()
newAfter()
```
#### Promise的实现

[Promise 的实现源码](https://github.com/chudongyang/2020/blob/master/architectural-foundation/callback/txt/Promise.js)

全局下载 `promises-aplus-tests` 插件，可以校验自己实现的 promise 是否符合 Promise/A+ 规范。
```
sudo npm install promises-aplus-tests -g 
```

#### generator 生成器
generator 生成器是 es6 中的语法。比方说我们常用的 arguments 类数组上就有生成器的方法。redux-saga 库中使用的都是生成器和迭代器。
```js
// 定义一个生成器
function * fn(){ 
  yield 1 // 产出
}
// 函数的返回值 it 即 iterator 就是迭代器
let it = fn()
console.log(it.next()) // { value: 1, done: false}
```
当我们使用 ... 和 for of 时必须给当前对象提供一个生成器的方法， 会默认调用生成器的方法。
```js
console.log([...{0: 1, 1: 2, 2: 3, length: 3, [Symbol.iterator]() {
  let len = this.length
  let index = 0
  return {
    next:()=>  {
      return {value: this[index++], done: index === len + 1}
    }
  }
}}]) 
console.log([...{0: 1, 1: 2, 2: 3, length: 3, [Symbol.iterator]: function * () {
  let index = 0
  while(index !== this.length) {
    yield this[index++]
  }
}}]) 
```
实现 co 库中的 co 方法
```js
function co(it) {
  return new Promise((resolve, reject) => {
    function next(data) {
      let { value, done } = it.next(data)
      if (done) {
        resolve(value)
      } else {
        Promise.resolve(value).then(data => {
          next(data)
        }, err => reject(err))
      }
    }
    next()
  })
}
```
> async + await 其实就是 generator + co 的语法糖