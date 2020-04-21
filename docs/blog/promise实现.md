### Promise实现
<img src="/promise.jpg"  height="410" width="auto">

摘要： 在很久很久以前，`Promise`还没有来到这个世上。那时森林里的有这样一群攻城狮，他们饱受回调地狱（回调金字塔）的摧残，苦不堪言。直到有一天，一位不愿意留下姓名的特工横空出世，将他们从回调地狱中解救了出来，代号`Promise`。自此，很多人都踏上了寻找`Promise`的道路，我亦如此...
![](https://user-gold-cdn.xitu.io/2018/7/28/164dec02da1bdbfe?w=82&h=62&f=gif&s=129324)

友情提醒： 本文使用ES6实现的`Promise`，不会的童鞋们请自行脑补！What？这位同学你竟然不知道ES6，好的，放学了请不要走，我们单独交流一下......

### 回调地狱 VS Promise
就拿`fs`（node的核心包）来说吧，假如我们需要同时请求`a.txt`和`b.txt`中的数据，然后对数据进行操作。这种需求在我们的开发中也经常遇到哦！
- 曾经的回调地狱
```js
let fs = require('fs');
let arr = [];
fs.readFile('a.txt','utf8',function(err,data){
  arr.push(data);
  fs.readFile('b.txt','utf8',function(err,data){
    arr.push(data);
    // 如果需要把更多的文件数据，那滋味不敢想象
    console.log(arr); 
  })
})
```
- 现在的Promise
```js
let fs = require('fs');
function read(url,coding){ // 首先我们对fs.readFile()进行promise封装
  return new Promise((resolve,reject)=>{
    fs.readFile(url,coding,function(err,data){
      if(err) reject(err);
      resolve(data);
    })
  })
}
Promise.all([read('a.txt','utf8'),read('b.txt','utf8')]).then(data=>{
  // 这里我们就可以直接操作请求到的两个文件的数据了,Promise还很贴心的返回了一个数组
  console.log(data);  
})
```
相比较之下，`Promise`和回调地狱的战争起初就不是一个等级的呀，回调地狱听起来强大，但实则一点不经揍啊！`Promise`此时的内心应该是这样的：
![](https://user-gold-cdn.xitu.io/2018/7/28/164dec2c134f179b?w=140&h=134&f=jpeg&s=5307)

### Promise之自己实现
看到这里，相信大家都很想知道Promise的核心实现是什么？接下来，请小伙伴们不要闭眼，看这里，看这里！我便说说我是如何在寻找`Promise`的道路上一条道走到黑的。（这标题起的，笑出猪叫声）

### 1、Promise 类封装
起初，我发现Promise是可以被new的，说明Promise 的出身是一个类啊，这可是一条很有价值的线索啊。（大家都知道，还用你说）
```js
class Promise {
  constructor(executor) { // executor是new Promise的参数
    this.status = 'pending'; // 保存状态
    this.reason = undefined; // 失败的原因
    this.value = undefined; // 成功的结果
    let resolve = (value)=> {
      if(this.status === 'pending'){
        this.status = 'resolved';
        this.value = value;
      }
    }
    let reject = (reason)=>{
      if(this.status === 'pending'){
        this.status = 'rejected';
        this.reason = reason;
      }
    }
    try {
      executor(resolve, reject); // 执行器       
    } catch (e) {
      reject(e);
    }
  }
  // 定义实例上的then方法，then调用的时候都是异步调用的 
  then(onFulfilled, onRejected) {
    if(this.status === 'resolved'){ // status状态改变时执行onFulFilled
      onFulfilled(this.value);
    }
    if(this.status === 'rejected'){ // status状态改变时执行onFulFilled
      onRejected(this.reason);
    }
  }
}  
```
这怎么仅仅一条线索就写出来这么东东呀，真让人摸不着头脑！别急，听我慢慢道来：
- `executor`：执行器，默认是new的时候就自动执行,executor的执行是同步的，为什么要try一下呢，executor执行时如果`throw new Error('error')`，直接走reject
- `resolve, reject`：定义了`executor`的`resolve`成功的回调函数和`reject`失败的回调函数两个参数
- `reason,value`：分别代表了成功返回的值和失败的原因
- `status`：保存了`Promise`的三种状态`pending`（等待态），`fulfilled`(成功态)，`rejected`(失败态)
    - 当一个`promise`的状态处于`pending`时，它可以过渡到`fulfilled`或者`ejected`
    - 当一个promise的状态处于`fulfilled`时或者`rejected `时，不能再过渡到其他任何状态
- `then`函数： 因`Promise`是可以链式调用的，说明`then`函数是定义在`Promise`类的原型`Prototype`上的。
> 这样我们就成功处理了同步情况下的`Promise`,是不是觉得自己已经追寻到`Promise`的终极力量了呢。（抽根烟，平复下躁动的心情）

![](https://user-gold-cdn.xitu.io/2018/7/28/164e0356dc8a4c65?w=120&h=117&f=jpeg&s=24937)

### 2、Promise异步的实现
在我们平时的开发中，往往异步代码比较多，异步执行需要，然`而Promise`的`executor`执行器又是同步执行的，它不等我们怎么办呢，好着急有木有。
我们在上面代码的基础上新增如下几行代码：
```js
class Promise {
  constructor(executor) {
    this.onResolvedCallbacks = []; // 保存成功的回调
    this.onRejectedCallbacks = []; // 保存失败的回调
    let resolve = (value)=> {
      if(this.status === 'pending'){
        this.status = 'resolved';
        this.value = value;
        this.onResolvedCallbacks.forEach(fn=>fn());
      }
    }
    let reject = (reason)=>{
      if(this.status === 'pending'){
        this.status = 'rejected';
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn=>fn());
      }
    }
  }
  then(onFulfilled, onRejected) { 
    if(this.status === 'pending'){
      this.onResolvedCallbacks.push(()=>{
          onFulfilled(this.value);
        });
      this.onRejectedCallbacks.push(()=>{
          onRejected(this.reason);
        });
      });
    }
  }
}
```
当出现异步代码时，`status`的状态还是`pending`，我们可以先把`then`函数中成功和失败的回调保存下来，等到异步代码执行完成后，`status`的状态改变了，我们再去依次执行保存下来的回调函数。

看到这里，如果觉得自己已经基本掌握`Promise`的实现，只能说尔等对`Promise`的核心力量一无所知。（别废话，赶紧写）好的，各位大佬！

![](https://user-gold-cdn.xitu.io/2018/7/28/164e04910a8a27e0?w=141&h=53&f=gif&s=11155)

### 3、Promise之链式调用的实现
在开始实现之前呢，我们先来看一下如下代码：
```js
//  这里的Promise是ES6封装好的，并不是我们自己实现的 
let promise = new Promise((resolve,reject)=>{ 
  resolve('123');
})
let promise2 = promise.then((data)=>{
  throw new Error('error');
})
promise2.then((data)=>{
  console.log(data);
},(err)=>{
  console.log(err); // 这里输出了error
})
```
> 上面代码说明`then`函数执行后返回的`promise2`实例并不是`promise`实例，说明返回值不是`this`，因为`promise`不能即调用成功后不能再走失败，所以`then`函数执行后返回的`promise2`是一个新的`promise`实例。（跟jQuery的链式调用不一样哦）

`Promise`的`constructor`的代码不需要改变，只需要对`then`函数进行再次封装：
```js
then(onFulfilled, onRejected) {
    // onFulfilled和onRejected可能没传
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value=>value;
    onRejected = typeof onRejected === 'function' ? onRejected : (err)=>{throw err};
    let promise2; // 需要每次调用then方法时，都需要返回新的promise
    promise2 = new Promise((resolve, reject)=>{
      if(this.status === 'resolved'){
        setTimeout(()=>{
          try {
            let x = onFulfilled(this.value); 
            // 执行完当前回调后返回的结果可能还是个promise
            resolvePromise(promise2,x,resolve, reject);
          } catch (e) {
            reject(e);
          }
        },0)
      }
      if(this.status === 'rejected'){
        setTimeout(()=>{
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2,x,resolve, reject);
          } catch (e) {
            reject(e);
          }
        },0) 
      }
      if(this.status === 'pending'){
        this.onResolvedCallbacks.push(()=>{
          setTimeout(()=>{
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise2,x,resolve, reject);
            } catch (e) {
              reject(e);
            }
          },0)
        });
        this.onRejectedCallbacks.push(()=>{
          setTimeout(()=>{
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise2,x,resolve, reject);
            } catch (e) {
              reject(e);
            }
          },0)
        });
      }
    })
    return promise2;
  }
```
- `onFulfilled,onRejected`：当没有传的时候，需要做的处理
- `promise2`：`then`函数的返回值是一个新的promise
- `setTimeout`：([Promise/A+规范](https://promisesaplus.com/))要求`then`函数必须是异步的，当然原生的Promise实现并不是用的setTimeout，而是一个微任务
- `resolvePromise`：封装`resolvePromise`方法，当then函数中的成功或者失败函数返回值x可能还是个promise

定义的resolvePromise方法：
```js
let resolvePromise = (promise2,x,resolve, reject)=>{
  let called;
  // promise2和函数的返回值是同一个
  if(promise2 === x){
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'));
  }
  if(x!==null && (typeof x === 'object' || typeof x === 'function')){
    try {
      let then = x.then;
      if(typeof then === 'function'){
        then.call(x,(y)=>{
          if(called) return;
          called = true;
          resolvePromise(promise2,y,resolve, reject);// 递归处理，直到y是一个普通值
        },(err)=>{
          if(called) return;
          called = true;
          reject(err);
        })
      }else{ // then如果是一个常量
        if(called) return;
        called = true;
        resolve(x);
      }
    } catch (e) {
      if(called) return;
      called = true;
      reject(e);
    }
  }else{ // x如果是一个常量
    if(called) return;
    called = true;
    resolve(x);
  }
}
```
- 四个参数：`promise2` （then函数的返回值，是一个新的promise）
`x`（then中成功后者失败函数的返回值）`resolve`（promise2的resolve）`reject`（promise2的reject）
- `called`： 加了`called`判断，防止多次调用，因为这里的逻辑不单单是自己的，还有别人的，别人的`promise`可能即会调用成功也会调用失败
- `let then = x.then`：`x`可能还是一个`promise`，那么就让这个`Promise`执行

至此，我们终于追寻到了`promise`的核心力量所在。来，让我们小小的庆贺一下：
![](https://user-gold-cdn.xitu.io/2018/7/28/164e10d7fa8aa3ee?w=80&h=65&f=gif&s=16293)

### 3、Promise之类上的方法实现
当然，我们已经初步了解了`promise`的核心力量，在我们开发的过程中，除了then方法，也会使用它的一些其他常用的方法，就像一位身经百战的特工，你除了会用刀，还要会用枪不是。我们在Promise类上定义它们：
```js
static resolve(value){
    return new Promise((resolve,reject)=>{
      resolve(value);
    })
  }
  static reject(reason){
    return new Promise((resolve,reject)=>{
      reject(reason);
    })
  }
  static all(promises){
    return new Promise((resolve,reject)=>{
      let arr = [];
      let i = 0;
      let processData = (index,data)=>{
        arr[index] = data;
        if(++i === promises.length){
          resolve(arr);
        }
      }
      for(let i = 0; i< promises.length; i++){
        promises[i].then(data=>{
          processData(i,data);
        },reject);
      }
    })
  }
  static race(promises){
    return new Promise((resolve,reject)=>{
      for(let i = 0; i< promises.length; i++){
        promises[i].then(resolve,reject);
      }
    })
  }
  catch(onRejected){
    return this.then(null,onRejected);
  }
```
> 相信resolve，reject，all,race这四个类上的方法和catch这个原型的方法大家都已经很熟悉了，我就不过多的啰嗦了。

因为，我实在是编不下去了，我还有更重要的事情要去做：

![](https://user-gold-cdn.xitu.io/2018/7/28/164e1190f28b2b4f?w=198&h=128&f=jpeg&s=6547)

结语： 花了很久写的这篇文章，如果这篇文章令你或多或少有些收获，请不要吝啬你的赞美（点个赞再走吗，小哥哥小姐姐），如果有写的不对的地方，也希望各位大佬能不吝指教，万分感谢！原创文章，转载请注明出处！
