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
      <div>
        <div class="info">
          <div class="title">
            <div>{{ hotelInfo.hotel }}</div>
            <svg class="icon" aria-hidden="true" v-if="hotelInfo.hot ? true : false">
              <use xlink:href="#icon-bird-xiaoniao"></use>
            </svg>
            <svg class="icon" aria-hidden="true" v-if="hotelInfo.top ? true : false">
              <use xlink:href="#icon-birdxiaoniao1-copy"></use>
            </svg>
          </div>
          <div class="sub">
            <div>
              <p class="sub-title">{{ hotelInfo.english_hotel }}</p>
              <p class="address">地址：{{ hotelInfo.address }}</p>
            </div>
            <div>
              <p class="rate">
                <span>{{ hotelInfo.grade }}</span>分
              </p>
              <p class="count">
                <img src="/favicon.ico" />
                <span>{{ hotelInfo.comment_count }}条评论</span>
              </p>
            </div>
          </div>
        </div>
        <div class="image">
          <div class="main-img">
            <img :src="hotelInfo.main_image" />
            <div class="intro">{{ hotelInfo.introduction }}</div>
          </div>
          <div class="sub-img">
            <img v-for="(image, imageIndex) of hotelInfo.sub_image" :key="imageIndex" :src="image" />
          </div>
        </div>
        <div>
          <div class="link">
            <a @click="scrollTo('book')">预定</a>
            <a @click="scrollTo('geo')">位置</a>
            <a @click="scrollTo('plan')">攻略</a>
            <a @click="scrollTo('comment')">点评</a>
            <a @click="scrollTo('nearby')">周边酒店</a>
          </div>
          <div class="button">
            <el-button type="warning" @click="isShowForm = true">我要点评</el-button>
            <el-dialog :title="hotelInfo.hotel" :visible.sync="isShowForm">
              <el-form :model="form" :rules="rules" ref="ruleForm">
                <el-form-item label="总体评价" :label-width="formLabelWidth" required prop="grade">
                  <el-rate 
                    v-model="form.grade" 
                    :texts="['不建议', '有待改善', '还可以', '值得一去', '强烈推荐']"
                    show-text>
                  </el-rate>
                </el-form-item>
                <el-form-item label="内容" :label-width="formLabelWidth" required prop="content">
                  <el-input
                    type="textarea"
                    :rows="3"
                    placeholder="请输入内容，内容不超过10000字"
                    v-model="form.content">
                  </el-input>
                </el-form-item>
                <el-form-item label="上传文件" :label-width="formLabelWidth">
                  <el-upload
                    action="http://www.myrb.com:8080/comment/uploadCommentImage"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible" size="tiny">
                    <img width="100%" :src="dialogImageUrl" alt="">
                  </el-dialog>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="cancel('ruleForm')">取 消</el-button>
                <el-button type="primary" @click="confirm('ruleForm')">确 定</el-button>
              </div>
            </el-dialog>
          </div>
        </div>
      </div>
      <div id="book">
        <table>
          <thead>
            <tr>
              <th>价格来源</th>
              <th>房型</th>
              <th>价格 元/晚</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(room, roomIndex) of hotelInfo.room" :key="roomIndex">
              <td>漫游日本</td>
              <td>{{ room.kind }}</td>
              <td>￥{{ room.price }}</td>
              <td>
                <el-button 
                  type="warning" 
                  size="mini"
                  @click="$router.push({ path: '/hotel/book/commit', query: { 
                    id: $route.params.id,
                    kind: room.kind, 
                    price: room.price } })">
                  立即购买
                </el-button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div id="geo">
        <div class="map-container">
          <Map
            :panToCoordinate="panToCoord"
            :mainSiteCoordinate="mainSiteCoord"
            :siteCoordinates="nearbyPlaceCoords"
            :centerCoordinate="centerCoord">
          </Map>
        </div>
        <div class="around">
          <div class="around-title">附近景点</div>
          <div class="around-list">
            <p v-for="(nearby, nearbyIndex) of hotelInfo.nearby_place" :key="nearbyIndex">
              <nuxt-link :to="{ name: 'hotel-id', params: { id: nearby.place_id } }">
                <span 
                  @mouseenter="panToCoord = { 
                    latitude: nearby.latitude, 
                    longitude: nearby.longitude,
                    place: nearby.place }">
                  {{ nearby.place }}
                </span>
              </nuxt-link>
              <span>500米</span>
            </p>
          </div>
        </div>
        <div class="around">
          <div class="around-title">附近交通</div>
          <div class="around-list">
            <p>
              <nuxt-link to="">
                <span>冰室神社</span>
              </nuxt-link>
              <span>500米</span>
            </p>
          </div>
        </div>
      </div>
      <div id="plan">
        <div class="base">
          <div class="detail">基本信息</div>
          <div>
            入住时间: <span>{{ hotelInfo.enter_time }}</span>
            <span v-if="hotelInfo.enter_time && hotelInfo.enter_time.indexOf('-') === -1">之前</span>
          </div>
          <div>
            离店时间: <span>{{ hotelInfo.leave_time }}</span>
            <span v-if="hotelInfo.leave_time && hotelInfo.leave_time.indexOf('-') === -1">之后</span>
          </div>
          <div>
            酒店规模: <span>{{ hotelInfo.room_count }}</span>
            <span>间客房</span>
          </div>
        </div>
        <div class="facility">
          <div class="detail">主要设施</div>
          <div>
            <ul>
              <li 
                v-for="(item, index) of facilityMap" 
                :key="index"
                :style="{ 
                  color: hotelInfo.facilities && hotelInfo.facilities.includes(item.name) ? '#333333' : '#cccccc',
                  textDecoration: hotelInfo.facilities && hotelInfo.facilities.includes(item.name) ? 'none' : 'line-through'
                }">
                <i :class="item.icon">
                </i>
                {{ item.name }}
              </li>
            </ul>
          </div>
        </div>
        <div class="concern">
          <div class="detail">酒店攻略</div>
          <ul>
            <li>必读</li>
            <li v-for="(concern, concernIndex) of hotelInfo.concerns" :key="concernIndex">{{ concern }}</li>
          </ul>
        </div>
        <div class="brand">
          <div class="detail">品牌信息</div>
          <span>{{ hotelInfo.brand }}</span>
        </div>
      </div>
      <div class="comment-wrapper" id="comment">
        <div class="title">
          <span>酒店点评 (共有{{ hotelInfo.comment_count }}条真实评价)</span>
        </div>
        <div class="comment-list">
          <div class="comment" v-for="(item, commentIndex) of commentList" :key="commentIndex">
            <div class="user">
              <img :src="item.head" />
            </div>
            <div class="comment-info">
              <div>
                <div>
                  <span>{{ item.user }}</span>
                  <el-rate
                    v-model="item.grade"
                    disabled
                    text-color="#ff9900"
                    score-template="{value}">
                  </el-rate>
                </div>
                <span>
                  <svg class="icon" aria-hidden="true" @click="giveThumbsUp(item.comment_id)">
                    <use :xlink:href="item.like_status ? '#icon-dianzan' : '#icon-zan'"></use>
                  </svg>
                  <span>{{ item.like_count }}</span>
                </span>
              </div>
              <div>
                {{ item.content }}
              </div>
              <div>
                <img v-for="(image, imageIndex) of item.images" :key="imageIndex" :src="image" />
              </div>
              <div>
                <span>{{ item.pubdate | dateFormat }}</span>
                <span @click="showText(commentIndex)">评论</span>
              </div>
              <div>
                <ul>
                  <li v-for="(reply, replyIndex) of item.reply" :key="replyIndex">
                    <img :src="reply.head" />
                    {{ reply.user }}
                    <span>：{{ reply.content }}</span>
                    <br />
                    <span>{{ reply.pubdate | dateFormat }}</span>
                  </li>
                </ul>
              </div>
              <div :ref="`reply-${commentIndex}`">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  placeholder="发表评论:"
                  v-model="textarea">
                </el-input>
                <el-button size="mini" @click="clear">取消</el-button>
                <el-button type="warning" size="mini" @click="submit(item.comment_id)">提交</el-button>
              </div>
            </div>
          </div>
        </div>
        <div class="block" v-if="total !== 0">
          <span class="page-count">共{{ total }}条</span>
          <el-pagination
            background
            @current-change="getComment"
            :current-page.sync="currentPage"
            :page-size="pageSize"
            layout="prev, pager, next"
            :total="total">
          </el-pagination>
        </div>
        <div class="status" v-else>{{ noDataWord }}</div>
      </div>
      <div id="nearby">
        <h2>周边酒店推荐</h2>
        <div class="hotel">
          <nuxt-link 
            v-for="(hotel, idx) of hotelInfo.nearby_hotel"
            :key="idx" 
            :to="{ name: 'hotel-id', params: { id: hotel.hotel_id } }" 
            class="near-hotel">
            <div class="shadow"></div>
            <img :src="hotel.image" />
            <span class="rate">{{ hotel.grade }}分</span>
            <div>
              <p class="title">{{ hotel.hotel }}</p>
              <p class="sub-title">{{ hotel.english_hotel }}</p>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Map from '@/components/common/map'

export default {
  name: 'Hotel',
  data() {
    return {
      hotelID: this.$route.params.id,
      // 酒店信息
      hotelInfo: {},
      centerCoord: {},
      mainSiteCoord: {},
      nearbyPlaceCoords: [],
      panToCoord: {},
      facilityMap: [
        { name: 'wifi服务', icon: 'iconfont icon-wifizhuanhuan' },
        { name: '电梯', icon: 'iconfont icon-dianti' },
        { name: '吹风机', icon: 'iconfont icon-chuifengji' },
        { name: '餐厅', icon: 'iconfont icon-canting' },
        { name: '免费停车场', icon: 'iconfont icon-mianfeitingchechang' },
        { name: '收费停车场', icon: 'iconfont icon-shoufeitingchechang' },
        { name: '行李寄存', icon: 'iconfont icon-hangli' },
        { name: '热水壶', icon: 'iconfont icon-dianreshuihu' },
        { name: '免费瓶装水', icon: 'iconfont icon-shuiping' },
        { name: '免费wifi', icon: 'iconfont icon-mianfeiwifi' },
      ],
      dialogImageUrl: '',
      dialogVisible: false,
      isShowForm: false,
      formLabelWidth: '80px',
      form: {
        grade: 0,
        content: '',
        images: []
      },
      rules: {
        grade: [
          { type: 'number', required: true, message: '请评分', trigger: 'change' }
        ],
        content: [
          { required: true, message: '请输入评价', trigger: 'blur' },
          { min: 1, max: 10000, message: '长度在 0 到 10000 个字符', trigger: 'blur' }
        ]
      },
      textarea: '',
      currentPage: 1,
      pageSize: 15,
      total: 0,
      noDataWord: '',
      commentList: []
    }
  },
  components: {
    Map
  },
  methods: {
    // 锚点平滑移动
    scrollTo(text) {
      const dom = document.getElementById(text)
      const top = dom.offsetTop
      window.scrollTo({
        top: top,
        behavior: 'smooth',
      })
    },
    // 取消上传图片
    async handleRemove(file, fileList) {
      const { data } = await this.$axios.post('/comment/removeCommentImage', {
        path: file.response.rePath
      })
      if(data.code === 0){
        const index = this.form.images.findIndex(image => image === file.response.rePath)
        this.form.images.splice(index, 1)
        this.$message({
          message: data.msg,
          type: 'success'
        })
      }else{
        this.$message({
          message: data.msg,
          type: 'error'
        })
      }
    },
    // 取消上传图片
    removeAllImage(path) {
      return new Promise(async (resolve, reject) => {
        const { data } = await this.$axios.post('/comment/removeCommentImage', {
          path
        })
        if(data.code === 0){
          resolve()
        }else{
          this.$message({
            message: data.msg,
            type: 'error'
          })
        }
      })
    },
    // 评论图片预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 图片上传限制
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    // 图片上传成功执行
    handleAvatarSuccess(res, file) {
      const self = this
      if(res.code === 0){
        const { rePath: path } = res
        self.$message({
          message: res.msg,
          type: 'success'
        })
        self.form.images.push(path)
      }else{
        self.$message({
          message: res.msg,
          type: 'error'
        })
      }
    },
    // 取消评论
    cancel(formName) {
      this.form.images.forEach(async image => {
        await this.removeAllImage(image)
      })
      this.$refs[formName].resetFields()
      this.form.images = []
      this.isShowForm = false
    },
    // 提交评论
    confirm(formName) {
      const { hotelID } = this
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const { data } = await this.$axios.post('/comment/addCommentOfHotel', Object.assign(this.form, { hotelID }))
          if (data.code === 0) {
            this.$message({
              message: data.msg,
              type: 'success'
            })
            this.getComment()
          } else if (data.code === -1) {
            this.$message({
              message: data.msg,
              type: 'error'
            })
            this.form.images.forEach(async image => {
              await this.removeAllImage(image)
            })
          } else {
            this.$message({
              message: data.msg,
              type: 'error'
            })
            this.form.images.forEach(async image => {
              await this.removeAllImage(image)
            })
          }
          this.$refs[formName].resetFields()
          this.form.images = []
          this.isShowForm = false
        } else {
          this.$message({
            message: '请完善必填项！',
            type: 'error'
          })
        }
      })
    },
    // 展开回复框
    showText(index) {
      this.textarea = ''
      Object.values(this.$refs).filter(ref => ref.length).forEach(ref => ref[0].style.display = 'none')
      this.$refs[`reply-${index}`][0].style.display = 'block'
    },
    // 取消回复
    clear() {
      this.textarea = ''
      Object.values(this.$refs).filter(ref => ref.length).forEach(ref => ref[0].style.display = 'none')
    },
    // 提交回复
    async submit(commentID) {
      if (this.textarea === '') {
        this.$message({
          message: '内容不能为空！',
          type: 'error'
        })
        return false
      }
      const { data } = await this.$axios.post('/comment/addReply', {
        commentID,
        content: this.textarea
      })
      if (data.code === 0) {
        this.$message({
          message: data.msg,
          type: 'success'
        })
        this.getComment()
      } else if (data.code === -1) {
        this.$message({
          message: result.data.msg,
          type: 'error'
        })
      } else {
        this.$message({
          message: result.data.msg,
          type: 'error'
        })
      }
      this.textarea = ''
      Object.values(this.$refs).filter(ref => ref.length).forEach(ref => ref[0].style.display = 'none')      
    },
    // 点赞
    async giveThumbsUp(commentID) {
      const { data } = await this.$axios.post('/comment/like', { commentID })
      if (data.code === 0) {
        this.$message({
          message: data.msg,
          type: 'success'
        })
        this.getComment()
      } else if (data.code === -1) {
        this.$message({
          message: data.msg,
          type: 'error'
        })
      } else {
        this.$message({
          message: data.msg,
          type: 'error'
        })
      }
    },
    // 根据当前页码发送请求获取评论数据
    async getComment() {
      const { hotelID, currentPage, pageSize } = this
      const { data } = await this.$axios.get('/comment/getCommentOfHotel', {
        params: { hotelID, currentPage, pageSize }
      })
      if (data.code === 0) {
        this.total = data.total
        this.commentList = data.commentList
      } else if (data.code === -1) {
        this.total = data.total
        this.noDataWord = data.msg
      } else {
        this.$message({
          message: data.msg,
          type: 'error'
        })
      }
    },
    // 获取酒店信息
    async getHotelInfo() {
      const { hotelID } = this
      const { data } = await this.$axios.get('/geo/getHotelInfo', {
        params: { hotelID }
      })
      this.hotelInfo = data.hotelInfo
      const { hotel: label, latitude, longitude } = this.hotelInfo
      this.mainSiteCoord = { label, latitude, longitude }
      this.centerCoord = { latitude, longitude }
      this.nearbyPlaceCoords = this.hotelInfo.nearby_place.map(place => {
        return {
          place: place.place,
          latitude: place.latitude,
          longitude: place.longitude
        }
      })
    }
  },
  created() {
    this.getHotelInfo()
    this.getComment()
  }
}
</script>

<style lang="less" scoped>
@import '@/assets/css/iconfont.css';
@border-bottom: 1px solid #E4E4E4;
@main-font-color: #666666;
@sub-font-color: #999999;
@title-font-color: #333333;
@orange: #ff9d00;

/deep/ .el-dialog__body {
  padding: 30px 60px;
}
/deep/ .el-form-item {
  margin-bottom: 10px;
}
/deep/ .el-upload-list__item {
  width: 8em;
  height: 8em;
}
/deep/ .el-upload--picture-card {
  width: 8em;
  height: 8em;
  line-height: 8em;
}
/deep/ .el-dialog {
  min-width: 800px;
}

p {
  margin: 0;
  padding: 0;
}
.container {
  background-color: #ffffff;
  .content-top {
    padding: 1em 18em 0;
  }
  .content {
    & > div:nth-child(1) {
      padding: 2em 18em 0;
      border-bottom: @border-bottom;
      box-shadow: 0 2px 4px rgba(0,0,0,.1);
      .info {
        .title {
          padding: 0.2em 0;
          display: flex;
          align-items: flex-end;
          font-size: 1.5rem;
          div {
            color: @title-font-color;
            margin-right: 0.3em;
          }
          svg {
            margin-right: 0.3em;
          }
        }
        .sub {
          display: flex;
          justify-content: space-between;
          & > div:nth-child(1) {
            .sub-title {
              color: @main-font-color;
            }
            .address {
              font-size: 0.75rem;
              color: @sub-font-color
            }
          }
          & > div:nth-child(2) {
            color: @main-font-color;
            display: flex;
            p {
              margin: 0.5em 0;
              line-height: normal;
              &:nth-child(1) {
                padding-right: 1em;
                border-right: @border-bottom;
              }
              &:nth-child(2) {
                padding-left: 1em;
              }
            }
            .rate {
              span {
                font-size: 2rem;
                color: @orange;
              }
            }
            .count {
              display: flex;
              align-items: flex-end;
              img {
                width: 1.3em;
                height: 1.3em;
              }
            }
          }
        }
      }
      .image {
        display: flex;
        justify-content: space-between;
        .main-img {
          width: 66%;
          height: 27em;
          position: relative;
          img {
            border-radius: 5px;
          }
          .intro {
            position: absolute;
            cursor: pointer;
            width: 18em;
            padding: 1em 0.5em;
            bottom: 1em;
            left: 1em;
            background-color: rgba(0, 0, 0, .75);
            color: #ffffff;
          }
        }
        .sub-img {
          width: 33%;
          height: 27em;
          img {
            width: 48%;
            height: 8.5em;
            padding: 0.15em 0;
            border-radius: 5px;
          }
          & > img:nth-child(odd) {
            margin-right: 0.2em;
          }
          & > img:nth-child(even) {
            margin-left: 0.2em;
          }
        }
      }
      & > div:nth-child(3) {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .link {
          cursor: pointer;
          display: flex;
          align-items: center;
          margin-top: 1em;
          & > a {
            font-size: 1rem;
            color: @title-font-color;
            padding: 1em 1.5em;
          }
        }
        .button {
          /deep/ .el-rate {
            line-height: 40px;
            i {
              line-height: 40px;
            }
          }
        }
      }
    }
    & > div:nth-child(2) {
      padding: 4em 18em 4em;
      border-bottom: @border-bottom;
      table {
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
        border: 1px solid #e5e5e5;
        thead {
          tr {
            background-color: #f4f4f4;
            border-bottom: 1px solid #cccccc;
            th {
              padding: 1em 0;
            }
          }
        }
        tbody {
          tr {
            border-bottom: 1px dashed #e5e5e5;
            td {
              text-align: center;
              padding: 1em 0;
              &:nth-child(3) {
                color: @orange;
                font-weight: bold;
                font-size: 1.3rem;
              }
            }
          }
        }
      }
    }
    & > div:nth-child(3) {
      padding: 4em 18em 0;
      display: flex;
      justify-content: space-between;
      .map-container {
        height: 20em;
        width: 51%;
      }
      .around {
        width: 22.5%;
        height: 20em;
        border: 1px solid #eee;
        display: flex;
        flex-direction: column;
        .around-title {
          padding: 1em;
          text-align: center;
          font-size: 1rem;
          border-bottom: 1px solid #eee;
          background-color: #f8f8f8;
        }
        .around-list {
          overflow: auto;
          p {
            display: flex;
            justify-content: space-between;
            line-height: normal;
            margin: 0;
            padding: 1.5em;
            border-bottom: 1px dashed #eee;
            color: #666666;
            a {
              color: #666666;
            }
            a:hover {
              text-decoration: underline;
            }
          }
        }
      }
    }
    & > div:nth-child(4) {
      padding: 2em 18em 0;
      color: @main-font-color;
      & > div {
        padding: 1.5em 0;
        border-bottom: 1px solid #ccc;
      }
      ul {
        padding: 0;
        margin: 0;
        list-style: none;
      }
      .detail {
        width: 6em;
        font-size: 1rem;
        margin-right: 3em;
      }
      .base {
        display: flex;
        align-items: center;
        & > div:not(:nth-child(1)) {
          margin-right: 1em;
          & > span:nth-child(1) {
            font-size: 1.2rem;
            color: @title-font-color;
          }
        }
      }
      .facility {
        display: flex;
        & > div:nth-child(2) {
          flex: 1;
          ul {
            li {
              display: inline-block;
              width: 12em;
              margin-bottom: 0.5em;
            }
          }
        }
      }
      .concern {
        display: flex;
        ul {
          li {
            margin-bottom: 0.5em;
          }
        }
      }
      .brand {
        display: flex;
        align-items: center;
      }
    }
    .comment-wrapper {
      padding: 0 18em 2em;
      color: @main-font-color;
      border-bottom: @border-bottom;
      .title {
        padding: 2.5em 0 1.5em;
        display: flex;
        flex-direction: column;
        span {
          font-size: 1.3rem;
          margin-bottom: 0.2em;
        }
      }
      .comment-list {
        border-top: 1px solid #E4E4E4;
        & > .comment:last-child {
          border-bottom: @border-bottom;
        }
        .comment {
          display: flex;
          padding: 2em 0 1em 2em;
          border-bottom: 1px dashed #dedede;
          .user {
            width: 5em;
            img {
              width: 3.5em;
              height: 3.5em;
              display: inline-block;
              border-radius:100%;
            }
          }
          .comment-info {
            width: 100%;
            & > div:nth-child(1) {
              display: flex;
              justify-content: space-between;
              & > div {
                margin-bottom: 0.2em;
                color: @orange;
                font-size: 0.9rem;
                display: flex;
                align-items: center;
              }
              svg {
                font-size: 1rem;
              }
            }
            & > div:nth-child(2) {
              font-size: 0.9rem;
              line-height: 1.5rem;
              color: #666666;
              margin-bottom: 0.5em;
            }
            & > div:nth-child(3) {
              height: 9em;
              width: 100%;
              img {
                width: 24%;
                margin: 0.25em;
              }
            }
            & > div:nth-child(4) {
              display: flex;
              justify-content: space-between;
              padding: 0.8em 0;
              font-size: 0.75rem;
              span:first-child {
                color: #999999;
              }
              span:last-child {
                cursor: pointer;
                color: @orange;
              }
            }
            & > div:nth-child(5) {
              border-top: 1px solid #E4E4E4;
              ul {
                list-style: none;
                margin: 0;
                padding-left: 0.5em;
                li {
                  padding: 0.5em 1.5em;
                  font-size: 0.8rem;
                  img {
                    float: left;
                    height: 1.2em;
                    width: 1.2em;
                    margin-left: -1.5em;
                    margin-right: 0.5em;
                  }
                  span:nth-of-type(2) {
                    margin-top: 0.5em;
                    display: inline-block;
                    font-size: 0.75rem;
                    color: #999999;
                  }
                }
              }
            }
            & > div:nth-child(6) {
              overflow: hidden;
              display: none;
              button {
                float: right;
                margin-top: 0.5em;
              }
              button:nth-of-type(2) {
                margin-right: 0.5em;
              }
            }
          }
        }
      }
      .block {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-top: 1.5em;
        .page-count {
          font-size: 1rem;
          color: #606266;
        }
      }
      .status {
        padding: 2em;
        text-align: center;
        font-size: 1.2rem;
        font-weight: bold;
      }
    }
    & > div:nth-child(6) {
      padding: 2em 18em 5em;
      h2 {
        font-size: 1.6rem;
        text-align: center;
        padding: 1em 0;
      }
      .hotel {
        display: flex;
        .near-hotel {
          width: 17em;
          height: 17em;
          position: relative;
          margin-right: 0.5em;
          img {
            border-radius: 5px;
          }
          .shadow {
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: #000000;
            opacity: 0.2;
          }
          .rate {
            position: absolute;
            top: 0.6em;
            left: 0.6em;
            color: #ffffff;
            border-radius: 5px;
            font-size: 1.2rem;
            padding: 0.1em 0.5em;
            background-color: rgba(0, 0, 0, 0.5);
          }
          & > div:nth-of-type(2) {
            position: absolute;
            bottom: 0.6em;
            left: 0.6em;
            color: #ffffff;
            .title {
              line-height: normal;
            }
            .sub-title {
              line-height: normal;
              font-size: 0.85rem;
            }
          }
        }
      }
    }
  }
}
</style>