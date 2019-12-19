<template>
  <div class="userpass-container">
    <h5>修改密码</h5>
    <div class="userpass-in">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="250px" class="demo-ruleForm">
        <el-form-item label="旧密码" prop="oldPass">
          <el-input v-model="ruleForm.oldPass" v-on:input="checkPass" type="password"></el-input>
          <span :class="check_box" class="check-box">{{checkMsg}}</span>
        </el-form-item>
        <el-form-item label="新密码" prop="newPass">
          <el-input v-model="ruleForm.newPass" type="password"></el-input>
        </el-form-item>
        <el-form-item label="再次输入新密码" prop="renewPass">
          <el-input v-model="ruleForm.renewPass" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm" :disabled="flag">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
        <span class="status-box">{{statusMsg}}</span>
      </el-form>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import CryptoJS from 'crypto-js'
export default {
  name: 'ModifyPass',
  data: function() {
    return {
      statusMsg:'',
      checkMsg: '',
      flag: true,
      check_box: {
        colorRed: true,
        colorGreen: false
      },
      ruleForm: {
        oldPass: '',
        newPass: '',
        renewPass: ''
      },
      rules: {
        oldPass: [
          { required: true, message: '请输入旧密码！', trigger: 'change' }
        ],
        newPass: [
          { required: true, message: '请输入新密码！', trigger: 'blur' }
        ],
        renewPass: [
          { required: true, message: '请再次输入密码！', trigger: 'blur'},
          {
            validator: (rule, value, callback) => {
              if(value === this.ruleForm.newPass){
                callback()
              }else{
                callback(new Error('两次输入密码不一致！'))
              }
            },
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    checkPass: _.debounce(async function() {
      const self = this
      const { status, data:{code,msg} } = await self.$axios.post('/user/checkPass',{
        password: CryptoJS.MD5(self.ruleForm.oldPass).toString()
      })
      if(status === 200){
        if(code === 0){
          self.flag = false
          self.checkMsg = msg
          self.check_box.colorRed = false
          self.check_box.colorGreen = true
        }else{
          self.flag = true
          self.checkMsg = msg
          self.check_box.colorRed = true
          self.check_box.colorGreen = false
        }
      }else{
        self.checkMsg = '服务器繁忙！'
      }
      setTimeout(() => {
        self.checkMsg = ''
      }, 3000);
    },500),
    submitForm: function() {
      const self = this
      self.$refs.ruleForm.validate(async (valid) => {
        if(valid){
          const { status, data:{code, msg} } = await self.$axios.post('/user/modifyUserPass',{
            oldPass: CryptoJS.MD5(self.ruleForm.oldPass).toString(),
            newPass: CryptoJS.MD5(self.ruleForm.newPass).toString()
          })
          if(status === 200){
            if(code === 0){
              self.$message({
                message: msg,
                type: 'success',
                duration: 1000
              })
              setTimeout(() => {
                self.$router.push('/exit')
              }, 2000);
            }else{
              self.statusMsg = msg
              setTimeout(() => {
                self.statusMsg = ''
              }, 3000);
            }
          }else{
            self.statusMsg = '服务器繁忙！'
              setTimeout(() => {
                self.statusMsg = ''
              }, 3000);
          }
        }
      })
    },
    resetForm() { 
      const self = this
      this.$refs.ruleForm.resetFields();
      self.checkMsg = ''
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/userInfo/modifyPass.css';
</style>
