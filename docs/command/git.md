### git相关
主要总结一些git提交代码过程中不经常用到，但是偶尔需要用到但是不知道是什么的命令。。。

### 删除已经提交的node_module文件
1. 删除仓库中不小心提交的node_module文件
- 切换到要删除该文件夹的分支，在`.gitignore` 文件中添加 node_modules
- 然后依次按顺序执行以下命令
```js
git rm -r --cached node_modules
git add .
git commit -m'remove node_modules'
git push origin 分支名
```

### git commit之后，想撤销commit
commit撤回后，依然保留你写的代码
```js
git reset --soft HEAD^
```
- HEAD^的意思是上一个版本，也可以写成HEAD~1，如果commit了n次，可以写成HEAD~n
- --soft 不删除工作空间改动代码，撤销commit，不撤销git add . 