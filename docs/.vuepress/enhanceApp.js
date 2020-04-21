import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'

import hightlight from 'highlight.js';
import 'highlight.js/styles/googlecode.css'; // 样式文件

import lightweightUI from 'lightweight-ui';
import 'lightweight-ui/dist/lightweight-ui.css';

Vue.directive('hightlight', function(el) {
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach(block => {
    hightlight.highlightBlock(block)
  })
})

export default ({ Vue, options, router, siteData }) => {
  Vue.use(ElementUI)
  Vue.use(lightweightUI)
}