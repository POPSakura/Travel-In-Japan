<template>
  <el-carousel :interval="10000" arrow="always" height="550px">
    <el-carousel-item v-for="(item, index) of banner" :key="index">
      <img :src="item" alt="">
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  props: {
    banner: {
      type: Array
    }
  }
}
</script>

<style>

</style>