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