<template>
  <div class="upload">
    <s-upload
      name="avatar"
      action="http://localhost:3000/upload"
      :file-list="fileList"
      :limit="3"
      accept="image/jpg, image/jpeg"
      :on-exceed="handleExceed"
    >
      <s-button type="primary" icon="">点击上传</s-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </s-upload>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fileList: [
        {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, 
        {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
      ]
    };
  },
  methods: {
    handleExceed(files, fileList) {
      console.log(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    }
  }
}
</script>