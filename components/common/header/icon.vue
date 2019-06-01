<template>
  <div class="header-icon" ondragstart="return false" v-on:click="backIndex">
    <img src="/pic/logo1.png" alt="">
  </div>
</template>

<script>
export default {
  methods: {
    backIndex: function() {
      window.location.href = ("/")
    }
  }
}
</script>

<style>

</style>