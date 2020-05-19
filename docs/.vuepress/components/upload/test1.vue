<template>
  <div class="upload">
    <s-upload
      name="avatar"
      action="http://localhost:3000/upload"
      :file-list="fileList"
      :limit="3"
      accept="image/jpg, image/jpeg"
      :multiple="true"
      :on-exceed="handleExceed"
      :on-error="handleError"
      :on-success="handleSuccess"
      :on-progress="handleProgress"
      :before-upload="beforeUpload"
      :on-remove="handleRemove"
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
      fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
    };
  },
  methods: {
    handleRemove(file, fileList) {
      return confirm(`确定移除 ${ file.name }？`);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      console.log(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    handleProgress() { // 上传过程中

    },
    handleSuccess() {

    },
    handleError() {

    },
    beforeUpload (file) { // 上传之前
      if (file.size / 1024 > 500) {
        console.log('文件最大不能超过500kb')
        return false
      }
      if (!['jpg', 'jpeg'].includes(file.name.split('.')[1])) {
        console.log('上传的图片必须是jpg或者jpeg格式的')
        return false
      }
      return true
    }
  }
}
</script>
<style lang="scss" scoped>

</style>