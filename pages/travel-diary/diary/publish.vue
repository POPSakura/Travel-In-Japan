<template>
  <div class="container">
    <div class="diary-wrapper">
      <h1>发表新游记</h1>
      <div class="content">
        <el-form label-position="top" :model="form" :rules="rules" ref="form" label-width="100px">
          <div>
            <el-form-item prop="note">
              <el-input v-model="form.note" placeholder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item prop="content">
              <div class="editor">
                <Editor @contentChange="content => form.content = content"></Editor>
              </div>
            </el-form-item>
          </div>
          <div class="info">
            <el-form-item label="上传封面图片" prop="image">
              <el-upload
                class="avatar-uploader"
                action="http://www.myrb.com:8080/note/uploadNoteImage"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="form.image" :src="form.image" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="简述" prop="describe">
              <el-input
                type="textarea"
                placeholder="请输入内容"
                :autosize="{ minRows: 2 }"
                v-model="form.describe">
              </el-input>
            </el-form-item>
            <el-form-item label="出行日期" prop="date">
              <el-date-picker
                style="width: 100%;"
                v-model="form.date"
                type="date"
                placeholder="选择出行日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="人均消费" prop="price_average">
              <el-input v-model.number="form.price_average" placeholder="人均消费"></el-input>
            </el-form-item>
            <el-form-item label="出行天数" prop="day">
              <el-input v-model.number="form.day" placeholder="出行天数(整数)"></el-input>
            </el-form-item>
            <el-form-item label="出行人数" prop="person">
              <el-input v-model.number="form.person" placeholder="出行人数(整数)"></el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div class="confirm">
        <el-button type="warning" @click="submitForm('form')">发表</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Editor from '@/components/common/editor'

export default {
  nmae: 'Publish',
  data() {
    return {
      cityID: this.$route.query.id,
      form: {
        note: '',
        content: '',
        image: '',
        describe: '',
        date: '',
        price_average: null,
        day: null,
        person: null
      },
      rules: {
        note: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        image: [
          { required: true, message: '请上传封面图', trigger: 'blur' }
        ],
        describe: [
          { required: true, message: '请输入简述', trigger: 'blur' }
        ],
        date: [
          { required: true, message: '请选择日期', trigger: 'blur' }
        ],
        price_average: [
          { type: 'number', message: '格式不正确', trigger: 'change' }
        ],
        day: [
          { type: 'number', message: '格式不正确', trigger: 'change' }
        ],
        person: [
          { type: 'number', message: '格式不正确', trigger: 'change' }
        ]
      }
    }
  },
  components: {
    Editor
  },
  methods: {
    // 图片上传成功执行
    handleAvatarSuccess(res, file) {
      const self = this
      if(res.code === 0){
        const { rePath: path } = res
        self.$message({
          message: res.msg,
          type: 'success'
        })
        this.form.image = path
      }else{
        self.$message({
          message: res.msg,
          type: 'error'
        })
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || 'image/jpg' || 'image/png' || 'image/gif'
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG、PNG、GIF 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const { form, cityID } = this
          const { data } = await this.$axios.post('/note/addNoteOfCity', Object.assign({}, { form }, {
            countyID: 29,
            cityID
          }))
          if (data.code === 0) {
            this.$message.success(`${data.msg}即将跳转用户中心！`)
            setTimeout(() => {
              this.$router.push('/userInfo/userData')
            }, 2000)
          } else {
            this.$message.error(data.msg)
          }
        } else {
          this.$message.error('请检查必填项！')
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import '@/assets/css/iconfont.css';

@main-font-color: #666666;
@sub-font-color: #999999;
@border-bottom: 1px solid #E4E4E4;
/deep/ .el-form-item {
  margin-bottom: 0;
}
/deep/ .el-form-item__label {
  padding: 0;
  line-height: 35px;
}
/deep/ .el-form-item__content {
  line-height: normal;
}
/deep/ .el-form {
  display: flex;
}

.container {
  color: @main-font-color;
  background-color: #ffffff;
  padding: 2em 18em;
  .diary-wrapper {
    h1 {
      padding-bottom: 1em;
      border-bottom: @border-bottom;
    }
    .content {
      height: 40em;
      form {
        height: 100%;
        display: flex;
        justify-content: space-between;
      }
      & > form > div:nth-child(1) {
        width: 67%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .editor {
          height: 36em;
        }
      }
      & > form > .info {
        width: 30%;
        overflow-y: auto;
        /deep/ .avatar-uploader {
          height: 9.5em;
          .el-upload {
            height: 100%;
            border: 1px dashed #d9d9d9;
            border-radius: 10px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            .avatar-uploader-icon {
              font-size: 28px;
              color: #8c939d;
            }
          }
          &:hover .el-upload {
            border-color: #409EFF;
          }
        }
      }
    }
    .confirm {
      margin-top: 1em;
      overflow: hidden;
      button {
        float: right;
      }
    }
  }
}
</style>