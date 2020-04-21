import Vue from 'vue';
import ElementUI from 'element-ui'; // 引入elementUi
import 'element-ui/lib/theme-chalk/index.css'

import hightlight from 'highlight.js'
import 'highlight.js/styles/color-brewer.css' //样式文件

import squareUI from 'square-ui';
import 'square-ui/dist/square-ui.css';

// 配置 v-highlight 指令，可以在 demo-block.vue 文件中对代码块进行高亮显示
Vue.directive('highlight', function(el) {
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach(block => {
    hightlight.highlightBlock(block)
  })
})

export default ({ Vue, options, router, siteData }) => {
  Vue.use(ElementUI)
  Vue.use(squareUI)
}