### JS 基础
总结一些在项目中使用不多，但是必须要会的知识点。

#### Date 对象
- 补零函数
```js
function addZero(value){
  return value < 10 ? `0${value}` : value
}
```
- 当我们转化固定的时间戳时，在不同的时区转出的日期是不一样的，以东八区为例统一
```js
// time 时间戳 type 需要转化的时间类型
function dateFilter(time, type) {
  const timezone = 8 // 目标时间，东八区
  const offsetGMT = new Date(time * 1000).getTimezoneOffset() // 指定时间和格林威治的时间差，单位分钟
  const date = new Date(time * 1000 + offsetGMT * 60 * 1000 + timezone * 60 * 60 * 1000) // 东八区的时间戳
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const dayDate = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const second = date.getSeconds()
  let result
  switch(type) {
    case 0: // 00:00:00
      result = `${addZero(hours)}:${addZero(minutes)}:${addZero(second)}`
      break
    case 1: // 2020-01-01
      result = `${year}-${addZero(month)}-${addZero(dayDate)}`
      break
    case 2: // 2020-01-01 00:00:00
      result = `${year}-${addZero(month)}-${addZero(dayDate)} ${addZero(hours)}:${addZero(minutes)}:${addZero(second)}`
      break
    default: // 2020/01/01 00:00:00
      result = `${year}/${addZero(month)}/${addZero(dayDate)} ${addZero(hours)}:${addZero(minutes)}:${addZero(second)}`
  }
  return result
}
```

#### 数组方法
除了 findIndex 是 ES6 的方法，forEach、map、some、every、filter、reduce 等都是 ES5 的方法。
- 数组扁平化，数组提供了 flat() 方法会按照一个可指定的深度递归遍历数组，将所有元素与遍历到的子数组中的元素合并为一个新数组返回
```js
const arr = [1, [2, [3, [4, [5]]]]]
const newArr = arr.flat(Infinity)
console.log(newArr) // [1, 2, 3, 4, 5]
```
- 实现自己的数组扁平化方法
```js
const arr = [1, [2, [3, [4, [5]]]]]
function flatten(arr, depth = 1) {
  if (depth > 0) {
    return arr.reduce((prev, current) => {
      return prev.concat(Array.isArray(current) ? flatten(current, depth - 1) : current)
    }, [])
  } else {
    return arr.slice()
  }
}
console.log(flatten(arr, 10))
```
- 实现 compose（组合）方法，react 中就使用了大量的 compose 函数。提示：使用数组的 reduce 和 reduceRight 方法进行实现
```js
// 求和方法
function sum(a, b) { return a + b }
// 求字符串的长度
function len(str) { return str.length }
// 增加前缀的方法
function addPrefix(len) { return `$${len}` }
// reduceRight 的实现
let compose = (...args) => (...values) => {
  const lastFn = args.pop()
  return args.reduceRight((prev, current) => current(prev), lastFn(...values))
}
// reduce 的实现
let compose = (...args) => args.reduce((prev, current) => (...values) => prev(current(...values)))
console.log(addPrefix(len(sum('abc', 'xyz')))) // '$6'
console.log(compose(addPrefix, len, sum)('abc', 'xyz')) // '$6'
```