<template>
  <transition name="default-transition" appear>
    <el-container>
      <el-header height="50px">
        <other-header></other-header>
      </el-header>
      <el-main class="body-margin">
        <nuxt />
      </el-main>
      <el-footer height="390px">
        <home-footer></home-footer>
      </el-footer>
    </el-container>
  </transition>
</template>

<script>
import HomeFooter from '@/components/common/footer/index.vue'
import OtherHeader from '@/components/common/header/cindex.vue'
export default {
  components: {
    HomeFooter,
    OtherHeader
  },
  mounted() {
    window.onbeforeunload = function(){
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }
  }
}
</script>

<style>
.el-header,.el-footer{
  padding: 0
}
body{
  margin: 0;
  box-sizing: border-box;
  min-width: 1350px;
}
.body-margin{
  margin-top: 29px;
  background-color: rgb(247, 247, 247);
}
.default-transition-enter,.default-transition-leave-to{
  opacity: 0;
}
.default-transition-enter-active,.default-transition-leave-active{
  transition: all .5s ease-out;
}
</style>
