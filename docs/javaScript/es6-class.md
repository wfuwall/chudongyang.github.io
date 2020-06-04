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
 