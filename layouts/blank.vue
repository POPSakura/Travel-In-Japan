<template>
  <transition name="blank-transition" appear>
    <nuxt />
  </transition>
</template>

<script>
export default {
  
}
</script>

<style>
.blank-transition-enter,.blank-transition-leave-to{
  opacity: 0;
}
.blank-transition-enter-active,.blank-transition-leave-active{
  transition: all .5s ease-out;
}
</style>