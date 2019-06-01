<template>
  <div class="register-container">
    <div class="logo-box">
      <img src="/pic/logo2.png" alt="">
    </div>
    <div class="register-box" v-bind:class="{ 'scale' : isdown }">
      <h1 v-bind:class="{ 'goDown' : isdown }">{{RegWord}}</h1>
      <template v-if="!reg_success">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="昵称" prop="username" class="between">
          <el-input v-model="ruleForm.username" placeholder="请输入昵称"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" class="between">
          <el-input v-model="ruleForm.email" placeholder="请输入邮箱"></el-input>
          <el-button size="mini" round @click="sendMsg">{{sendInfo}}</el-button>
          <span class="status">{{statusMsg}}</span>
        </el-form-item>
        <el-form-item label="验证码" prop="code" class="between">
          <el-input v-model="ruleForm.code" maxlength="4" placeholder="请输入验证码"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" class="between">
          <el-input v-model="ruleForm.password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="cpassword" class="between">
          <el-input v-model="ruleForm.cpassword" type="password" placeholder="请再次输入昵称"></el-input>
        </el-form-item>
        <el-form-item class="btn">
          <el-button @click="register">同意以下协议并注册</el-button>
          <div class="error">{{error}}</div>
        </el-form-item>
      </el-form>
      </template>
    </div>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js'
export default {
  layout: 'blank',
  data() {
    return {
      timer: '',
      reg_success: false,
      isdown: false,
      RegWord: '用户注册',
      statusMsg: '',
      error: '',
      sendInfo: '发送验证码',
      ruleForm: {
        username: '',
        email: '',
        code: '',
        password: '',
        cpassword: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入昵称', trigger: 'blur', type: 'string' },
          { min: 5, max: 25, message: '长度在 5 到 25 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur', type: 'email' }
        ],
        password: [
          { required: true, message: '请创建密码', trigger: 'blur'}
        ],
        cpassword: [
          { required: true, message: '请确认密码', trigger: 'blur'},
          {
            validator: (rule,value,callback) => {
              if(value === ''){
                callback(new Error('请再次输入密码'))
              }else if(value != this.ruleForm.password){
                callback(new Error('两次输入的密码不一致'))
              }else{
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    sendMsg: function() {
      const self = this
      let namePass
      let emailPass
      if(self.timer){
        return false
      }
      self.$refs.ruleForm.validateField('username', (valid) => { // 验证通过返回空
        namePass = valid
      })
      if(namePass){
        return false
      }
      self.$refs.ruleForm.validateField('email', (valid) => {
        emailPass = valid
      })
      if(!namePass&&!emailPass){
        self.$axios.post('/user/verify', {
          username: encodeURIComponent(self.ruleForm.username),
          email: self.ruleForm.email
        }).then(({status, data}) => {
          if(status === 200){
            if(data.code === 0){
              let count = 60
              self.statusMsg = data.msg
              self.sendInfo = `还剩余${ count }秒`
              self.timer = setInterval(() => {
                self.sendInfo = `还剩余${ count-- }秒`
                if(count === -1){
                  clearInterval(self.timer)
                  self.timer = ''
                  self.statusMsg = ''
                  self.sendInfo = '发送验证码'
                }
              }, 1000)
            }else{
              self.statusMsg = data.msg
              self.timer = setTimeout(() => {
                clearTimeout(self.timer)
                self.statusMsg = ''
                self.timer = ''
              },2000)
            }
          } else {
            self.statusMsg = '服务器错误！'
          }       
        })
      }
    },
    register: function() {
      const self = this
      self.$refs.ruleForm.validate((valid) => { // 校验通过返回true
        if(valid){
          self.$axios.post('/user/signup', {
            username: encodeURIComponent(self.ruleForm.username),
            password: CryptoJS.MD5(self.ruleForm.password).toString(),
            email: self.ruleForm.email,
            code: self.ruleForm.code
          }).then(({status, data}) => {
            if(status === 200){
              if(data.code === 0){
                self.RegWord = data.msg
                self.reg_success = true
                self.isdown = true
                setTimeout(() => {
                  self.$router.push('/login')
                },3000)
              }else{
                self.error = data.msg
              }
            }else{
              self.error = '服务器错误！'
            }
            setTimeout(() => {
              self.error = ''
            },1500)
          })
        }
      })
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/register.css';
</style>