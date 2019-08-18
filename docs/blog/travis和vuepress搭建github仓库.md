### VuePress+Travis+Github搭建文档
VuePress+Travis+Github自动化构建生成线上文档，整体思路可以分为如下三个步骤：
1. 使用github搭建自己的文档仓库
2. 使用vuePress构建自己的文档项目
3. 使用Travis CI自动化部署项目

### Github创建项目
<img src="/1.png"  height="400" width="auto">

- 首先在github上创建一个类似`[name].github.io`这样的仓库,这样方便通过 `https://[name].github.io` 直接访问到这个项目
- 将创建好的项目克隆项目到本地

### 使用vuePress搭建文档
在克隆好的项目中，切换到新建的docs分支(master分支要存放生产环境的代码)，用于存放文档源码，之后都在此分支上提交源码。使用`npm init -y`初始化项目后，安装vuepress依赖，并配置脚本和vuepress基础配置。最终搭建的项目基础骨架如下图所示：

<img src="/2.png"  height="200" width="auto">

- docs目录下的 `README.md` 会被作为项目的启动页面，其内容如下，可以根据自己的需要进行修改：
```
---
home: true
heroImage: /avatar.jpeg
actionText: 笔记详情 →
actionLink: /blog/博客
features:
- title: 学习笔记
  details: 学习笔记
- title: 学习兴趣
  details: 学习兴趣
- title: 个人介绍
  details: 个人介绍
footer: MIT Licensed | Copyright © 2018-present 
---

### star
如果感觉对您有帮助，请不要吝啬点个star，作者感谢o(￣︶￣)o  Promise 
```
- 在package.json中加入开发和生产环境的运行脚本
```
"scripts": {
	"dev": "vuepress dev docs",
	"build": "vuepress build docs"
}
```
- 在config.js文件中可以配置vuepress的一些基础配置，详情配置可以查看 [VuePress配置](https://vuepress.vuejs.org/zh/config/ "描述信息") 
```
module.exports = {
	title: '学习笔记', // 网站的标题，它将会被用作所有页面标题的前缀
	description: '描述', // 网站的描述
	base: '/', // 基路径
	head: [ // 需要被注入到当前页面的 HTML <head> 中的标签
		['link', { rel: 'icon', href: '/favicon.ico' }] // 路径的"/"就是public资源目录
	],
	host: '127.0.0.1',
	port: '8080',
	dest: '.vuepress/dist', // 指定 vuepress build 的输出目录。
	Markdown: {
		lineNumbers: true // 是否在每个代码块的左侧显示行号。
	},
	themeConfig: {
		sidebarDepth: 1, // 嵌套的标题链接深度
		lastUpdated: '更新时间', // 最后更新时间,基于 git 的
		displayAllHeaders: false, // 显示所有页面的标题链接
		activeHeaderLinks: true, // 是否禁用滚动中的标题链接和url中hash值的更新
		search: false, // 是否禁用搜索框， 也可以通过 Algolia 搜索 替换内置搜索
		searchMaxSuggestions: 10, // 设置搜索结果数量
		// 头部导航配置
		nav: [
			{ text: 'GitHub', link: 'https://www.baidu.com' },
			{ text: '博客', 
				items: [
					{ text: '博客1', link: 'https://www.baidu.com' },
					{ text: '博客2', link: 'https://www.baidu.com' }
				]
			}
		],
		// 侧边栏配置
		sidebar: [
			{ title: '博客文章', collapsable: false, children: [ '/blog/博客']}
		]
	}
}
```
### Travis CI配置
`Travis CI` 提供的是持续集成服务, 它只支持 Github项目。当项目中代码有变更，它便会提供一个运行环境，执行测试，完成构建，还能部署到服务器。
1. 首先在项目根目录下创建 `.travis.yml` 文件。Travis CI的基础教程，可以参考阮一峰的[持续集成服务 Travis CI 教程](http://www.ruanyifeng.com/blog/2017/12/travis_ci_tutorial.html)，其中的UESR_NAME、UESR_EMAIL、GIHUB_TOKEN、GIHUB_REF、BRANCH是需要在travis网站配置的环境变量。
```
language: node_js
node_js:
    - 10
cache: yarn
install:
    - yarn
script:
   - yarn build
after_success:
    - cd .vuepress/dist
    - git init
    - git config --global user.name "${UESR_NAME}"
    - git config --global user.email "${UESR_EMAIL}"
    - git add -A
    - git commit -m 'deploy vuePress docs'
    - git push --quiet --force "https://${GIHUB_TOKEN}@${GIHUB_REF}" master:${PUSH_BRANCH}
```
> 一定要注意此`.travis.yml` 文件的格式，如果格式不对，会导致构建失败。

- UESR_NAME:   github的用户名
- UESR_EMAIL:  github的邮箱
- GIHUB_REF:   项目目地址（github.com/[name]/[name].github.io.git）注意去掉 https:// （如果不清楚地址可以查看Clone or download 按钮）
- PUSH_BRANCH:      要上传的分支
- GIHUB_TOKEN: 访问GitHub API的个人访问令牌 通过 settings->Developer settings->Personal access tokens->Generate new token 生成新的token
<img src="/4.png"  height="400" width="auto">
> Note可以随便填，下面的选项是选择该token的使用权限

2. 使用github账号访问 [tracis官方网站](https://travis-ci.org)，将需要travis监听的项目激活，并配置环境变量，如下图所示
<img src="/3.png"  height="365" width="auto">
<img src="/5.png"  height="380" width="auto">

3. 将本地项目推到github上,并更改该仓库的默认分支，如下图所示
<img src="/6.png"  height="300" width="auto">

4. 开启 GitHub Pages
<img src="/8.png"  height="310" width="auto">

4. 打开 [tracis官方网站](https://travis-ci.org) 查看项目构建的状态，如果构建失败，可以点击进入详情查看构建日志
<img src="/7.png"  height="200" width="auto">