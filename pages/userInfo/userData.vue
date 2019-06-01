<template>
  <div class="userdata-container">
    <h5>个人资料</h5>
    <div class="userdata-in">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <span v-if="isKeep" class="info-box" v-cloak>{{user.username}}</span>
          <el-input v-model="ruleForm.username" placeholder="请输入用户名" v-if="isModify"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <span v-if="isKeep" class="info-box" v-cloak>{{user.sex}}</span>
          <el-radio-group v-model="ruleForm.sex" v-if="isModify">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <span v-if="isKeep" class="info-box" v-cloak>{{user.age}}</span>
          <el-input v-model="ruleForm.age" placeholder="请输入您的年龄" type="number" v-if="isModify"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <span v-if="isKeep" class="info-box" v-cloak>{{user.email}}</span>
          <el-input v-model="ruleForm.email" placeholder="请输入您的邮箱" v-if="isModify"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="telephone">
          <span v-if="isKeep" class="info-box" v-cloak>{{user.telephone}}</span>
          <el-input v-model.number="ruleForm.telephone" placeholder="请输入您的手机号" v-if="isModify"></el-input>
        </el-form-item>
        <el-form-item label="所在城市" prop="city">
          <span v-if="isKeep" class="info-box" v-cloak>{{user.city}}</span>
          <el-input v-model="ruleForm.city" placeholder="请输入所在城市" v-if="isModify"></el-input>
        </el-form-item>
        <el-form-item label="个人签名" prop="sign">
          <span v-if="isKeep" class="info-box" v-cloak>{{user.sign}}</span>
          <el-input
            type="textarea"
            placeholder="请输入个性签名"
            rows="8"
            v-model="ruleForm.sign"
            v-if="isModify">
          </el-input>
        </el-form-item>
        <el-form-item label="注册时间" prop="date">
          <span class="info-box" v-cloak>{{user.date | dateFormat}}</span>
        </el-form-item>
        <div class="btn-class">
          <template v-if="isModify">
            <el-button type="primary" @click="saveForm">保存</el-button>
            <el-button @click="backForm">返回</el-button>
          </template>
          <template v-if="isKeep">
            <el-button type="primary" @click="modifyForm">修改</el-button>
          </template>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('user')
export default {
  data: function() {
    return {
      isModify: false,
      isKeep: true,
      ruleForm: {},
      rules:{
        username: [
          { required: true, message: '请输入用户名', trigger: 'change' },
          { min: 5, max: 25, message: '长度在 5 到 25 个字符', trigger: 'change' }
        ],
        email: [
          { required: true, message: '请输入邮箱号', trigger: 'change' },
          { type: 'email', message: '请输入有效的邮箱', trigger: 'change'}
        ],
        telephone: [
          { 
            validator: (rule, value, callback) => {
              const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
              if(reg.test(value)){
                callback()
              }else{
                callback(new Error('手机号格式不正确！'))
              }
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      'user': state => state.user
    })
  },
  methods: {
    saveForm: function() {
      const self = this
      self.$refs.ruleForm.validate(async (valid) => {
        if(valid){
          const { status, data:{code, msg, user} } = await self.$axios.post('/user/modifyUserData', self.ruleForm)
          if(status === 200){
            if(code === 0){
              self.$message({
                message: msg,
                type: 'success',
                duration:1000
              });
              self.$store.dispatch('user/setUser', user)
              self.isKeep = true
              self.isModify = false
            } else {
              self.$message({
                message: msg,
                type: 'error',
                duration:1000
              });
            }
          }else{
            self.$message({
              message: '服务器错误！',
              type: 'error',
              duration:1000
            });
          }
        }
      })
    },
    backForm: function() {
      this.isKeep = true
      this.isModify = false
      this.ruleForm = {}
      console.log(this.username)
    },
    modifyForm: async function() {
      const self = this
      const {status, data:{code, user}} = await self.$axios.get('/user/getUserData')
      if(status === 200){
        if(code === 0){
          self.ruleForm = user
        }else{
          self.ruleForm = user
        }
      }else{
        self.ruleForm = {
          username: '',
          sex: '',
          age: '',
          email: '',
          telephone: '',
          city: '',
          sign: '',
          date: ''
        }
      }
      self.isKeep = false
      self.isModify = true
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/userInfo/userData.css';
</style>