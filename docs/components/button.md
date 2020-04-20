### 按钮组件
常用的按钮组件

#### 基础用法 

<demo-block>
::: slot source
<button-test1></button-test1>
:::

使用 type 属性来定义 Button 的样式。

::: slot highlight
```html
<el-row>
  <s-button>默认按钮</s-button>
  <s-button type="primary">主要按钮</s-button>
  <s-button type="success">成功按钮</s-button>
  <s-button type="info">信息按钮</s-button>
  <s-button type="warning">警告按钮</s-button>
  <s-button type="danger">危险按钮</s-button>
</el-row>
```
:::
</demo-block>

#### 禁用按钮
<demo-block>
::: slot source
<button-test2></button-test2>
:::

使用 disabled 属性来定义 Button 是否被禁用。

::: slot highlight
```html
<el-row>
  <s-button disabled>默认按钮</s-button>
  <s-button type="primary" disabled>主要按钮</s-button>
  <s-button type="success" disabled>成功按钮</s-button>
  <s-button type="info" disabled>信息按钮</s-button>
  <s-button type="warning" disabled>警告按钮</s-button>
  <s-button type="danger" disabled>危险按钮</s-button>
</el-row>
```
:::
</demo-block>

#### 带图标的按钮
带图标的按钮可增强辨识度（有文字）或节省空间（无文字），并且可以设置图标的位置

<demo-block>
::: slot source
<button-test3></button-test3>
:::

使用 icon 属性来定义 Button 的图标，使用 icon-position 来定义图标显示的位置。

::: slot highlight
```html
<el-row>
  <s-button type="success" icon="share">成功按钮</s-button>
  <s-button type="warning" icon='like'></s-button>
  <s-button type="primary" loading="loading" icon-position="right">提交按钮</s-button>
</el-row>
```
:::
</demo-block>

#### 带 loading 效果的按钮
要设置为 loading 状态，只要设置loading属性为true即可。

<demo-block>
::: slot source
<button-test4></button-test4>
:::

使用 loading 属性来定义 Button 的加载中的状态，并且此时 Button 不可点击。

::: slot highlight
```html
<el-row>
  <s-button type="success" loading>提交按钮</s-button>
</el-row>
```
:::
</demo-block>


#### 按钮组
以按钮组的方式出现，常用于多项类似操作。

<demo-block>
:::slot source
<button-test5></button-test5>
:::

使用`<s-button-group>`标签来嵌套你的按钮。

:::slot highlight
```html
<s-button-group>
  <s-button icon="arrow-left" type="primary">上一页</s-button>
  <s-button icon="arrow-right" type="primary" icon-position="right">下一页</s-button>
</s-button-group>
<s-button-group class="app-button-group">
  <s-button icon="edit" type="default"></s-button>
  <s-button icon="delete" type="default"></s-button>
  <s-button icon="like" type="default"></s-button>
  <s-button icon="message" type="default"></s-button>
  <s-button icon="setting" type="default"></s-button>
</s-button-group>
```
:::
</demo-block>

#### Attributes 属性
参数|说明|类型|可选值|默认值
:-|:-|:-|:-|:-|:-
type|类型|string|primary / success / warning / danger / info |default
icon|图标类名|string | - | -
loading|是否加载中状态|boolean|-|false
disabled|是否禁用|boolean|-|false
icon-position|图标位置|string | left / right | left