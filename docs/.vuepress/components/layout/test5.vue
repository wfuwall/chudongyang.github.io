<template>
  <div>
    <s-row type="flex" class="row-bg">
      <s-col :span="6"><div class="grid-content bg-purple"></div></s-col>
      <s-col :span="6"><div class="grid-content bg-purple-light"></div></s-col>
      <s-col :span="6"><div class="grid-content bg-purple"></div></s-col>
    </s-row>
    <s-row type="flex" class="row-bg" justify="center">
      <s-col :span="6"><div class="grid-content bg-purple"></div></s-col>
      <s-col :span="6"><div class="grid-content bg-purple-light"></div></s-col>
      <s-col :span="6"><div class="grid-content bg-purple"></div></s-col>
    </s-row>
    <s-row type="flex" class="row-bg" justify="end">
      <s-col :span="6"><div class="grid-content bg-purple"></div></s-col>
      <s-col :span="6"><div class="grid-content bg-purple-light"></div></s-col>
      <s-col :span="6"><div class="grid-content bg-purple"></div></s-col>
    </s-row>
    <s-row type="flex" class="row-bg" justify="space-between">
      <s-col :span="6"><div class="grid-content bg-purple"></div></s-col>
      <s-col :span="6"><div class="grid-content bg-purple-light"></div></s-col>
      <s-col :span="6"><div class="grid-content bg-purple"></div></s-col>
    </s-row>
    <s-row type="flex" class="row-bg" justify="space-around">
      <s-col :span="6"><div class="grid-content bg-purple"></div></s-col>
      <s-col :span="6"><div class="grid-content bg-purple-light"></div></s-col>
      <s-col :span="6"><div class="grid-content bg-purple"></div></s-col>
    </s-row>
  </div>
</template>

<style scoped lang="scss">
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.s-row{
  margin-bottom: 20px;
  &:last-child{
    margin-bottom: 0;
  }
}
.grid-content{
  border-radius: 4px;
  min-height: 36px;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
</style>