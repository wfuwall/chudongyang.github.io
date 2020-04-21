### mac下MySQL的安装
记录mac下MySQL的安装，至于window下MySQL的安装可以自行google！以下内容都是针对mac系统的...

### MySQL下载
- [MySQL下载地址](https://dev.mysql.com/downloads/mysql/)
- 选择版本
<img src="/select-version.png"  height="420" width="auto">

- 下载
<img src="/download.png"  height="460" width="auto">

- 下载完成后，一路默认安装即可！注意在`Configuration`选择`Use Legacy Password Encryption`使用旧版密码加密项
> 可以在系统偏好设置里找到MySQL图标对其进行启动/禁用、初始化数据库重置密码、卸载等操作。
- cd /usr/local/mysql/bin 下查看该目录下是否有mysql
- 将mysql加入系统环境变量
```js
vim ~/.bash_profile
在该文件中写入 PATH=$PATH:/usr/local/mysql/bin 后保存关闭
source ~/.bash_profile
```
- 启动和退出MySQL
```js
mysql -u root -p （启动mysql）
输入密码后，在输入 show databases; (注意：分号必须有)
出现下图后表示mysql启动成功
输入 quit 或者 exit 或者 \q 都可以退出 mysql
```
<img src="/mysql-success.png"  height="150" width="auto">
