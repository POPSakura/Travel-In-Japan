<template>
  <div class="container">
    <NavBar></NavBar>
    <div class="content"></div>
  </div>
</template>

<script>
import NavBar from '@/components/common/NavBar'

export default {
  name: 'Area',
  data() {
    return {
      cityID: this.$route.params.id
    }
  },
  components: {
    NavBar
  }
}
</script>

<style lang="less" scoped>
</style>