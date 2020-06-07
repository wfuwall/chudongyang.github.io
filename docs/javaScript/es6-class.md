### es6语法-class类
ES5 中，我们通过构造函数生成实例。在 ES6 中，提供了更接近传统语言的写法，使用 class 去定义一个类。
- ES6 定义实例的属性、原型上的方法、原型上的属性、静态属性等等...
```js
class Animal {
  constructor(type) {
    // 定义实例上的属性
    this.type = type 
  }
  // 定义原型上的方法
  say() {
    console.log('我是原型上的方法，可以被实例调用', this)
  }
  // ES6 定义原型上的属性
  get a() {
    return 1
  }
  // ES6 定义静态属性
  static get b() {
    return 2
  }
}
const animal = new Animal('哺乳类')
let say = animal.say
say() // 这里 say 方法里的 this 是 undefined
say = animal.say.bind(animal)
say() // 这里 say 方法里的 this 是 animal 实例
```
- ES7 试验性语法，定义实例的属性、静态属性和静态方法等等... 
```js
class Animal{
  type = '哺乳类' // 实例上的属性，ES7 语法 ，跟在 constructor 中定义的一样
  // 静态属性 和 静态方法 都属于类上的
  static staticProp = '静态属性' 
  static staticFn() {
    return '静态方法'
  }
}
```
> 👆的试验性语法需要使用 @babel/plugin-proposal-class-properties 插件进行编译
- ES6 中类使用关键字 extends 进行继承。ES6 继承的实现就是通过 call + Object.create() + Object.setPrototypeOf 实现的
```js
// 继承上面 Animal 类
class Dog extends Animal{
  constructor() {
    // 这里的 super 指的是 Animal 父类
    super()
  }
  static dogProp() {
    // 子类静态方法里的 super 指的是父类
    console.log(super.staticProp) 
  }
  say() {
    // 子类原型上的方法中的 super 指的是父类的原型
    super.say()
  }
}
const dog = new Dog()
console.log(Dog.staticProp, Dog.staticFn()) // 静态属性 静态方法
Dog.dogProp()
dog.say()
```
> 注意：(1) 如果子类中没有写 constructor，那么默认会调用 super() 方法，如果写了就必须写 super(),否则会报错。(2) 
 
#### 装饰器
decorator（装饰器）是 ES7 试验型语法，其原理就是一个函数。
1. 如果在 vscode 中语法报错，可以通过以下途径解决：
- 在项目的根目录创建一个 jsconfig.json 文件，配置如下：
```js
{
  "compilerOptions": {
    "experimentalDecorators": true
  }
}
```
- 在 vscode 的设置中加入下面的配置：
```js
"javascript.implicitProjectConfig.experimentalDecorators": true
```
2. 由于装饰器是试验型语法，所以现在浏览器还不支持，所以需要使用 babel 进行转义
- 安装 @babel/plugin-proposal-decorators 插件，.babelrc 文件的配置如下， decorators 插件需要放在 class-properties 插件前面，否则会报错
```js
{
  "presets": [],
  "plugins": [
    [
      "@babel/plugin-proposal-decorators",
      {
        "legacy": true
      }
    ],
    "@babel/plugin-proposal-class-properties"
  ]
}
```
3. 类的装饰器
类支持一个或者多个装饰器，如果有多个装饰器，离类最近的先执行。
```js
const obj = {
  name: 'Tom',
  age: 10
}
function type(constructor) {
  console.log(2)
  Object.assign(constructor.prototype, obj)
}
function fn() {
  console.log(1)
}
@type
@fn
class Animal{}
const animal = new Animal()
console.log(animal.name) 
// 输入结果 1 2 Tom
```
4. 属性装饰器
装饰器函数的参数 constructor（类本身）, key（属性的键）, descriptor（属性描述符）。设置属性为仅读属性，用法如下：
```js
class Animal{
  @readonly name = 'xxxx'
}
function readonly(constructor, key, descriptor) {
  descriptor.writable = false
}
const animal = new Animal()
animal.name = 'yyyy'
console.log(animal) // {name: "xxxx"}
```
5. 函数装饰器
函数装饰器也有 constructor（类本身）, key（属性的键）, descriptor（属性描述符）三个参数，与属性装饰器不同的是，属性装饰器的 descriptor.initializer() 返回的是当前属性的值，方法的 descriptor.value 返回的是当前的方法。
```js
class Animal {
  @before('吃饭之前，先洗手')
  eat() {
    console.log('吃饭')
  }
}
function before(text) {
  return function(constructor, key, descriptor) {
    const oldSay = descriptor.value
    descriptor.value = function() {
      console.log(text) 
      oldSay()
    }
  }
}
const animal = new Animal()
animal.eat() // 吃饭之前，先洗手  吃饭
```
> 装饰器如果需要传参，那么装饰器函数就是一个高阶函数，需要返回一个函数。