<template>
  <s-container class="container">
    <s-aside width="200px">Aside</s-aside>
    <s-container>
      <s-header>Header</s-header>
      <s-main>Main</s-main>
      <s-footer>Footer</s-footer>
    </s-container>
  </s-container>
</template>

<style lang="scss" scoped>
.container{
  margin-bottom: 40px;
}

.s-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

.s-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 320px;
}

.s-header, .s-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
</style>