### es6语法-Symbol 
Symbol 是 es6 引入的一种新的数据类型，表示独一无二的值。JavaScript 的数据类型 Number、String、Boolean、null、undefined、Object、Symbol

#### Symbol 可以作为对象的属性名
因为 Symbol 独一无二的特性，所以可以作为对象的属性名，可以保证不会与其他属性名产生冲突。
```js
const s1 = Symbol()
const s2 = Symbol()
const obj = {
  [s1]: 123
}
obj.s2 = 321
console.log(s1 === s2) // false
console.log(obj[s1]) // 123
console.log(obj['s2']) // 321
``` 

#### Symbol.for()
接受一个字符串作为参数, 然后搜索有没有以该参数作为名称的 Symbol 值。如果有，就返回这个 Symbol 值，否则就新建一个以该字符串为名称的 Symbol 值。
```js
const s1 = Symbol.for('foo')
const s2 = Symbol.for('foo')
console.log(s1 === s2) // true
```

#### Symbol.keyFor()
获取以 Symbol.for() 定义的 Symbol 类型值的 key。
```js
const s1 = Symbol.for('foo')
console.log(Symbol.keyFor(s1)) // foo
```

#### 内置的 Symbol 值 
除了可以定义自己使用的 Symbol 值以外，ES6 还提供了 11 个内置的 Symbol 值，指向语言内部使用的方法。
- Symbol.hasInstance 我们之前通常使用的 instanceof 运算符，内部调用的就是此方法
```js
class My{
  [Symbol.hasInstance](foo) {
    return foo instanceof Array;
  }
}
console.log([1, 2, 3] instanceof new My()) // true
```
- Symbol.isConcatSpreadable 设置为 false，concat 的时候不展开
```js
const arr1 = [1, 2]
const arr2 = [3, 4]
console.log(arr1.concat(arr2)) // [ 1, 2, 3, 4 ]
arr2[Symbol.isConcatSpreadable] = false
console.log(arr1.concat(arr2)) // [ 1, 2, [ 3, 4 ] ]
```
- Symbol.iterator 对象的Symbol.iterator属性，指向该对象的默认遍历器方法