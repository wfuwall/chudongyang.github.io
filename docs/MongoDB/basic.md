### MongoDB简介
MongoDB是一个介于关系数据库和非关系数据库之间的产品，是非关系数据库中功能最丰富、最像关系数据库的产品。它支持的结构非常松散，是类似JSON的BSON格式，因此可以存储比较复杂的类型。MongoDB最大的特点是它支持的查询语言功能功能非常强大，其语法类似于面向对象的查询语言，几乎可以实现类似关系数据库单表查询的绝大部分功能，而且还支持对数据建立索引。

### MongoDB的安装
在mac上安装MongoDB之前，你首先需要安装homebrew，其实一款Mac OS平台下的软件包管理工具。拥有安装、卸载、更新、查看、搜索等很多实用的功能。（假设你已经安装了homebrew）
- 安装MongoDB
```
brew install mongodb
```
- 新建data/db文件夹保存数据 (-p是在当前目录的父级目录新建)
```
sudo mkdir -p /data/db
```
- 给创建的文件夹写入数据权限 ($USER指的是你的用户名)
```
sudo chown -R $USER /data/db
```
- 运行MongoDB
```
mongod
```
> 当看到 `waiting for connections on port 27017` 时表示mongod运行成功了。

### 数据库的基本操作
1. 使用数据库 (database_name是数据库的名字)
```
use database_name 
```
> 如果数据库存在，则切换到此数据库下，不存在也可以切换过来，但是不会立即创建
2. 查看所有的数据库
```
show dbs
```
3. 查看当前正在使用的数据库
```
db
```
4. 