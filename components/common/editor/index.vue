<template>
  <div class="editor-container" 
    v-loading="imageLoading" 
    element-loading-text="请稍等，图片上传中">
    <div
      class="quill-editor"
      :content="content"
      @change="onEditorChange($event)"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)"
      v-quill:myQuillEditor="editorOption">
    </div>
    <el-upload
      style="display: none"
      class="avatar-uploader"
      action="http://www.myrb.com:8080/note/uploadNoteImage"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon" id="uploader"></i>
    </el-upload>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: '',
      editorOption: {
        // some quill options
        modules: {
          toolbar: {
            container: [
              ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
              ["blockquote", "code-block"], // 引用  代码块
              [{ header: 1 }, { header: 2 }], // 1、2 级标题
              [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
              [{ script: "sub" }, { script: "super" }], // 上标/下标
              [{ indent: "-1" }, { indent: "+1" }], // 缩进
              [{direction: 'rtl'}],                        // 文本方向
              [{ size: ["small", false, "large", "huge"] }], // 字体大小
              [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
              [{ font: [] }], // 字体种类
              [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
              [{ align: [] }], // 对齐方式
              ["clean"], // 清除文本格式
              ["link", "image", "video"] // 链接、图片、视频
            ],
            handlers: {
              'image'(value) {
                if (value) {
                  //这里就是点击上传图片按钮会触发的事件，然后，你这里直接触发我们element上传图片的按钮点击
                  document.querySelector('#uploader').click()
                }else {
                  this.quill.format('image', false)
                }
              }
            }
          }
        }
      },
      imageUrl: '',
      imageLoading: false
    }
  },
  watch: {
    content() {
      this.$emit('contentChange', this.content)
    }
  },
  methods: {
    onEditorBlur(editor) {
      // 失去焦点事件
    },
    onEditorFocus(editor) {
      // 获得焦点事件
    },
    onEditorReady(editor) {
      // 编辑器渲染完毕
    },
    onEditorChange({ quill: editor, html, text }) {
      //内容改变事件
      this.content = html
    },
    // 图片上传成功执行
    handleAvatarSuccess(res, file) {
      const self = this
      if(res.code === 0){
        const { rePath: path } = res
        self.$message({
          message: res.msg,
          type: 'success'
        })
        const quill = this.myQuillEditor
        const length = quill.getLength()
        quill.insertEmbed(length, 'image', path)
        quill.setSelection(length + 1)
        this.imageLoading = false
      }else{
        self.$message({
          message: res.msg,
          type: 'error'
        })
        this.imageLoading = false
      }
    },
    beforeAvatarUpload(file) {
      this.imageLoading = true
      const isJPG = file.type === 'image/jpeg' || 'image/jpg' || 'image/png' || 'image/gif'
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG、PNG、GIF 格式!')
        this.imageLoading = false
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
        this.imageLoading = false
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style lang="less" scoped>
.editor-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  /deep/ .quill-editor {
    flex: 1;
  }
}
.quill-editor {
  overflow-y: auto;
  overscroll-behavior: contain;
  -webkit-overscroll-behavior: contain;
}
</style>
