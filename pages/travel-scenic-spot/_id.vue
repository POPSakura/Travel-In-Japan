<template>
  <div class="container">
    <NavBar></NavBar>
    <div class="content">
      <div class="content-intro">
        <h1>景点概况</h1>
        <div class="intro-wrapper">
          <p v-if="isShowDetail">{{ areaInfo.city_introduction }}</p>
          <div v-else>
            <p class="intro-text-short">{{ areaInfo.city_introduction }}</p>
            <el-button type="warning" size="mini" round @click="() => isShowDetail = true">展开更多</el-button>
          </div>
        </div>
      </div>
      <div class="content-top-level">
        <h1>必游景点TOP5</h1>
        <div class="top-level-wrapper" v-for="(item, index) of areaInfo.top_places" :key="index">
          <div class="top-info">
            <p>
              <span class="info-name">
                <span class="info-num">{{ index + 1 }}</span>
                <nuxt-link :to="{ name: 'place-id', params: { id: item.place_id } }">{{ item.place }}</nuxt-link>
              </span>
              <nuxt-link :to="{ name: 'place-id', params: { id: item.place_id } }" class="info-comment-count">{{ item.comment_count }}条点评</nuxt-link>
            </p>
            <p>{{ item.place_introduction }}</p>
            <p v-show="item.place_inside_places.length">这里还包含景点：
              <nuxt-link 
                v-for="(child, idx) of item.place_inside_places"
                :key="idx"
                :to="{ name: 'place-id', params: { id: child.place_id } }">{{ child.place }}
              </nuxt-link>
            </p>
          </div>
          <div class="top-img">
            <div class="main-img">
              <nuxt-link :to="{ name: 'place-id', params: { id: item.place_id } }">
                <img :src="item.images[0]" />
              </nuxt-link>
            </div>
            <div class="sub-img">
              <nuxt-link :to="{ name: 'place-id', params: { id: item.place_id } }">
                <img :src="item.images[1]" />
              </nuxt-link>
              <nuxt-link :to="{ name: 'place-id', params: { id: item.place_id } }">
                <img :src="item.images[2]" />
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
      <div class="content-hot">
        <h1>热门景点</h1>
        <div class="hot-wrapper">
          <div class="hot-top">
            <div class="hot-item" @mouseenter="mouseEnter" @mouseleave="mouseLeave" v-for="(item, index) of areaInfo.hot_places" :key="index">
              <nuxt-link 
                :to="{ name: 'place-id', params: { id: item.place_id } }">
                <img :src="item.image" />
                <div class="hot-title">{{ item.place }}</div>
                <div class="shadow-info">
                  <div>
                    <span>{{ item.place }}</span>
                    <p>{{ item.place_introduction }}</p>
                  </div>
                </div>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
      <div class="content-all">
        <h2>奈良全部景点</h2>
        <div class="all-place-wrapper">
          <ul>
            <li v-for="(item, index) of placeList" :key="index">
              <nuxt-link :to="{ name: 'place-id', params: { id: item.place_id } }">
                <img :src="item.image" />
                <p>{{ item.place }}</p>
              </nuxt-link>
            </li>
          </ul>
        </div>
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
  name: 'TravelScenicSpot',
  data() {
    return {
      cityID: this.$route.params.id,
      areaInfo: {},
      placeList: [],
      isShowDetail: false,
      currentPage: 1,
      pageSize: 10,
      total: 0
    }
  },
  components: {
    NavBar
  },
  methods: {
    // 获取当前城市的景点
    async handleCurrentChange() {
      const { cityID, currentPage, pageSize } = this
      const { data } = await this.$axios.get('/geo/getPlaceOfCity', {
        params: { cityID, currentPage, pageSize }
      })
      if (data.code === 0) {
        this.placeList = data.placeList
        this.total = data.total
      }
      else this.$message.error(data.msg)
    },
    mouseEnter(e) {
      e.target.children[0].children[1].style.visibility = 'hidden'
      e.target.children[0].children[2].style.top = 0
      e.target.children[0].children[2].style.transition = 'top 0.5s ease 0s'
    },
    mouseLeave(e) {
      e.target.children[0].children[1].style.visibility = 'visible'
      e.target.children[0].children[2].style.top = '100%'
      e.target.children[0].children[2].style.transition = 'top 0.5s ease 0s'
    }
  },
  async created() {
    const { cityID, currentPage, pageSize } = this
    Promise.all([
      this.$axios.get('/geo/getCityInfo', { params: { cityID } }),
      this.$axios.get('/geo/getPlaceOfCity', {
        params: { cityID, currentPage, pageSize }
      })
    ]).then(([info_one, info_two]) => {
      if (info_one.data.code === 0) this.areaInfo = info_one.data.areaInfo
      else this.$message.error(data.msg)
      if (info_two.data.code === 0) {
        this.placeList = info_two.data.placeList
        this.total = info_two.data.total
      }
      else this.$message.error(info_two.data.msg)
    })
  }
}
</script>

<style lang="less" scoped>
@import '@/assets/css/iconfont.css';

@border-bottom: 1px solid #E4E4E4;

.container {
  background-color: #fafafa;
  .content {
    h1 {
      color: #000000;
    }
    .content-intro {
      padding: 3em 18em 1em;
      border-bottom: @border-bottom;
      .intro-wrapper {
        margin-top: 1.4em;
        font-size: 1rem;
        overflow: hidden;
        color: #666666;
        .intro-text-short {
          display: -webkit-box;
          // 会被打包的postCSS这个插件去掉，添加注释
          /* autoprefixer: ignore next */
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          word-break: break-all;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        button {
          float: right;
        }
      }
    }
    .content-top-level {
      padding: 3em 18em;
      border-bottom: @border-bottom;
      background-color: #ffffff;
      & > .top-level-wrapper:first-of-type {
        padding-bottom: 2em;
        padding-top: 0;
        border-bottom: @border-bottom;
      }
      & > .top-level-wrapper {
        padding: 3em 0 1em;
        border-bottom: @border-bottom;
      }
      & > .top-level-wrapper:last-of-type {
        padding-top: 3em;
        padding-bottom: 0;
        border-bottom: none;
      }
      .top-level-wrapper {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        height: 20em;
        border-bottom: @border-bottom;
        .top-info {
          width: 38%;
          padding: 5em 0;
          & > p:nth-child(1) {
            display: flex;
            justify-content: space-between;
            align-items: center;
            a {
              color: #ff9d00;
            }
            .info-num {
              display: inline-block;
              margin-right: 1em;
              width: 1.4em;
              height: 1.4em;
              border-radius: 2px;
              background-color: #ff9d00;
              text-align: center;
              color: #fff;
              font-size: 1rem;
              line-height: 1.4em;
            }
            .info-name {
              font-size: 1.1rem;
              display: flex;
              align-items: center;
              color: #ff9d00;
            }
            .info-comment-count {
              font-size: 0.75rem;
              color: #ff9d00;
            }
          }
          & > p:nth-child(2) {
            font-size: 1rem;
            color: #666666;
          }
          & > p:nth-child(3) {
            font-size: 0.9rem;
            color: #999999;
            a {
              color: #ff9d00;
            }
          }
        }
        .top-img {
          display: flex;
          width: 58%;
          height: 18em;
          .main-img {
            margin-right: 0.8em;
          }
          .sub-img {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            a {
              height: 8.5em;
              img {
                height: 100%;
              }
            }
          }
        }
      }
    }
    .content-hot {
      padding: 3em 18em 4em;
      border-bottom: @border-bottom;
      background-color: #f7f7f7;
      .hot-wrapper {
        .hot-top {
          height: 23em;
          margin-bottom: 3em;
          .hot-item {
            display: inline-block;
            width: 24%;
            height: 12em;
            margin: 0.5em 0.5em 0 0;
            position: relative;
            overflow: hidden;
            .hot-title {
              position: absolute;
              bottom: 0;
              left: 0;
              width: 100%;
              font-size: 1rem;
              padding: 0.7em 1em;
              background: linear-gradient(to bottom,rgba(0,0,0,0) 0,rgba(0,0,0,0.8) 100%);
              color: #ffffff;
            }
            .shadow-info {
              position: absolute;
              top: 100%;
              left: 0;
              width: 100%;
              height: 100%;
              background-color: rgba(0, 0, 0, 0.5);
              display: flex;
              flex-direction: column;
              justify-content: center;
              & > div {
                padding: 0 1em;
                color: #ffffff;
                & > span {
                  font-size: 1.1rem;
                }
              }
            }
          }
          & > .hot-item:nth-child(4n) {
            margin-right: 0;
          }
        }
      }
    }
    .content-all {
      padding: 3em 18em 4em;
      border-bottom: 1px solid #E4E4E4;
      background-color: #ffffff;
      .all-place-wrapper {
        margin-top: 1em;
        ul {
          list-style: none;
          overflow: hidden;
          margin: 0;
          padding: 0;
          li {
            display: inline-block;
            margin: 1em 0.29em 0 0;
            border: 1px solid #eeeeee;
            width: 19%;
            p {
              margin: 0;
              padding: 0.5em 0;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 1em;
              color: #000000;
            }
            &:hover p{
              color: #ff9d00;
            }
          }
          & > li:nth-child(5n) {
            margin-right: 0;
          }
        }
      }
      .block {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-top: 2em;
        .page-count {
          font-size: 0.9em;
          color: #606266;
        }
      }
    }
  }
}
</style>