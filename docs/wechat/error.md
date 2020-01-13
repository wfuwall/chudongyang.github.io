### 常见小程序错误的处理
1. 控制台报警告 -- 设置 enable-flex 属性以使 flexbox 布局生效
- 解决办法: 给 scroll-view 组件设置 enable-flex="true" 即可

2. 控制台报错 `Failed to load local image resource xxxx the server responded with a status of 500 (HTTP/1.1 500 Internal Server Error) ` 
- 解决办法: cover-image 组件的图片地址是异步的，需要加上条件判断 wx:if 