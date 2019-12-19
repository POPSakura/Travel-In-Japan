<template>
  <div class="container">
    <NavBar></NavBar>
    <div class="content">
      <div class="title-wrapper">
        <h1>热门资讯</h1>
        <div>
          按<el-select v-model="method" placeholder="请选择" size="small" style="width: 100px;">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>排序
        </div>
      </div>
      <div class="list-wrapper">
        <ul>
          <li v-for="(news, index) of newsList" :key="index">
            <div class="image">
              <img :src="news.image" />
            </div>
            <div class="info">
              <div class="main">
                <nuxt-link :to="{ name: 'news-id', params: { id: news.news_id } }">
                  {{ news.title }}
                </nuxt-link>
                <div class="intro">{{ news.content }}</div>
              </div>
              <div class="other">
                <span>{{ news.pubdate | dateFormat }}</span>
                <span>{{ news.scan_count }}次浏览</span>
                <span>{{ news.like_count }}个点赞</span>
              </div>
            </div>
          </li>
        </ul>
        <div class="block">
          <span class="page-count">共{{ total }}条</span>
          <el-pagination
            background
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="pageSize"
            layout="prev, pager, next"
            :total="total">
          </el-pagination>
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
      cityID: this.$route.params.id,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      newsList: [],
      options: [{
        value: 'pubdate',
        label: '发布时间'
      }, {
        value: 'like',
        label: '点赞数'
      }, {
        value: 'scan',
        label: '浏览数'
      }],
      method: 'pubdate'
    }
  },
  components: {
    NavBar
  },
  watch: {
    method() {
      this.getNews()
    }
  },
  methods: {
    handleCurrentChange() {
      this.getNews()
    },
    async getNews() {
      const { cityID, currentPage, pageSize, method } = this
      const { data } = await this.$axios.get('/news/getNews', {
        params: { cityID, currentPage, pageSize, method }
      })
      if (data.code === 0) {
        this.newsList = data.newsList
        this.total = data.total
      } else {
        this.$message.error(data.msg)
      }
    }
  },
  created() {
    this.getNews()
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
  .content {
    padding: 2em 18em 2em;
    .title-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      border-bottom: @border-bottom;
      h1 {
        font-size: 1.7rem;
      }
      & > div {
        div {
          margin: 0 0.5em;
        }
      }
    }
    .list-wrapper {
      padding: 1em 4em;
      ul {
        list-style: none;
        padding: 0;
        margin: 0;
        li {
          padding: 1em 0;
          display: flex;
          border-bottom: @border-bottom;
          .image {
            width: 15em;
          }
          .info {
            flex: 1;
            margin-left: 1em;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .main {
              a {
              padding: 0;
              color: @main-font-color;
              font-size: 1.2rem;
              &:hover {
                text-decoration: underline;
              }
              }
              .intro {
                margin-top: 0.5em;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                /* autoprefixer: ignore next */
                -webkit-box-orient: vertical;
              }
            }
            .other {
              color: @sub-font-color;
              font-size: 0.8rem;
              span {
                margin-right: 1em;
              }
            }
          }
        }
      }
      .block {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-top: 1em;
        .page-count {
          font-size: 0.9em;
          color: #606266;
        }
      }
    }
  }
}
</style>