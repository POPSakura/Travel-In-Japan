<template>
  <div class="header-container">
    <div>
      <el-row>
        <el-col :span="24">
          <swiper :banner="banner"></swiper>
        </el-col>
      </el-row>
    </div>
    <div class="header-top" ref="head">
      <el-row>
        <el-col :span="4">
          <icon></icon>
        </el-col>
        <el-col :span="16">
          <navbar></navbar>
        </el-col>
        <el-col :span="4">
          <user></user>
        </el-col>
      </el-row>
    </div>
    <div class="header-search">
      <el-row>
        <el-col :span="24">
          <search></search>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Icon from './icon.vue'
import Navbar from './navbar.vue'
import Swiper from './swiper.vue'
import User from './user.vue'
import Search from './search.vue'
export default {
  components: {
    Icon,
    Navbar,
    Swiper,
    User,
    Search
  },
  data: function() {
    return {
      banner: []
    }
  },
  mounted: function() {
    window.addEventListener('scroll',this.handleScroll)
    this.$axios.get('/banner').then(({ data }) => {
      this.banner = data
        .match(/href="\w+.\w+"/g)
        .map(n => `/banner/${n.split('=')[1].replace(/"/g, '')}`)
    })
  },
  methods: {
    handleScroll: function() {
      let top = 1-(350-document.documentElement.scrollTop)/350
      top = (top <= 1) ? 1-(350-document.documentElement.scrollTop)/350 : 1
      this.$refs.head.style.backgroundColor = `rgba(120, 120, 120, ${top})`
    }
  },
  destroyed: function() {
    window.removeEventListener('scroll',this.handleScroll)
  }
}
</script>

<style>
@import '@/assets/css/common/header.css';
</style>
