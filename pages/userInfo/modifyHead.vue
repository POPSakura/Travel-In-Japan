<template>
  <div class="userhead-container">
    <h5>修改头像</h5>
    <div class="userhead-in">
      <span>当前头像:</span>
      <img :src="`http://localhost:3000/${$store.state.user.user.head}`" class="avatar">
      <span>点击上传头像:</span>
      <el-upload
        class="avatar-uploader"
        action="http://localhost:3000/user/modifyUserHead"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="`http://localhost:3000/${imageUrl}`" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: ''
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      const self = this
      console.log(res)
      if(res.code === 0){
        self.$message({
          message: res.msg,
          type: 'success'
        })
        self.$store.commit('user/setUserHead', res.head)
        self.imageUrl = res.head
      }else{
        self.$message({
          message: res.msg,
          type: 'error'
        })
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/userInfo/modifyHead.css';
</style>
