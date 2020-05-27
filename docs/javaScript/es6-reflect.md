### es6语法-Reflect 
- 将 Object 对象上明显属于语言内部的方法，放在了 Reflect 上，未来也会在 Reflect 上新增。
- 修改了某些 Object 上方法的返回值，使其看上去更加合理。

#### Reflect.defineProperty
Object.defineProperty() 报错的时候只能用 try catch 进行捕获，但是 Reflect.defineProperty() 可以通过返回值去判断
```js
const obj = Object.freeze({ a: 1 })
try {
  Object.defineProperty(obj, 'a', {
    set() {
      obj['a'] = 2
    }
  })
} catch (error) {
  console.log(error, 'error')
}
console.log(Reflect.defineProperty(obj, 'a', {
  set() {
    obj['a'] = 2
  }
})) // false
```

#### Reflect.has()
判断一个属性 key 是否属于某个对象
```js
const obj = { b: 1 }
console.log('b' in obj) // true 
console.log(Reflect.has(obj, 'b')) // // true 
```

#### Reflect.get(target, name) / Reflect.set(target, name, value)
Reflect.get 方法查找并返回 target 对象的 name 属性，如果没有该属性，则返回undefined。Reflect.set方法设置 target 对象的 name 属性等于 value。
```js
const obj = {
  a: 1
}
console.log(Reflect.get(obj, 'a')) // 1
Reflect.set(obj, 'a', 2)
console.log(obj) // { a: 2 }
```

#### Reflect.ownKeys()
Reflect.ownKeys 可以获取对象的属性 key 的集合，包括 symbol 定义的 key 值。相当于是 Object.getOwnPropertyNames() 和 Object.getOwnPropertySymbols() 两个方法的合并。
```js
const obj = {
  a: 1,
  [Symbol()]: 2
}
console.log(Reflect.ownKeys(obj))
console.log(Object.getOwnPropertyNames(obj))
console.log(Object.getOwnPropertySymbols(obj))
```

#### Reflect.getOwnPropertyDescriptor()
获取指定属性的描述对象。
```js
const obj = { a: 1 }
console.log(Reflect.getOwnPropertyDescriptor(obj, 'a'))
```

#### Reflect.apply()
当函数定义了自己的 apply 方法，我们需要使用原型上的 apply 方法就只能写成下面的方式。Reflect.apply 简化了这种写法
```js
const fn = function(age, school) {
  console.log(`${this.name}已经${age}岁了，在上${school}了`)
}
const obj = { name: '张三' }
Function.prototype.apply.call(fn, obj, [18, '高中'])
Reflect.apply(fn, obj, [18, '高中'])
```

#### Reflect.construct()
这个是一种不使用 new 关键字调用构造函数的一种方式，注意第二个参数是一个数组
```js
function Fn(name, age) {
  this.name = name
  this.age = age
}
const s1 = new Fn('张三', '18')
const s2 = Reflect.construct(Fn, ['张三', '18'])
console.log(s1)
console.log(s2)
```

#### Reflect.getPrototypeOf() / Reflect.setPrototypeOf()
getPrototypeOf 方法是读取对象的__proto__属性，setPrototypeOf 方法是设置目标对象的原型（prototype），它可以返回一个布尔值。
```js
function Fn() {}
const fn1 = new Fn()
console.log(Reflect.getPrototypeOf(fn1) === Fn.prototype)
console.log(Reflect.setPrototypeOf(Object.freeze({}), null))
```

#### Reflect.isExtensible()
返回一个布尔值，表示当前对象是否可扩展
```js
// 8、Reflect.isExtensible() // 表示当前对象是否可扩展
console.log(Reflect.isExtensible({}))
console.log(Reflect.isExtensible(Object.freeze({})))
```