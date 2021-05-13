export default {
  // 配置mongodb
  dbs: 'mongodb://127.0.0.1:27017/JP-Travel',
  // 配置redis
  redis: {
    get host() {
      return '127.0.0.1'
    },
    get port() {
      return 6379
    }
  },
  // 配置smtp服务
  smtp: {
    // 发送邮件主邮箱
    get user() {
      return 'xxxxxxxxx@qq.com'
    },
    // 主邮箱秘钥
    get pass() {
      return 'xxxxxxxxxxxxxx'
    },
    // 邮箱服务主机
    get host() {
      return 'smtp.qq.com'
    },
    // 邮箱服务端口
    get port() {
      return 587
    },
    // 验证码
    get code() {
      return () => {
        return Math.random().toString(16).slice(2, 6).toUpperCase()
      }
    },
    // 验证码有效时间
    get expire() {
      return () => {
        return new Date().getTime() + 1 * 65 * 1000
      }
    }
  }
}
