<template>
  <div class="container">
    <div class="content-top">
      <div class="top-in">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>首页</el-breadcrumb-item>
          <el-breadcrumb-item>日本</el-breadcrumb-item>
          <el-breadcrumb-item>奈良</el-breadcrumb-item>
          <el-breadcrumb-item>奈良景点</el-breadcrumb-item>
          <el-breadcrumb-item>奈良公园</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="content">
      <div class="title-wrapper">
        <div class="title">
          <h1>{{ newsInfo.title }}</h1>
          <span>
            <svg class="icon" aria-hidden="true" @click="giveThumbsUp">
              <use xlink:href="#icon-dianzan"></use>
            </svg>
            <span>{{ newsInfo.like_count }}</span>
          </span>
        </div>
        <div class="title_bottom">
          <span>发布时间: {{ newsInfo.pubdate | dateFormat }}</span>
          <span>阅读: {{ newsInfo.scan_count }}</span>
        </div>
      </div>
      <div class="text-wrapper">
        <ul>
          <li v-for="(content, contentIndex) of newsInfo.content" :key="contentIndex">{{ content }}</li>     
        </ul>
      </div>
      <div class="image-wrapper">
        <div class="image" v-for="(image, imageIndex) of newsInfo.image" :key="imageIndex">
          <img :src="image" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/common/NavBar'

export default {
  name: 'TravelNews',
  data() {
    return {
      newsID: this.$route.params.id,
      newsInfo: {}
    }
  },
  components: {
    NavBar
  },
  methods: {
    async getNewsInfo() {
      const { newsID } = this
      const { data } = await this.$axios.get('/news/getNewsInfo', { params: { newsID } })
      if (data.code === 0) this.newsInfo = data.newsInfo
      else this.$message.error(data.msg) 
    },
    async addScanCount() {
      const { newsID } = this
      const { data } = await this.$axios.get('/news/addScanCount', { params: { newsID } })
      if (data.code === -1) this.$message.error(data.msg)
    },
    async giveThumbsUp() {
      const { newsID } = this
      const { data } = await this.$axios.post('/news/like', { newsID })
      if (data.code === 0) {
        this.$message.success(data.msg)
        this.getNewsInfo()
      } 
      else this.$message.error(data.msg) 
    }
  },
  created() {
    this.getNewsInfo()
  },
  mounted() {
    this.addScanCount()
  }
}
</script>

<style lang="less" scoped>
@import '@/assets/css/iconfont.css';

@main-font-color: #666666;
@sub-font-color: #999999;
@border-bottom: 1px solid #E4E4E4;

.container {
  color: @main-font-color;
  .content-top {
    padding: 1em 18em 0;
  }
  .content {
    padding: 2em 18em 2em;
    .title-wrapper {
      margin-top: 2em;
      .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 1em;
        border-bottom: @border-bottom;
        h1 {
          font-size: 1.5rem;
          margin: 0;
        }
        & > span {
          svg {
            vertical-align: middle;
            font-size: 1.4rem;
          }
        }
      }
      .title_bottom {
        margin-top: 0.5em;
        overflow: hidden;
        span {
          margin: 1em 0 1em 1em;
          float: right;
        }
      }
    }
    .image-wrapper {
      margin-top: 0.5em;
      .image {
        padding: 0 10em;
        margin-bottom: 1em;
        height: 30em;
      }
    }
    .text-wrapper {
      margin-top: 0.5em;
      padding: 0 5em;
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
        li {
          padding: 0.5em 0;
          font-size: 1.2rem;
        }
      }
    }
  }
}
</style>