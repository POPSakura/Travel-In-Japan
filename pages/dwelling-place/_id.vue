<template>
  <div class="container">
    <NavBar></NavBar>
    <div class="content">
      <div class="area-wrapper">
        <div class="area">
          <dl>
            <dt>区域:</dt>
            <dd>
              <ul>
                <li>
                  <el-button 
                    type="parmary" 
                    size="mini" 
                    v-for="(area, areaIndex) of areaList" 
                    :key="areaIndex"
                    :autofocus="areaIndex === 0"
                    @click="handleClickArea(area.id)">
                    {{ area.name }}
                  </el-button>
                </li>
              </ul>
            </dd>
          </dl>
          <dl>
            <dt>攻略:</dt>
            <dd>
              <ul>
                <li v-for="(intro, introIndex) of currentIntroduction" :key="introIndex">{{ intro }}</li>
              </ul>
            </dd>
          </dl>
        </div>
        <div class="map">
          <Map
            :centerCoordinate="centerCoord"
            :areaCoordinates="areaCoords"
            :panToAreaCoordinate="panToAreaCoord">
          </Map>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="hotel-wrapper">
        <div class="search">
          <div>
            <ul>
              <li>
                <div>
                  <span>住宿类型</span>
                  <el-select v-model="condition.kind" placeholder="请选择" size="small" clearable>
                    <el-option
                      v-for="item in optionList.kindList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </li>
              <li>
                <div>
                  <span>设施</span>
                  <el-select v-model="condition.facility" placeholder="请选择" size="small" clearable>
                    <el-option
                      v-for="item in optionList.facilityList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </li>
              <li>
                <div>
                  <span>品牌</span>
                  <el-select v-model="condition.brand" placeholder="请选择" size="small" clearable>
                    <el-option
                      v-for="item in optionList.brandList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </li>
              <li>
                <div>
                  <span>销量</span>
                  <el-select v-model="salesSort" placeholder="请选择" size="small" clearable>
                    <el-option
                      v-for="item in salesList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </li>
            </ul>
          </div>
          <div>
            <span>
              <span class="number">{{ total }}</span>家酒店
            </span>
            <el-input
              placeholder="搜索关键词"
              prefix-icon="el-icon-search"
              :value="search"
              @input.self="search = $event"
              size="small">
            </el-input>
          </div>
        </div>
        <div class="hotel" v-if="hotelList.length">
          <div v-for="(hotel, hotelIndex) of hotelList" :key="hotelIndex">
            <div class="image">
              <nuxt-link :to="{ name: 'hotel-id', params: { id: hotel.hotel_id } }">
                <img :src="hotel.image" />
              </nuxt-link>
            </div>
            <div class="detail">
              <div class="title">
                <div>
                  <nuxt-link :to="{ name: 'hotel-id', params: { id: hotel.hotel_id } }">{{ hotel.hotel }}</nuxt-link>
                </div>
                <svg class="icon" aria-hidden="true" v-if="hotel.hot ? true : false">
                  <use xlink:href="#icon-bird-xiaoniao"></use>
                </svg>
                <svg class="icon" aria-hidden="true" v-if="hotel.top ? true : false">
                  <use xlink:href="#icon-birdxiaoniao1-copy"></use>
                </svg>
              </div>
              <div class="sub-title">{{ hotel.english_hotel }}</div>
              <div class="about">
                <ul>
                  <li>
                    <el-rate
                      v-model="hotel.grade"
                      disabled
                      show-text
                      text-color="#ff9900"
                      score-template="{value}">
                    </el-rate>
                  </li>
                  <li>
                    <nuxt-link :to="{ name: 'hotel-id', params: { id: hotel.hotel_id } }">
                      <span>{{ hotel.comment_count }}条</span>
                      <span>评价</span>
                    </nuxt-link>
                  </li>
                </ul>
              </div>
              <div class="intro">{{ hotel.introduction }}</div>
              <div class="geo">
                <i class="el-icon-location-outline"></i>
                <span>位于: </span>
                <span>{{ hotel.area }}</span>
              </div>
            </div>
            <div class="map">
              <Map
                :centerCoordinate="{ longitude: hotel.longitude, latitude: hotel.latitude }"
                :mainSiteCoordinate="{ longitude: hotel.longitude, latitude: hotel.latitude, place: hotel.hotel }">
              </Map>
            </div>
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
  </div>
</template>

<script>
import _ from 'lodash'
import NavBar from '@/components/common/NavBar'
import Map from '@/components/common/map'

export default {
  name: 'DwellingPlace',
  data() {
    return {
      cityID: this.$route.params.id,
      centerCoord: {},
      panToAreaCoord: {},
      areaID: 2,
      salesSort: null,
      search: '',
      currentPage: 1,
      pageSize: 10,
      total: 0,
      condition: {
        kind: '',
        facility: '',
        brand: ''
      },
      areaList: [],
      hotelList: [],
      optionList: {},
      salesList: [
        {
          value: 1,
          label: '升序'
        }, {
          value: 0,
          label: '降序'
        }
      ],
      value: 1
    }
  },
  components: {
    NavBar,
    Map
  },
  watch: {
    condition: {
      deep: true,
      handler() {
        this.currentPage = 1
        this.getHotelList()
      }
    },
    salesSort() {
      this.currentPage = 1
      this.getHotelList()
    },
    search: _.debounce(function() {
      this.currentPage = 1
      this.getHotelList()
    }, 1000)
  },
  methods: {
    handleCurrentChange() {
      this.getHotelList()
    },
    handleClickArea(id) {
      this.areaID = id
      this.currentPage = 1
      this.getHotelList()
      this.getConditionList()
      this.panToAreaCoord = {
        latitude: this.areaList.find(area => area.id === this.areaID).latitude,
        longitude: this.areaList.find(area => area.id === this.areaID).longitude
      }
    },
    async getAreaList() {
      const { cityID } = this
      const { data } = await this.$axios.get('/geo/getAreaInfo', { params: { cityID } })
      if (data.code === 0) {
        this.areaList = data.areaList
        this.areaID = this.areaList[0].id
        this.centerCoord = { latitude: this.areaList[0].latitude, longitude: this.areaList[0].longitude }
      } else {
        this.$message.error(data.msg)
      }
    },
    async getHotelList() {
      if (this.hotelList.length) this.hotelList = []
      const { cityID, areaID, currentPage, pageSize, condition, salesSort, search } = this
      const { data } = await this.$axios.get('/geo/getHotelOfArea', { 
        params: Object.assign({}, { 
          cityID, 
          areaID, 
          currentPage, 
          pageSize,
          condition,
          salesSort,
          search }) 
      })
      if (data.code === 0) {
        this.hotelList = data.hotelList
        this.total = data.total
      }
    },
    async getConditionList() {
      const { cityID, areaID } = this
      const { data } = await this.$axios.get('/geo/getConditionInfoOfHotel', {
        params: { cityID, areaID }
      })
      if (data.code !== 0) return
      this.optionList.kindList = data.list.kindList.map(kind => ({ value: kind, label: kind}))
      this.optionList.facilityList = data.list.facilityList.map(kind => ({ value: kind, label: kind}))
      this.optionList.brandList = data.list.brandList.map(kind => ({ value: kind, label: kind}))
    }
  },
  computed: {
    currentIntroduction() {
      return this.areaList.length
        ? this.areaList.find(area => area.id === this.areaID).introduction
        : ''
    },
    areaCoords() {
      return this.areaList.length
        ? this.areaList.map(area => {
          return {
            name: area.name,
            longitude: area.longitude,
            latitude: area.latitude,
            coords: area.paths
          }
        })
        : []
    }
  },
  created() {
    this.getAreaList()
    this.getConditionList()
    this.getHotelList()
  }
}
</script>

<style lang="less" scoped>
@import '@/assets/css/iconfont.css';

@main-font-color: #666666;
@sub-font-color: #999999;
@border-bottom: 1px solid #E4E4E4;

.content {
  color: @main-font-color;
  .area-wrapper {
    padding: 2em 18em;
    display: flex;
    justify-content: space-between;
    border-bottom: @border-bottom;
    background-color: #fafafa;
    dl, dt, dd, ul, li {
      margin: 0;
      padding: 0;
    }
    .area {
      dl {
        display: flex;
        dt {
          margin-right: 2em;
        }
        dd {
          flex: 1;
          overflow: hidden;
          white-space: nowrap;
          ul {
            list-style: none;
          }
        }
      }
      dl:nth-child(1) {
        margin-bottom: 2em;
        dt {
          display: flex;
          align-items: center;
        }
        li {
          display: inline-block;
        }
      }
      dl:nth-child(2) {
        li {
          margin-bottom: 0.4em;
        }
      }
    }
    .map {
      width: 25em;
      height: 16em;
    }
  }
  .hotel-wrapper {
    padding: 0 18em;
    background-color: #ffffff;
    .search {
      padding: 2em 0 0.5em;
      border-bottom: @border-bottom;
      ul {
        list-style: none;
        padding: 1em;
        border: 1px solid #d7d7d7;
        li {
          display: inline-block;
          width: 10em;
          padding: 0.5em 1em;
          border-right: 1px solid #d7d7d7;
          div {
            display: flex;
            flex-direction: column;
          }
        }
      }
      & > div:nth-child(2) {
        display: flex;
        align-items: center;
        & > span {
          margin-right: 0.5em;
          span {
            color: #ff8a00;
            font-size: 1rem;
          }
        }
        & > div {
          width: 10em;
          display: inline-block;
          /deep/ input {
            border: none;
            border-bottom: 1px solid #DCDFE6;
          }
        }
      }
    }
    .hotel {
      & > div {
        padding: 2em 0;
        display: flex;
        border-bottom: @border-bottom;
        .image {
          width: 34%;
          height: 17em;
          img {
            border-radius: 5px;
          }
        }
        .detail {
          width: 33%;
          padding: 0 1.5em;
          .title {
            padding: 0.2em 0;
            display: flex;
            align-items: flex-end;
            font-size: 1.2rem;
            a {
              color: @main-font-color;
              margin-right: 0.3em;
              &:hover {
                text-decoration: underline;
              }
            }
            svg {
              margin-right: 0.3em;
            }
          }
          .sub-title {
            color: @sub-font-color;
          }
          .about {
            ul {
              display: flex;
              align-items: center;
              list-style: none;
              margin: 0;
              padding: 0;
              li {
                padding: 1em 1em 1em 0;
                display: inline-block;
                &:nth-child(2) > a {
                  display: flex;
                  flex-direction: column;
                  padding-left: 1em;
                  border-left: 1px solid #d7d7d7;
                  span:nth-child(1) {
                    font-size: 0.9rem;
                    color: #ff8a00;
                  }
                  span:nth-child(2) {
                    font-size: 0.75rem;
                    color: @sub-font-color;
                  }
                  &:hover {
                    text-decoration: underline;
                  }
                }
              }
            }
          }
          .intro {
            line-height: 1.8em;
          }
          .geo {
            margin-top: 1em;
            font-size: 0.75rem;
            i {
              color: #ff8a00;
              font-weight: bold;
            }
            span:nth-of-type(1) {
              color: @sub-font-color;
            }
          }
        }
        .map {
          width: 33%;
          height: 15em;
          margin-top: 1em;
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
</style>