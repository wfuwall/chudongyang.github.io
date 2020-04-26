<template>
  <s-container class="container">
    <s-header>Header</s-header>
    <s-container>
      <s-aside width="200px">Aside</s-aside>
      <s-main>Main</s-main>
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
  line-height: 200px;
}

.s-header, .s-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
</style>