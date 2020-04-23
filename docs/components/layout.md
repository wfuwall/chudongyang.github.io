### 布局组件
通过基础的 24 分栏，迅速简便地创建布局

#### 基础布局
<demo-block>
::: slot source
<layout-test1></layout-test1>
:::

通过 row 和 col 组件，并通过 col 组件的 span 属性我们就可以自由地组合布局。

::: slot highlight
```html
<s-row>
  <s-col :span="24"><div class="grid-content bg-purple-dark"></div></s-col>
</s-row>
<s-row>
  <s-col :span="12"><div class="grid-content bg-purple"></div></s-col>
  <s-col :span="12"><div class="grid-content bg-purple-light"></div></s-col>
</s-row>
<s-row>
  <s-col :span="8"><div class="grid-content bg-purple"></div></s-col>
  <s-col :span="8"><div class="grid-content bg-purple-light"></div></s-col>
  <s-col :span="8"><div class="grid-content bg-purple"></div></s-col>
</s-row>
<s-row>
  <s-col :span="6"><div class="grid-content bg-purple"></div></s-col>
  <s-col :span="6"><div class="grid-content bg-purple-light"></div></s-col>
  <s-col :span="6"><div class="grid-content bg-purple"></div></s-col>
  <s-col :span="6"><div class="grid-content bg-purple-light"></div></s-col>
</s-row>
<s-row>
  <s-col :span="4"><div class="grid-content bg-purple"></div></s-col>
  <s-col :span="4"><div class="grid-content bg-purple-light"></div></s-col>
  <s-col :span="4"><div class="grid-content bg-purple"></div></s-col>
  <s-col :span="4"><div class="grid-content bg-purple-light"></div></s-col>
  <s-col :span="4"><div class="grid-content bg-purple"></div></s-col>
  <s-col :span="4"><div class="grid-content bg-purple-light"></div></s-col>
</s-row>

```
:::
</demo-block>

#### 分栏间隔
<demo-block>
::: slot source
<layout-test2></layout-test2>
:::

Row 组件 提供 gutter 属性来指定每一栏之间的间隔，默认间隔为 0。

::: slot highlight
```html
<s-row :gutter="20">
  <s-col :span="6"><div class="grid-content bg-purple"></div></s-col>
  <s-col :span="6"><div class="grid-content bg-purple"></div></s-col>
  <s-col :span="6"><div class="grid-content bg-purple"></div></s-col>
  <s-col :span="6"><div class="grid-content bg-purple"></div></s-col>
</s-row>
```
:::
</demo-block>

#### 混合布局
<demo-block>
::: slot source
<layout-test3></layout-test3>
:::

灵活的使用 row 组件的 gutter 属性和 col 组件的 span 属性结合构建混合式布局。

::: slot highlight
```html
<s-row :gutter="20">
  <s-col :span="16"><div class="grid-content bg-purple"></div></s-col>
  <s-col :span="8"><div class="grid-content bg-purple"></div></s-col>
</s-row>
<s-row :gutter="20">
  <s-col :span="8"><div class="grid-content bg-purple"></div></s-col>
  <s-col :span="8"><div class="grid-content bg-purple"></div></s-col>
  <s-col :span="4"><div class="grid-content bg-purple"></div></s-col>
  <s-col :span="4"><div class="grid-content bg-purple"></div></s-col>
</s-row>
<s-row :gutter="20">
  <s-col :span="4"><div class="grid-content bg-purple"></div></s-col>
  <s-col :span="16"><div class="grid-content bg-purple"></div></s-col>
  <s-col :span="4"><div class="grid-content bg-purple"></div></s-col>
</s-row>
```
:::
</demo-block>

#### 分栏偏移
<demo-block>
::: slot source
<layout-test4></layout-test4>
:::

使用 col 组件的 offset 属性，可以设置左侧的偏移量。

::: slot highlight
```html
<s-row :gutter="20">
  <s-col :span="6"><div class="grid-content bg-purple"></div></s-col>
  <s-col :span="6" :offset="6"><div class="grid-content bg-purple"></div></s-col>
</s-row>
<s-row :gutter="20">
  <s-col :span="6" :offset="6"><div class="grid-content bg-purple"></div></s-col>
  <s-col :span="6" :offset="6"><div class="grid-content bg-purple"></div></s-col>
</s-row>
<s-row :gutter="20">
  <s-col :span="12" :offset="6"><div class="grid-content bg-purple"></div></s-col>
</s-row>
```
:::
</demo-block>

#### 对齐方式
通过 flex 布局来对分栏进行灵活的对齐。

<demo-block>
::: slot source
<layout-test5></layout-test5>
:::

使用 row 组件的 justify 属性，可以设置子元素 col 组件对齐方式。

::: slot highlight
```html
<s-row class="row-bg">
  <s-col :span="6"><div class="grid-content bg-purple"></div></s-col>
  <s-col :span="6"><div class="grid-content bg-purple-light"></div></s-col>
  <s-col :span="6"><div class="grid-content bg-purple"></div></s-col>
</s-row>
<s-row class="row-bg" justify="center">
  <s-col :span="6"><div class="grid-content bg-purple"></div></s-col>
  <s-col :span="6"><div class="grid-content bg-purple-light"></div></s-col>
  <s-col :span="6"><div class="grid-content bg-purple"></div></s-col>
</s-row>
<s-row class="row-bg" justify="end">
  <s-col :span="6"><div class="grid-content bg-purple"></div></s-col>
  <s-col :span="6"><div class="grid-content bg-purple-light"></div></s-col>
  <s-col :span="6"><div class="grid-content bg-purple"></div></s-col>
</s-row>
<s-row class="row-bg" justify="space-between">
  <s-col :span="6"><div class="grid-content bg-purple"></div></s-col>
  <s-col :span="6"><div class="grid-content bg-purple-light"></div></s-col>
  <s-col :span="6"><div class="grid-content bg-purple"></div></s-col>
</s-row>
<s-row class="row-bg" justify="space-around">
  <s-col :span="6"><div class="grid-content bg-purple"></div></s-col>
  <s-col :span="6"><div class="grid-content bg-purple-light"></div></s-col>
  <s-col :span="6"><div class="grid-content bg-purple"></div></s-col>
</s-row>
```
:::
</demo-block>


#### 响应式布局
设了五个响应尺寸：xs、sm、md、lg 和 xl。

<demo-block>
::: slot source
<layout-test6></layout-test6>
:::

::: slot highlight
```html
<s-row :gutter="10">
  <s-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div class="grid-content bg-purple"></div></s-col>
  <s-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><div class="grid-content bg-purple-light"></div></s-col>
  <s-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><div class="grid-content bg-purple"></div></s-col>
  <s-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div class="grid-content bg-purple-light"></div></s-col>
</s-row>
```
:::
</demo-block>

#### Row Attributes 属性
参数|说明|类型|可选值|默认值
:-|:-|:-|:-|:-|:-
gutter|栅格间隔|number| - |0
justify|flex 布局下的水平排列方式|string | start / end / center / space-around / space-between | start

#### Col Attributes 属性
参数|说明|类型|可选值|默认值
:-|:-|:-|:-|:-|:-
span|栅格占据的列数|Number| - | 24
offset|栅格左侧的间隔格数|Number | - | 0
xs|<768px 响应式栅格数或者栅格属性对象| number/object (例如： {span: 4, offset: 4}) | - | -
sm|≥768px 响应式栅格数或者栅格属性对象| number/object (例如： {span: 4, offset: 4}) | - | -
md|≥992px 响应式栅格数或者栅格属性对象| number/object (例如： {span: 4, offset: 4}) | - | -
lg|≥1200px 响应式栅格数或者栅格属性对象| number/object (例如： {span: 4, offset: 4}) | - | -
xl|≥1920px 响应式栅格数或者栅格属性对象| number/object (例如： {span: 4, offset: 4}) | - | -