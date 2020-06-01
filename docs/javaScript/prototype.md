### 原型链
从一张图理解 JavaScript 原型链的原理。

<img src="/prototype.png" height="800" width="auto">

```js
// 以下返回都是 true
console.log(Fn.prototype.constructor === Fn ) 
console.log(fn.__proto__ === Fn.prototype)
console.log(Fn.__proto__ === Function.prototype)
console.log(Fn.prototype.__proto__ === Object.prototype)

console.log(Function.__proto__ === Function.prototype)
console.log(Function.prototype.__proto__ === Object.prototype)
console.log(Function.prototype.constructor === Function)

console.log(Object.prototype.constructor === Object)
console.log(o.__proto__ === Object.prototype)
console.log(Object.__proto__ === Function.prototype)
console.log(Object.prototype.__proto__ === null)
```
原型链面试被问到的概率还是很大的，从而隐身出来的面试题总结：

- instanceof 原理的实现，就是沿着实例对象的__proto__这条链来向上查找,如果能找到构造函数的prototype则返回true,否则 返回false
```js
function selfInstanceof(instance, constructor) {
  let prototype = instance.__proto__
  while(true) {
    if (prototype === null) {
      return false
    }
    if (prototype === constructor.prototype) {
      return true
    }
    prototype = prototype.__proto__
  } 
}
```
- 原型链面试题，👇这道题要知道运算符优先级 .操作符 = new (带参数列表) > new (无参数列表) , 同时要知道 函数在编译阶段会进行提前声明和赋值；var 定义的变量会进行提前声明，如果定义的变量被提前声明过了，不会再次进行声明。
```js
function Foo() {
  getName = function () {
      console.log(1);
  }
  return this;
}
Foo.getName = function () {
  console.log(2);
}
Foo.prototype.getName = function () {
  console.log(3);
}
var getName = function () {
  console.log(4);
}
function getName() {
  console.log(5);
}
Foo.getName(); // 2
getName(); // 4
Foo().getName(); // 1
getName(); // 1
new Foo.getName(); // 2
new Foo().getName(); // 3
new new Foo().getName(); // 3
```