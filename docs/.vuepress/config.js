module.exports = {
	title: '学习笔记', // 网站的标题，它将会被用作所有页面标题的前缀
	description: '描述', // 网站的描述
	base: '/', // 基路径
	// 需要被注入到当前页面的 HTML <head> 中的标签
	head: [ // 路径的"/"就是public资源目录
		['link', { rel: 'icon', href: '/favicon.ico' }]
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