<template>
  <div>
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
  </div>
</template>
<style scoped lang="scss">
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
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
</style>