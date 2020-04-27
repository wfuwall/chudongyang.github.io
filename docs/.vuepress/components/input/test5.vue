<template>
  <div class="input">
    <s-input prefix-icon="edit" v-model="input1" placeholder="请输入内容"></s-input>
    <s-input suffix-icon="search" v-model="input2" placeholder="请输入内容"></s-input>
  </div>
</template>
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