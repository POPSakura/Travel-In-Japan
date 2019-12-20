<template>
  <div class="container">
    <NavBar></NavBar>
    <div class="content">
      <div class="title-wrapper">
        <h1>奈良经典行程线路</h1>
      </div>
      <div v-if="lineList.length">
        <div class="line-wrapper" v-for="(line, index) of lineList" :key="index">
          <div class="line">
            <div class="info">
              <div class="detail">
                <div>
                  <h1>
                    <span class="num">{{ index + 1 }}</span>
                    {{ line.line }}
                  </h1>
                  <div>
                    <span>
                      <i class="el-icon-date"></i>
                      游玩时间：<span>{{ line.period }}</span> 
                    </span>
                    <span>
                      <i class="el-icon-star-off"></i>
                      最佳季节：<span>{{ line.the_best_season }}</span>
                    </span>
                  </div>
                </div>
                <div>
                  <span v-for="(place, placeIndex) of line.point" :key="placeIndex">
                    {{ place.name }} 
                    <i 
                      class="iconfont icon-arrow-right"
                      v-if="placeIndex + 1 !== line.point.length">
                    </i>
                  </span>
                </div>
                <div>
                  <div class="tips">
                    <p>Tips</p>
                    <div>{{ line.tips }}</div>
                  </div>
                  <div class="summary">
                    <p>总结</p>
                    <div>{{ line.summary }}</div>
                  </div>
                </div>
              </div>
              <div class="map">
                <Map
                  :centerCoordinate="{
                    latitude: line.point[0].latitude,
                    longitude: line.point[0].longitude,
                    scale: 8
                  }"
                  :lineCoordinates="line.point.map(item => {
                    return {
                      name: item.name,
                      latitude: item.latitude,
                      longitude: item.longitude
                    }
                  })">
                </Map>
              </div>
            </div>
            <div class="dot">
              <p>路线亮点</p>
              <el-carousel :interval="4000" type="card" height="200px">
                <el-carousel-item v-for="(item, index) of line.point" :key="index">
                  <div>
                    <img :src="item.image" />
                    <div class="shadow"></div>
                    <div class="text">
                      <span>{{ item.name }}</span>
                    </div>
                  </div>
                </el-carousel-item>
              </el-carousel>
            </div>
          </div>
        </div>
        <div class="block" v-if="total !== 0">
          <span class="page-count">共{{ total }}条</span>
          <el-pagination
            background
            @current-change="currentPageChange"
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
import Map from '@/components/common/map' 

export default {
  name: 'TouristRoutes',
  data() {
    return {
      cityID: this.$route.params.id,
      currentPage: 1,
      pageSize: 3,
      total: 0,
      lineList: [],
      lineCoords: []
    }
  },
  components: {
    NavBar,
    Map
  },
  methods: {
    currentPageChange() {
      this.getLineList()
    },
    async getLineList() {
      if (this.lineList.length) this.lineList = []
      const { cityID, currentPage, pageSize } = this
      const { data } = await this.$axios.get('/geo/getLineOfCity', {
        params: { cityID, currentPage, pageSize }
      })
      if (data.code === 0) {
        this.lineList = data.lineList
        this.total = data.total
      } else {
        this.$message.error(data.msg)
      }
    }
  },
  created() {
    this.getLineList()
  }
}
</script>

<style lang="less" scoped>
@import '@/assets/css/iconfont.css';

@title-font-color: #333333;
@main-font-color: #666666;
@sub-font-color: #999999;
@border-bottom: 1px solid #E4E4E4;
  
.content {
  background-color: #ffffff;
  color: @main-font-color;
  padding: 2em 0 0;
  .title-wrapper {
    border-bottom: @border-bottom;
    padding: 0 18em 1.5em;
    h1 {
      color: @title-font-color;
      font-size: 1.7rem;
    }
  }
  & > div > .line-wrapper:nth-child(odd) {
    background-color: #ffffff;
  }
  & > div > .line-wrapper:nth-child(even) {
    background-color: #fafafa;
  }
  div {
    .line-wrapper {
      padding: 3em 18em;
      border-bottom: 1px solid #eaeaea;
      .line {
        padding: 2em 2em;
        border: 1px solid #eaeaea;
        box-shadow: 0 1px 3px rgba(0, 0, 0, .1);
        .info {
          display: flex;
          justify-content: space-between;
          padding-bottom: 1em;
          border-bottom: 1px solid #eaeaea;
          .detail {
            width: 64%;
            & > div:nth-child(1) {
              display: flex;
              justify-content: space-between;
              align-items: center;
              h1 {
                margin: 0;
                color: @title-font-color;
                font-size: 1.5rem;
                .num {
                  display: inline-block;
                  width: 1em;
                  height: 1em;
                  background-color: #ff9d00;
                  color: #fff;
                  margin-right: 0.2em;
                  text-align: center;
                  line-height: 1;
                }
              }
              div {
                & > span {
                  display: inline-block;
                  font-size: 0.8rem;
                  padding: 0.3em 0;
                  i {
                    font-size: 1.3rem;
                    vertical-align: middle;
                  }
                  &:nth-child(1) {
                    border-right: 1px solid #eaeaea;
                    padding-right: 1em;
                  }
                  &:nth-child(2) {
                    padding-left: 1em;
                  }
                  & > span {
                    color: @title-font-color;
                  }
                }
              }
            }
            & > div:nth-child(2) {
              padding: 1.5em 0;
              i {
                font-weight: bold;
              }
            }
            & > div:nth-child(3) {
              display: flex;
              justify-content: space-between;
              .tips {
                padding-right: 2em;
                border-right: 1px solid #eaeaea;
                p {
                  color: @title-font-color;
                  font-size: 1.2rem;
                  margin: 0;
                  padding: 0;
                }
                div {
                  margin-top: 0.1em;
                }
              }
              .summary {
                padding-left: 2em;
                p {
                  color: @title-font-color;
                  font-size: 1.2rem;
                  margin: 0;
                  padding: 0;
                }
                div {
                  margin-top: 0.1em;
                }
              }
            }
          }
          .map {
            width: 34%;
            height: 15em;
          }
        }
      }
      .dot {
        padding: 1em 0 0;
        p {
          color: @title-font-color;
          font-size: 1rem;
        }
        .el-carousel__item > div {
          height: 100%;
          position: relative;
          .shadow {
            position: absolute;
            background-color: #000000;
            opacity: 0.2;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }
          .text {
            position: absolute;
            color: #ffffff;
            font-size: 1.3rem;
            bottom: 0.5em;
            left: 1em;
          }
        }
      }
    }
    .block {
      padding: 0 18em 2em;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-top: 1.5em;
      .page-count {
        font-size: 1rem;
        color: #606266;
      }
    }
  }
}
</style>