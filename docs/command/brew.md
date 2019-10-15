### brew相关
Homebrew是一款Mac OS平台下的软件包管理工具，拥有安装、卸载、更新、查看、搜索等很多实用的功能。这里主要总结其常用的一些基本指令

### 查找安装的包
1. 查找使用brew 安装过的所有包
```
brew list
```
2. 查找使用 brew 安装过的某个包(比如mongodb)所在的目录
```
brew list mongodb
```
mongodb的启动之前，需要做的准备工作
- 将 mongod 加入环境变量 在 `.bash_profile` 中加入下面代码
```
export PATH=/usr/local/Cellar/mongodb/4.0.3_1/bin:${PATH}} // 4.0.3_1是你下载的版本
```
- 在根目录下创建data/db用以存放数据文件，更改 `mongod.conf` 配置文件下的 `dbpath = /data/db`
```
systemLog:
  destination: file
  path: /usr/local/var/log/mongodb/mongo.log
  logAppend: true
storage:
  dbPath: /data/db
net:
  bindIp: 127.0.0.1
```
> 如果需要连接非本地环境的mongodb数据库时，更改 `bindIp: 0.0.0.0`即可
- 如果运行 `mongod` 报下面这个错误，说明没有权限，需要执行 `sudo mongod` 然后输入密码即可，看到 `waiting for connections on port 27017` 说明mongod启动成功了
<img src="/mongod-error.png"  height="500" width="auto">