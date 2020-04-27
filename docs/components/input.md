### 输入框组件
通过鼠标或键盘输入字符

#### 基础用法
<demo-block>
:::slot source
<input-test1></input-test1>
:::

:::slot highlight
```html
<s-input v-model="input" placeholder="请输入内容"></s-input>

<script>
export default {
  data () {
    return {
      input: ''
    }
  }
}
</script>
```
:::
</demo-block>

#### 禁用状态
<demo-block>
:::slot source
<input-test2></input-test2>
:::

:::slot highlight
```html
<s-input v-model="input" :disabled="true"></s-input>

<script>
export default {
  data () {
    return {
      input: ''
    }
  }
}
</script>
```
:::
</demo-block>

#### 可清空
<demo-block>
:::slot source
<input-test3></input-test3>
:::

:::slot highlight
```html
<s-input clearable v-model="input" placeholder="请输入手机号" type="number"></s-input>

<script>
export default {
  data () {
    return {
      input: ''
    }
  }
}
</script>
```
:::
</demo-block>

#### 密码框
<demo-block>
:::slot source
<input-test4></input-test4>
:::

:::slot highlight
```html
<s-input show-password v-model="input" placeholder="请输入密码"></s-input>

<script>
export default {
  data () {
    return {
      input: ''
    }
  }
}
</script>
```
:::
</demo-block>

#### 带 icon 的输入框
带有图标标记输入类型，图表可以放置在前，也可以置于末尾。

<demo-block>
:::slot source
<input-test5></input-test5>
:::

:::slot highlight
```html
<div class="input">
  <s-input prefix-icon="edit" v-model="input1" placeholder="请输入内容"></s-input>
  <s-input suffix-icon="search" v-model="input2" placeholder="请输入内容"></s-input>
</div>

<script>
export default {
  data () {
    return {
      input1: '',
      input2: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.input{
  display: flex;
  align-items: center;
  .s-input{
    margin-right: 20px;
  }
}
</style>
```
:::
</demo-block>


#### Input Attributes
参数|说明|类型|可选值|默认值
:-|:-|:-|:-|:-|:-
name|原生 name 属性|string| - | -
placeholder|输入框描述|string| - | 请输入内容
type|输入框类型|string| - | text
disabled|是否禁用|boolean| - | false
clearable|是否可清空|boolean| - | false
showPassword|是否显示密码输入框|boolean| - | false
prefixIcon|输入框头部图标|string| - | -
suffixIcon|输入框尾部图标|string| - | -