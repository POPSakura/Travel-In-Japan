<template>
  <div class="login-container">
    <div class="logo-box">
      <img src="/pic/logo2.png" alt="">
    </div>
    <div class="login-box" v-bind:class="{ 'scale' : isdown }">
      <h1 v-bind:class="{ 'goDown' : isdown }">{{LoginWord}}</h1>
      <template v-if="!login_success">
        <div class="form">
          <i class="iconfont">&#xe64d;</i>
          <input type="text" placeholder="请输入用户名" maxlength="25" spellcheck="false" v-model="username">
          <i class="iconfont">&#xe649;</i>
          <input type="password" placeholder="请输入密码" maxlength="25" spellcheck="false" v-model="password">
          <el-button class="button" type="primary" v-on:click="handleClick">登录</el-button>
          <span class="status">{{statusMsg}}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js'
export default {
  layout: 'blank',
  data: function() {
    return {
      login_success: false,
      isdown: false,
      LoginWord: '用户登录',
      username: '',
      password: '',
      statusMsg: ''
    }
  },
  methods: {
    handleClick: function() {
      const self = this
      if(self.username === '' || self.password === ''){
        self.statusMsg = '请完善用户名和密码'
        setTimeout(() => {
          self.statusMsg = ''
        },2000)
      }else{
        self.$axios.post('/user/signin',{
          username: encodeURIComponent(self.username),
          password: CryptoJS.MD5(self.password).toString()
        }).then(({status, data}) => {
          if(status === 200){
            if(data.code === 0){
              self.LoginWord = data.msg
              self.login_success = true
              self.isdown = true
              setTimeout(() => {
                window.location.href = '/'
              },3000)
            }else{
              self.statusMsg = data.msg
              setTimeout(() => {
                self.statusMsg = ''
              },2000)
            }
          }else{
            self.statusMsg = '服务器错误！'
            setTimeout(() => {
              self.statusMsg = ''
            },2000)
          }
        })
      }
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/iconfont.css';
@import '@/assets/css/login.css';
</style>