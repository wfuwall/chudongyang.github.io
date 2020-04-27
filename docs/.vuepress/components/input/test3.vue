<template>
  <s-input clearable v-model="input" placeholder="请输入手机号" type="number"></s-input>
</template>
<script>
export default {
  data () {
    return {
      input: ''
    }
  }
}
</script>