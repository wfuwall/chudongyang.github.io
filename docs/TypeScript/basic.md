### ts-简介
TypeScript是由微软开发的一款开源的编程语言。旨在编译阶段就经过系统的类型检查，可以避免很多线上的错误。是JavaScript的超集。

### TypeScript的安装
- 全局安装
```
npm install -g typescript
```
- 把.ts后缀的文件编译成.js后缀的文件
```
tsc index.ts
```
- 生成tsconfig.json配置文件
```
tsc --init
```
> 在vscode中，可以通过选择 Terminal(终端)->Run Build Task...(运行生成任务...)->tsc:watch - tsconfig.json 来编译自动ts文件，实现边修改边编译。

### 参考文献
- [TypeScript入门教程](https://ts.xcatliu.com/)
- 珠峰架构文档