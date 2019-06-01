<template>
  <el-row class="tac">
    <el-col :span="4" :offset="3" class="tac-in">
      <h5>
        <img src="/pic/logo1.png" alt="">
      </h5>
      <el-menu
        default-active="/userInfo/userData"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#757575"
        text-color="#fff"
        active-text-color="#ffd04b"
        :router="true">
        <el-menu-item index="/userInfo/userData">
          <i class="el-icon-menu"></i>
          <span slot="title">用户个人资料</span>
        </el-menu-item>
        <el-menu-item index="/userInfo/userOrder">
          <i class="el-icon-setting"></i>
          <span slot="title">用户订单</span>
        </el-menu-item>
        <el-menu-item index="/userInfo/modifyHead">
          <i class="el-icon-setting"></i>
          <span slot="title">修改头像</span>
        </el-menu-item>
        <el-menu-item index="/userInfo/modifyPass">
          <i class="el-icon-setting"></i>
          <span slot="title">修改密码</span>
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="16" :offset="1">
      <nuxt-child />
    </el-col>
  </el-row>
</template>

<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style scoped>
.tac{
  min-width: 1300px;
  margin-top: 30px;
  min-height: 820px;
}
.tac-in>h5{
  width: 100%;
  background-color: #b3b3b3;
  border-radius: 50px;
  text-align: center;
  padding: 5px 0;
}
.tac-in>h5>img{
  width: 90%;
}
</style>
