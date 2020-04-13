### 什么是库？什么是框架
- 库：以 JQuery 为例，其拥有很多的方法，组成了一个完整的功能。通过这些方法实现我们自己的功能（主动，我们手动调用库中的方法）
- 框架：以 Vue 为例，我们只需要将特定的代码放到特定的位置上，框架就会帮我们调用（被动）

### MVC 和 MVVM 的区别
- MVC
  - 传统的 MCV 指的是后端开发，model（数据库中的额数据）、view（前端页面）、controller（后端的控制器）
- MVVM
  - model（js中的数据）、viewModel（视图模型）、view（前端的页面）
  - 双向绑定，不需要用户手动的操作 DOM 的

### Vue2.0 响应式的规则
- 会递归的去循环 vue 中的属性（这也是浪费性能的地方），会给每个属性都增加 getter 和 setter 属性，当属性变化时更新视图
- 重写了数组中的方法，当调用数组方法时会触发更新，也对数组中的每一项进行了监控
- 对象只监控了默认自带的属性，新增的属性是不生效的
- 数组的索引发生变化或者数组的长度发生变化，不会触发更新
- vm.$set() 方法可以强制更新，内部采用的就是数组的 splice 方法
- 这些 vue2.0 的缺陷，在 vue3.0 中通过 proxy 实现响应式解决了

### proxy 实现响应式原理
- `Proxy` 是 es6 新增的 api， 兼容性不是很好
- new Proxy(target, handler)) 返回一个 proxy 实例，target 是要代理的对象，handler 是配置对象，共有13种拦截操作
- `Reflect` 将 Object 的一些明显属于语言内部的方法，放在了 Reflect 上， Reflect对象一共有 13 个静态方法。 大部分与 Object 对象的同名方法的作用都是相同的，而且它与 `Proxy` 对象的方法是一一对应的
- 使用 `proxy` 简版的实现响应式原理
```
const handler = {
  get(target, key) {
    console.log('收集依赖')
    // 递归收集依赖
    if (typeof target[key] === 'object' && target[key] !== null) {
      return new Proxy(target[key], handler)
    }
    return Reflect.get(target, key)
  },
  set(target, key, value){
    const oldValue = target[key]
    if (!oldValue) { // 新增值
      console.log('新增操作')
    } else if (oldValue !== value){ // 更新值
      console.log('更新操作')
    }
    return Reflect.set(target, key, value)
  }
}
const proxy =  new Proxy(target, handler)
```

 ### vue 指令相关
 - v-html 最好采用可信任的内容，不要将用户输入的内容进行回显。目的是为了 xss 攻击（获取用户的cookie）
 - v-if 控制的是 DOM 元素是否存在，v-show 控制的是 DOM 元素的显示和隐藏；v-show 不能使用在 template 标签上，v-if 可以阻止后续逻辑的发生
 - v-for 和 v-if 不要使用在同一个元素上，可能会导致性能浪费
 - 如果在 template 标签上进行 v-for 循环，必须将 key 放到真实的元素上
 - v-model 就是 :value 和 @input 的语法糖 

 ### 过滤器
 - 过滤器是将原数据进行格式化显示，并且不改变原数据
 - 全局过滤器和局部过滤器
 - 定义一个`format`格式化时间过滤器, 用法 {{ time | format('YYYY:MM:DD hh:mm:ss')}}
```
// time 是管道符前面变量数据，formatter 是 format 调用时传入的参数
// moment 是一个日期处理类库
Vue.filter('format', function(time, formatter) {
  return moment(time).format(formatter)
})
```

### 指令
- 