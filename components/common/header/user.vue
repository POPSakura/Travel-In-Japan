<template>
  <div class="user-box">
    <template v-if="$store.state.user.user.username">
      <div v-on:mouseover="listShow" v-on:mouseleave="listHide">
        <img :src="`${$store.state.user.user.head}`" alt="">
        <span>{{$store.state.user.user.username}}</span>
        <i class="el-icon-arrow-down" style="margin-left: 5px"></i>
      </div>
      <span><i class="el-icon-message"></i></span>
      <transition name="list">
        <ul v-show="flag" v-on:mouseover="enterList" v-on:mouseleave="leaveList">
          <li>
            <nuxt-link to="/userInfo/userData">
              <i class="el-icon-menu" style="margin-right:8px"></i>账户设置
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/userInfo/userOrder">
              <i class="el-icon-tickets" style="margin-right:8px"></i>我的订单
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/exit">
              <i class="el-icon-remove-outline" style="margin-right:8px"></i>退出
            </nuxt-link>
          </li>
        </ul>
      </transition>
    </template>
    <template v-else>
      <nuxt-link to="/login">立即登录</nuxt-link>
      <nuxt-link to="/register">注册</nuxt-link>
    </template>
  </div>
</template>

<script>
export default {
  name: 'User',
  data: function() {
    return {
      flag: false
    }
  },
  methods: {
    listHide: function() {
      let self = this
      self._timer = setTimeout(() => {
        self.flag = false
      },100)
    },
    listShow: function() {
      this.flag = true
    },
    enterList: function() {
      clearTimeout(this._timer)
    },
    leaveList: function() {
      this.flag = false
    }
  }
}
</script>

<style>

</style>