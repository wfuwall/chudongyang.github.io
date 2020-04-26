### 容器组件
用于布局的容器组件，方便快速搭建页面的基本结构
`<s-container>`：外层容器。子元素默认是水平排列的，当子元素中包含 `<s-header>` 或 `<s-footer>` 时会垂直上下排列。

`<s-header>`：顶栏容器。

`<s-aside>`：侧边栏容器。

`<s-main>`：主要区域容器。

`<s-footer>`：底栏容器。

#### 常见页面布局
<demo-block>
:::slot source
<container-test1></container-test1>
<container-test2></container-test2>
<container-test3></container-test3>
<container-test4></container-test4>
<container-test5></container-test5>
<container-test6></container-test6>
:::

:::slot highlight
```html
<s-container>
  <s-header>Header</s-header>
  <s-main>Main</s-main>
</s-container>

<s-container>
  <s-header>Header</s-header>
  <s-main>Main</s-main>
  <s-footer>Footer</s-footer>
</s-container>

<s-container>
  <s-aside width="200px">Aside</s-aside>
  <s-main>Main</s-main>
</s-container>

<s-container class="container">
  <s-header>Header</s-header>
  <s-container>
    <s-aside width="200px">Aside</s-aside>
    <s-main>Main</s-main>
  </s-container>
</s-container>

<s-container class="container">
  <s-header>Header</s-header>
  <s-container>
    <s-aside width="200px">Aside</s-aside>
    <s-container>
      <s-main>Main</s-main>
      <s-footer>Footer</s-footer>
    </s-container>
  </s-container>
</s-container>

<s-container class="container">
  <s-aside width="200px">Aside</s-aside>
  <s-container>
    <s-header>Header</s-header>
    <s-main>Main</s-main>
    <s-footer>Footer</s-footer>
  </s-container>
</s-container>
```
:::
</demo-block>


#### Header Attributes
参数|说明|类型|可选值|默认值
:-|:-|:-|:-|:-|:-
height|顶栏高度|string| - | 60px

#### Aside Attributes
参数|说明|类型|可选值|默认值
:-|:-|:-|:-|:-|:-
width|侧边栏宽度|string| - | 300px

#### Footer Attributes
参数|说明|类型|可选值|默认值
:-|:-|:-|:-|:-|:-
height|底栏高度|string| - | 60px