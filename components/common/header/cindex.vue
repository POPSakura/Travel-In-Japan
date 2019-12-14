<template>
  <div class="header-container">
    <div class="header-top" style="position: absolute;background-color: rgba(120, 120, 120, 1);">
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
  </div>
</template>

<script>
import Icon from './icon.vue'
import Navbar from './navbar.vue'
import User from './user.vue'
export default {
  name: 'CIndex',
  components: {
    Icon,
    Navbar,
    User,
  }
}
</script>

<style>
@import '@/assets/css/common/header.css';
</style>
