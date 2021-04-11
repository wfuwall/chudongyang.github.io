### 问题总结
可能是安装 vue 或者是安装 vue 相关包时，遇到的错误或者警告，做一下总结，方便之后整理回顾。

### 全局安装 @vue/cli 报错
- 全局安装 @vue/cli
```js
sudo npm install -g @vue/cli
```
- 可以先尝试强制清除缓存
```js
npm cache clean --force 
```
- 如果此时安装过程中没有报错，但是卡住了安装不下去，可以切换到 taobao 源
```js
nrm use taobao
```
- 安装成功后查看 @vue/cli 的版本, 如果本地已经安装过，可以升级到最新的版本
```js
vue -V 
```

### 安装 vue3.0 过程中报错
- 如果遇到下面的报错
```js
`npm ERR! Unexpected end of JSON input while parsing near '...":"^2.0.2","babel-loa'

npm ERR! A complete log of this run can be found in:
npm ERR! D:\User\XXXXXX\AppData\Roaming\npm-cache_logs\2018-08-20T00_54_52_411Z-debug.log
ERROR command failed: npm install --loglevel error --registry=https://registry.npm.taobao.org --disturl=https://npm.taobao.org/dist`
```
- 首先可以强制清除缓存一波，如果还不行就切换到 taobao 源
- 官方给出的解决办法 https://github.com/vuejs/vue-cli/issues/2274
```js
npm_config_unsafe_perm=true vue create my-project
```