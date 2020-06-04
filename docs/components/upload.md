### 上传组件
通过点击或者拖拽上传文件

#### 点击上传
<demo-block>
::: slot source
<upload-test1></upload-test1>
:::

通过 slot 你可以传入自定义的上传按钮类型和文字提示。可通过设置limit和on-exceed来限制上传文件的个数和定义超出限制时的行为。

:::slot highlight
```html
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
```
:::
</demo-block>