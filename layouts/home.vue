<template>
  <transition name="default-transition" appear>
    <el-container>
      <el-header height="500px">
        <home-header></home-header>
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
import HomeHeader from '@/components/common/header/index.vue'
import HomeFooter from '@/components/common/footer/index.vue'
export default {
  components: {
    HomeHeader,
    HomeFooter
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
}
.body-margin{
  margin-top: 30px;
}
.default-transition-enter,.default-transition-leave-to{
  opacity: 0;
}
.default-transition-enter-active,.default-transition-leave-active{
  transition: all .5s ease-out;
}
</style>
