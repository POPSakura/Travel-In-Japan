<template>
  <div class="container">
    <NavBar></NavBar>
    <div class="content">
      <div class="title-wrapper">
        <h1>奈良经典行程线路</h1>
      </div>
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
            <div class="map"></div>
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
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/common/NavBar'

export default {
  name: 'TouristRoutes',
  data() {
    return {
      lineList: [
        {
          line: '奈良市内经典一日游',
          period: '1天',
          the_best_season: '4月-10月',
          point: [
            { 
              name: '兴福寺', 
              image: 'http://b1-q.mafengwo.net/s11/M00/EA/74/wKgBEFtIXO2AXzaPAApEH4Xeoa499.jpeg?imageMogr2%2Fthumbnail%2F%21270x180r%2Fgravity%2FCenter%2Fcrop%2F%21270x180%2Fquality%2F100',
              latitude: 0,
              longitude: 0
            },
            { 
              name: '平宗柿叶寿司', 
              image: 'http://b1-q.mafengwo.net/s11/M00/EA/74/wKgBEFtIXO2AXzaPAApEH4Xeoa499.jpeg?imageMogr2%2Fthumbnail%2F%21270x180r%2Fgravity%2FCenter%2Fcrop%2F%21270x180%2Fquality%2F100',
              latitude: 0,
              longitude: 0
            },
            { 
              name: '奈良公园', 
              image: 'http://b1-q.mafengwo.net/s11/M00/EA/74/wKgBEFtIXO2AXzaPAApEH4Xeoa499.jpeg?imageMogr2%2Fthumbnail%2F%21270x180r%2Fgravity%2FCenter%2Fcrop%2F%21270x180%2Fquality%2F100',
              latitude: 0,
              longitude: 0 
            },
            { 
              name: '春日荷茶屋', 
              image: 'http://b1-q.mafengwo.net/s11/M00/EA/74/wKgBEFtIXO2AXzaPAApEH4Xeoa499.jpeg?imageMogr2%2Fthumbnail%2F%21270x180r%2Fgravity%2FCenter%2Fcrop%2F%21270x180%2Fquality%2F100',
              latitude: 0,
              longitude: 0
            },
            { 
              name: '奈良町',
              image: 'http://b1-q.mafengwo.net/s11/M00/EA/74/wKgBEFtIXO2AXzaPAApEH4Xeoa499.jpeg?imageMogr2%2Fthumbnail%2F%21270x180r%2Fgravity%2FCenter%2Fcrop%2F%21270x180%2Fquality%2F100', 
              latitude: 0,
              longitude: 0
            }
          ],
          tips: '奈良游玩一日的行程安排居多，当日可往返与京都或大阪的酒店住宿。',
          summary: '路线按景点热度及位置来安排，一天内可游览奈良最热门最具风情的地方。'
        }
      ]
    }
  },
  components: {
    NavBar
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
  & > .line-wrapper:nth-child(even) {
    background-color: #ffffff;
  }
  & > .line-wrapper:nth-child(odd) {
    background-color: #fafafa;
  }
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
          background-color: rgb(252, 64, 64);
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
        background-color: rgb(255, 60, 60);
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
}
</style>