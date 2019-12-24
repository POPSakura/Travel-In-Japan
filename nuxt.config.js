const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */

  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      // { rel: 'stylesheep', href: 'http://api.map.baidu.com/library/DrawingManager/1.4/src/DrawingManager_min.css' }
    ],
    script: [
      { src: 'http://api.map.baidu.com/api?v=3.0&ak=ebjxadAVx6R3Y7SCBPakE8E6uNThLA84' },
      { src: 'http://api.map.baidu.com/library/CurveLine/1.5/src/CurveLine.min.js' }
      // { src: 'http://api.map.baidu.com/library/DrawingManager/1.4/src/DrawingManager_min.js' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    'element-ui/lib/theme-chalk/reset.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/moment',
    {
      src: '@/plugins/vue-quill-editor',
      ssr: false
    },
    '~plugins/echarts'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // 统一基础 URL，线上环境关闭代理使用他
    // baseURL: 'http://localhost:3000',
    // 是否开启代理
    proxy: true
    // 请求 URL添加前缀
    // prefix: '/api'
    // 跨域请求时是否需要使用凭证
    // credentials: true
    // See https://github.com/nuxt-community/axios-module#options
  },

  // proxy: {
  //   '/api': {
  //     // 目标接口域名
  //     target: 'http://localhost:8080',
  //     pathRewrite: {
  //       // 重写路径
  //       '^/api': '/',
  //       // 表示是否跨域
  //       changeOrigin: true
  //     }
  //   }
  // },

  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/],
    // 防止多次打包
    vendor: ['element-ui', 'axios', 'vue-quill-editor']

    /*
    ** You can extend webpack config here
    */
    // extend(config, ctx) {
    //   // Run ESLint on save
    //   if (ctx.isDev && ctx.isClient) {
    //     config.module.rules.push({
    //       enforce: 'pre',
    //       test: /\.(js|vue)$/,
    //       loader: 'eslint-loader',
    //       exclude: /(node_modules)/
    //     })
    //   }
    // }
  }
}
