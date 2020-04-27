const sidebar = [
	{
		title: 'square-ui 组件',
		collapsable: false,
		children: [
			'/components/layout',
			'/components/container',
			'/components/button',
			'/components/input'
		]
	},
	{
		title: 'javaScript相关',
		collapsable: false,
		children: [
			'/javaScript/basic',
			'/javaScript/mackdown基础语法'
		]
	},
	{
		title: 'vue相关',
		collapsable: false,
		children: [ 
			'/vue/basic',
			'/vue/comLibrary'
		]
	},
	{
		title: 'react相关',
		collapsable: false,
		children: [ 
			'/react/basic'
		]
	},
	{
		title: '小程序',
		collapsable: false,
		children: [ 
			'/wechat/error'
		]
	},
	{
		title: 'TypeScript相关',
		collapsable: false,
		children: [ 
			'/TypeScript/basic',
			'/TypeScript/数据类型',
			'/TypeScript/函数',
			'/TypeScript/类'
		]
	},
	{
		title: 'flutter相关',
		collapsable: false,
		children: [ 
			'/flutter/install',
		]
	},
	{
		title: '指令相关',
		collapsable: false,
		children: [ 
			'/command/git',
			'/command/npm',
			'/command/brew'
		]
	},
	{
		title: '数据库相关',
		collapsable: false,
		children: [ 
			'/db/MySQL'
		]
	},
	{
		title: 'book相关',
		collapsable: false,
		children: [ 
			'/book/HTTP'
		]
	},
	{
		title: '博客文章',
		collapsable: false,
		children: [ 
			'/blog/travis和vuepress搭建github仓库',
			'/blog/promise实现',
			'/blog/事件环',
			'/blog/nodeJs流'
		]
	}
]
const nav = [
	{ text: '掘金专栏', link: 'https://juejin.im/user/586687fe61ff4b006db52c79/posts' }, // 内部链接 以docs为根目录
	{ text: '博客', 
		items: [
			{ text: '博客地址', link: 'https://github.com/chudongyang' },
			{ text: '博客仓库', link: 'https://github.com/chudongyang/chudongyang.github.io' }
		]
	}, // 外部链接
	// 下拉列表
	{
		text: 'GitHub',
		items: [
			{ text: 'GitHub地址', link: 'https://github.com/chudongyang' }
		]
	}        
]
module.exports = {
	title: 'Promise-学习笔记', // 网站的标题，它将会被用作所有页面标题的前缀
	// 网站的描述，它将会以 <meta> 标签渲染到当前页面的 HTML 中
	description: '从头开始总结学习笔记，包括但不限于javaScript基础、vue和react相关、node相关等，每天总结一点点，积少成多...', 
	base: '/', // 基路径
	// 需要被注入到当前页面的 HTML <head> 中的标签
	head: [
		// 路径的"/"就是public资源目录
		['link', { rel: 'icon', href: '/favicon.ico' }]
	],
	// 指定用于 dev server 的主机名 和 端口号
	host: '127.0.0.1',
	port: '8080',
	// 指定 vuepress build 的输出目录。
	dest: '.vuepress/dist',
	Markdown: {
		// 是否在每个代码块的左侧显示行号。
		lineNumbers: true,
	},
	themeConfig: {
    sidebarDepth: 1, // 嵌套的标题链接深度。默认的深度是 1，它将提取到 h2 的标题, 最大深度是2
		lastUpdated: '更新时间', // 最后更新时间， 基于 git 的
		displayAllHeaders: false, // 显示所有页面的标题链接
		activeHeaderLinks: true, // 是否禁用滚动中的标题链接和url中hash值的更新
		search: false, // 是否禁用搜索框， 也可以通过 Algolia 搜索 替换内置搜索
    searchMaxSuggestions: 10, // 设置搜索结果数量
		// 头部导航配置
		nav,
		// 侧边栏配置
		sidebar
  }
}