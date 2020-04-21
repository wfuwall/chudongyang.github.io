### npm相关
主要总结一些npm相关的知识点，方便以后查阅。。。

### npm命令
1. npm install 的几种方法及区别
```js
npm i express --save / npm i express -S （安装依赖到devDependencies）
npm i express --save-dev / npm i express -D （安装依赖到dependencies）
npm i express --save-exact （锁定依赖版本号加入到dependencies）
npm i express --save-exact -D (锁定依赖版本号加入到devDependencies)
```
在安装依赖之前执行下面的命令，这样所有的依赖都会锁定版本号 
```js
npm config set save-exact true
```
> `npm config set` 命令将配置写到了 **~/.npmrc** 文件，可以运行 `npm config list` 查看

2. npm shrinkwrap
上面说的锁定依赖的版本，但这并不能完全防止意外情况的发生，因为锁定的只是最外一层的依赖，而里层依赖的模块的 package.json 有可能写的是 `"mongoose": "*"`。为了彻底锁定依赖的版本，让你的应用在任何机器上安装的都是同样版本的模块（不管嵌套多少层），通过运行 `npm shrinkwrap`，会在当前目录下产生一个 `npm-shrinkwrap.json`，里面包含了通过 node_modules 计算出的模块的依赖树及版本。上面的截图也显示：只要目录下有 `npm-shrinkwrap.json` 则运行 `npm install` 的时候会优先使用 `npm-shrinkwrap.json` 进行安装，没有则使用 package.json 进行安装
> 如果 node_modules 下存在某个模块（如直接通过 `npm install xxx` 安装的）而 package.json 中没有，运行 `npm shrinkwrap` 则会报错。另外，npm shrinkwrap 只会生成 dependencies 的依赖，不会生成 devDependencies 的。

参考链接：
- [npm注意事项](https://github.com/nswbmw/N-blog/blob/master/book/2.6%20npm%20%E4%BD%BF%E7%94%A8%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9.md)
- https://docs.npmjs.com/cli/shrinkwrap
- http://tech.meituan.com/npm-shrinkwrap.html

3. npm install -g typescript 
全局下载 typescript 时遇到下面这种失败的情况，可能是之前把全局的 node_modules 包删除的缘故。可以通过 `npm cache clean --force` 清理缓存后就可以下载成功了
<img src="/npm-error.png"  height="180" width="auto">