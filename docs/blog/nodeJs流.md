### Node.js流

<img src="/nodeJs流.jpg"  height="400" width="auto">

俗话说的好：“人往高处走，水往低处流”；古语有云：“落花有意，流水无情”。（`吃瓜群众：what？你特么这是要弄啥哩！二营长📣`）哎呀🤣，各位大佬，这点小事用不着惊动二营长的意大利炮了吧，进错频道了，马上开始正题！

### 流到底是个什么东西？
`Node.js的文件系统（fs核心模块）`在我们的开发中应该经常用到，在没有深入了解学习之前，如果有人问我`Node.js流`到底是个什么东西呢？我当时的表情一定是这样晒的：

![](https://user-gold-cdn.xitu.io/2018/8/16/165423c935da2d5b?w=240&h=240&f=jpeg&s=4288)
> 流到底是个啥？不给提示让我怎么说的出嘴？这种问题，哎呀脑壳痛啊！看来只能去google了（哼~我程序猿早已戒了百度）。

翻了好几篇大佬写的文章，不能说完全解惑吧，也算是收获满满哦🙃！但是
呢，还是觉的它有那么点抽象，又有那么点难以理解！痛定思痛下，决定把大佬们的理解在小本本上记下来慢慢理解。（麻麻再也不用担心我下次被问到还蒙圈了）
- `流是数据的集合——就像数组或字符串一样`。区别在于流中的数据可能不会立刻就全部可用，并且无需一次性地把这些数据全部放入内存中。这使得流在操作大量数据或者一次来自外部源的数据时变得非常强大。
> 来自于：[Node.js Streams: Everything you need to know](https://medium.freecodecamp.org/node-js-streams-everything-you-need-to-know-c9141306be93)

- `流是一组有序的，有起点和终点的字节数据传输手段。`在应用程序中各种对象之间交换与传输数据的时候，总是先将该对象中所包含的数据转换为各种形式的流数据（即字节数据），在通过流的传输，到达目的对象后再将流数据转换为该对象中可以使用的数据。
> 来自于：《Node.js权威指南》


### Node.js中流的类型
知道了流是什么，我们还需要了解一下在Node.js中流的类型。流是一个很抽象接口，但是却被Node.js中的很多对象所实现。比如`HTTP服务器request和response对象都是流。`那我们就先来了解一下Node.js有四种基本的流类型：
- Readable：可读流。如Node.js的文件系统（fs）中的`fs.createReadStream(path,options)`就是一个可读流的例子；
- Writable：可写流。如Node.js的文件系统（fs）中的`fs.createWriteStream(path,options)`就是一个可写流的例子；
- Duplex：可读写的流，又称双向流。如Node.js的网络（net）中的net.Socket类；
- Transform：在读写过程中可以修改和变换数据的 Duplex 流，又称变换流。如Node.js的压缩（zlib）中的zlib.createDeflate(options)。
> 在Node.js中，所有的流的实现都继承了EventEmitter（用于实现各种事件处理的event模块）这个类，因此，在读取或者写入数据的过程中，可能会触发各种事件。

### createReadStream和createWriteStream
现在我们了解了流的含义和类型，那么Node.js中的流是怎么实现的呢？我们都知道`fs.createReadStream(path,options)`创建一个可读流,`fs.createWriteStream(path,options)`创建一个可写流,path是读取文件的路径，options是配置参数。（这配置参数也忒多了点，🤔努力记.....）

- `flags`： 可读流默认是'r'，可写流默认是'w'；
- `encoding`： 编码格式。可读流默认是null（其实就是buffer啦），可写流默认是'utf8'；
- `autoClose`：是否自动关闭。默认都是true（就是读完文件或者写入完之后自动把文件关上啦）；
- `mode`： 读取和写入的模式。默认都是0o666（可读可写，八进制）；
- `highWaterMark`： 最高水位线。可读流默认是64 kb（每次最多读取字节数），可写流默认是16 kb（每次最多写入的字节数，也可以理解为占用的最大内存）；
- `start`：开始读取或者开始写入的位置。默认是从0开始的（单位是字节数）；
- `fd`：文件标识符。是Number类型的
- `end`：是可读流独有的，读取文件的最终位置，默认是Infinity（单位是字节数）。
> 其实，参数虽然比较多，但是都很容易理解。这里需要特别注意的是读取文件的时候，如果start设置为0，end设置为5，那么实际上最终读取的结果是6个字符，即相当于包前又包后！（有点小霸道哦😎）

在Node.js中，使用`fs.createReadStream(path,options)`创建可读流和`fs.createWriteStream(path,options)`创建可写流两个方法很简单，难道我们就甘心仅仅停留在能用、会用的层面吗？No、No、No！我们不仅要会用，还要知道其中的原理，他们是如何实现的？先来创建一个可读流感受一下其用法：
```
// 'a.txt'存放十个数字--> 1234567890 
let rs = fs.createReadStream('a.txt', {
  flags: 'r',
  encoding: 'utf8',
  autoClose: true,
  mode: 0o666,
  start: 0, 
  end:5,
  highWaterMark: 2 
});
rs.on('data',function (data) {
  console.log(data);
  rs.pause();
});
setInterval(() => {
  rs.resume();
}, 1000);
// 最后输出的结果是 01 23 45 
```
> 监听到`'data'`事件之后，流切换到流动模式,数据会被尽可能快的读出。`pause、resume`事件是用来暂停和恢复触发`'data'`事件的（意味着读取文件的操作停止了）。当然还可以监听`'end'`事件、`'open'`事件、`'close'`事件、`'error'`事件。

相比较于可读流，我们还应该知道可写流的以下几个特点：
- 可写流是有`缓存区的概念的，第一次会真的往文件里写，后面的内容会先写到缓存中`；
- 可写流写入时会返回一个`boolean类型`,当返回为false时，就不要在写入了。（但如果返回false之后还有写入操作，还是会写入文件中，因为超过的部分会放到缓存里，这样可能会导致内存的浪费）；
- 正在写入的内容和缓存中的内容都消耗完后，会触发`drain事件`。

```
// 如果'a.txt'中有内容，会被写入的内容覆盖掉
let ws = fs.createWriteStream('a.txt',{
  flags: 'w',
  mode: 0o666,
  encoding: 'utf8',
  autoClose: true,
  start: 0,
  highWaterMark: 3
})
let flag = ws.write('1');
console.log(flag); // true
flag = ws.write('1');
console.log(flag); // true
flag = ws.write('1');
console.log(flag); // false
```

> 上面例子中，最后一次返回的是`false`，其实跟设置的`highWaterMark最高水位线`（设置的当前缓存区大小）有关系了。当写入的内容大于等于`highWaterMark`时，就会返回`flase`。

那我们如何去控制写入的时机，从而不造成内存的浪费呢？请看下面的例子。

```
// 复用上个例子中的可写流实例，写入时只占用三个字节的内存
let i = 0;
function write(){ // 每次写入三个字节，然后停住，写入完成后再继续写入
  let flag = true;
  while(i < 9 && flag){
    flag = ws.write(i + '');
    i++
  }
}
ws.on('drain',function(){ // 达到highWaterMark触发该事件
  console.log('写入成功');
  write();
})
write(); // a.txt文件中--> 012345678
```

### 实现createReadStream和createWriteStream
上面大致了解了`createReadStream和createWriteStream`的用法和特点，如果我们能自己实现一下可读流和可写流，无疑能加深我们对其的理解。翻看Node.js的源码，`可读流fs.createReadStream()`执行后返回的是`ReadStream类`的实例，可写流也是一样的逻辑，代码如下：
```
fs.createReadStream = function(path, options) {
  return new ReadStream(path, options);
};
fs.createWriteStream = function(path, options) {
  return new WriteStream(path, options);
};
```
> 是不是感觉一下子明朗了许多，只要我们能够封装`ReadStream和WriteStream类`就可以了。为了能够更好的理解，基本每句代码都有注释哦😊！为减少篇幅，这里只贴出来`核心read方法和write方法`的实现，全部代码请移步[stream](https://github.com/chudongyang/createStream)下载：

```
class ReadStream extends EventEmitter{
  read(){ // 读取文件
    if (this.finished) { // 读完之后就不再读了
      return;
    }
    // open打开文件是异步的，当我们读取的时候可能文件还没有打开
    if(typeof this.fd !== 'number'){
      this.once('open',()=>this.read());
      return;
    }
    // length代表每次读取的字节数
    let length = this.end ? Math.min(this.highWaterMark, this.end - this.pos + 1) : this.highWaterMark;
    fs.read(this.fd,this.buffer,0,length,this.pos,(err,bytesRead)=>{
      if(err){
        this.emit('error',err);
        this.destroy();
        return;
      }
      if(bytesRead > 0){ // 读到的字节数 
        this.pos += bytesRead;
        let res = this.buffer.slice(0, bytesRead); // 真实读取到的bytesRead可能不能填满this.buffer，需要截取,保留有用的
        res = this.encoding ? res.toString(this.encoding) : res;
        this.emit('data', res);
        if (this.flowing) { // 如果是流动模式，就继续调用read方法读取
          this.read();
        }
      }else {
        this.finished = true; // 读完的标识
        this.emit('end');
        this.destroy();
      }
    })
  }
}
```
> `可读流ReadStream类`的封装，最主要的就是理解`read方法`的实现，其他的方法都比较简单好理解。`read方法`中最难理解的就是`length变量（要读取的字节数）`，因为读到最后，可能文件中的字节数小于了`highWaterMark最高水位线`，所以要取`Math.min()最小值`。打个比方：如果`this.end = 4;`说明总共需要读取5个字节，`this.highWaterMark= 3；`说明每次读取3个字节，第一次读完后`this.pos = 3;`此时还需要在读取2个字节就够了。

```
class WriteStream extends EventEmitter {
  // chunk：写入的内容；encoding：编码格式；callback：写入完成后的回调
  write(chunk,encoding=this.encoding,callback){ // 写入的时候调用的方法
     // 为了统一，如果传递的是字符串也要转成buffer
    chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk,encoding);
    this.len += chunk.length; // 维护缓存的长度
    let ret = this.highWaterMark > this.len;
    if(!ret){ 
      this.needDrain = true; // 表示需要触发drain事件
    }
    if(this.writing){ // true表示正在写入,应该放在缓存中
      this.buffer.push({
        chunk,
        encoding,
        callback
      });
    }else{ // 第一次写入
      this.writing = true;
      this._write(chunk,encoding,()=>this.clearBuffer()); // 实现一个写入的方法
    }
    return ret; // write的返回值必须是true/false
  }
  _write(chunk,encoding,callback){ // 因为write方法是同步调用的，此时fd可能还没有获取到
    if(typeof this.fd !== 'number'){ // 判断如果文件还没有打开
      return this.once('open',()=>this._write(chunk,encoding,callback));
    }
    // 参数：fd 文件描述符； chunk是数据； 0：写入的buffer开始的位置； chunk.length写入的字节数； this.pos文件开始写入数据的位置的偏移量
    fs.write(this.fd,chunk,0,chunk.length,this.pos,(err,bytesWritten)=>{
      this.pos += bytesWritten;
      this.len -= bytesWritten; // 每次写入后，内存中的也要相应的减少
      callback();
    })
  }
  clearBuffer(){ // 清除缓存中的
    let buf = this.buffer.shift();
    if(buf){
      this._write(buf.chunk,buf.encoding,()=>this.clearBuffer());
    }else{
      if(this.needDrain){ // 如果需要触发drain
        this.writing = false;
        this.needDrain = false;// 触发一次drain 再置回false 方便下次继续判断
        this.emit('drain');
      }
    }
  }
}
```
> 可写流中最主要的就是`write方法`，其又依赖`_write方法`和`clearBuffer方法`。全部代码请移步[stream](https://github.com/chudongyang/createStream)下载，更好理解哦ｂ（￣▽￣）ｄ！

### （四）pipe方法
其实啊，说了这么多，又是理解含义，又是封装代码，都是为了突出`pipe方法导流`的重要性啊。pipe方法怎么使用呢，请注意（前方高能）：
```
let fs = require('fs');
let rs = fs.createReadStream('a.txt', { 
  highWaterMark: 4
});
let ws = fs.createWriteStream('b.txt', { 
  highWaterMark: 1
});
rs.pipe(ws);
```
> 用法是不是很简单，很直接呀！虽然仅仅这一行的代码,但这正是其神奇之处啊。（说好的高能呢？小板凳都准备好了，你告诉我这些）。
那我们怎么去实现一个pipe方法呢？其实基于上面`可读流createReadStream和可写流createWriteStream`的封装，pipe的实现就显得很简单了，在`ReadStream类的原型上封装pipe方法`,代码如下：

```
class ReadStream extends EventEmitter{
  pipe(dest){
    this.on('data',(data)=>{
      let flag = dest.write(data);
      if(!flag){
        this.pause(); // 不能继续读取了，等写入完成后再继续读取
      }
    });
    dest.on('drain',()=>{
      this.resume();
    })
  }
}
```
> 再次友情提示：为了更好的理解，可以移步这里[stream](https://github.com/chudongyang/createStream)下载全部代码哦(￣▽￣)~*！

- pipe方法又叫管道方法，最大的优点就是可以控制速率（防止淹没可用内存）；
- pipe方法的实现原理：可读流实例`rs`监听`on('data')方法`，将读取到的内容调用`ws.write方法`（ws是可写流实例），其方法会返回一个`boolean类型`，如果返回`false会调用rs.pause()暂停读取`，等待可写流写入完毕后，调用`ws.on('drain')在恢复读取`。

总结：Node.js流到这里就告一段落了，感谢大家的阅读！如果有问题欢迎指出，共同进步哦！如果感觉文章有点晦涩难懂，可以先收藏，方便以后阅读哦❤️！

参考文章：
- [Node.js Streams: Everything you need to know](https://medium.freecodecamp.org/node-js-streams-everything-you-need-to-know-c9141306be93)
- 《Node.js权威指南》
- [Node.js中文网](http://nodejs.cn/api/)