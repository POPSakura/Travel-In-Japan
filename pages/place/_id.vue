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
        <div>
          <p>{{ placeInfo.place }}</p>
          <p>{{ placeInfo.english_place }}</p>
        </div>
        <div>
          <div>
            <a @click="scrollTo('info')">概况</a>
            <a @click="scrollTo('comment')">景点评价<span> ({{ placeInfo.comment_count }}条评价) </span></a>
            <a @click="scrollTo('hot')">热门推荐</a>
          </div>
          <el-button type="warning" @click="isShowForm = true">我要点评</el-button>
          <el-dialog :title="placeInfo.place" :visible.sync="isShowForm">
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
    <div class="content">
      <div class="image-wall-wrapper" id="info">
        <div class="image-wall">
          <div class="main-img">
            <img :src="placeInfo.main_img" />
          </div>
          <div class="sub-img">
            <img v-for="(imgSrc, imgIndex) of placeInfo.sub_img" :key="imgIndex" :src="imgSrc" />
          </div>
        </div>
      </div>
      <div class="info-wrapper">
        <div class="info-point">
          <ul>
            <li v-for="(concern, concernIndex) of placeInfo.concerns" :key="concernIndex">{{ concern }}</li>
          </ul>
        </div>
        <div class="info-other">
          <div class="info-row">
            <div>
              <span>电话</span>
              <span>{{ placeInfo.telephone }}</span>
            </div>
            <div>
              <span>网址</span>
              <a :href="placeInfo.website">{{ placeInfo.website }}</a>
            </div>
            <div>
              <span>用时参考</span>
              <span>{{ placeInfo.visit_time }}</span>
            </div>
          </div>
          <div class="info-list">
            <span>交通</span>
            <ul>
              <li v-for="(traffic, trafficIndex) of placeInfo.traffic" :key="trafficIndex">{{ traffic }}</li>
            </ul>
          </div>
          <div class="info-list">
            <span>开放时间</span>
            <ul>
              <li v-for="(open, openIndex) of placeInfo.open_time" :key="openIndex">{{ open }}</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="buy-ticket">
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
            <tr v-for="(ticket, ticketIndex) of placeInfo.ticket" :key="ticketIndex">
              <td>漫游日本</td>
              <td>{{ ticket.kind }}</td>
              <td>￥{{ ticket.price }}</td>
              <td>
                <el-button 
                  type="warning" 
                  size="mini"
                  @click="$router.push({ path: '/place/book/commit', query: { 
                    id: $route.params.id,
                    kind: ticket.kind, 
                    price: ticket.price } })">
                  立即购买
                </el-button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="geo-wrapper">
        <div class="title">
          <span>景点位置</span>
          <span>Nara, 630-8211, Japan</span>
        </div>
        <div class="geo-container">
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
              <p v-for="(nearby, nearbyIndex) of placeInfo.nearby_place" :key="nearbyIndex">
                <nuxt-link :to="{ name: 'place-id', params: { id: nearby.place_id } }">
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
      </div>
      <div class="inside-wrapper">
        <div class="title">
          <span>内部景点</span>
        </div>
        <div class="place-container">
          <div class="place" v-for="(inside, insideIndex) of placeInfo.inside_place" :key="insideIndex">
            <nuxt-link :to="{ name: 'place-id', params: { id: inside.place_id } }">
              <span class="number">{{ insideIndex + 1 }}</span>
              <img :src="inside.image" />
              <span>{{ inside.place }}</span>
            </nuxt-link>
          </div>
        </div>
      </div>
      <div class="comment-wrapper" id="comment">
        <div class="title">
          <span>景点点评 (共有{{ placeInfo.comment_count }}条真实评价)</span>
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
      <div class="hot-food" id="hot">
        <div class="title">
          <span>附近热门美食</span>
        </div>
        <div class="food-container">
          <div class="food">
            <nuxt-link to="#">
              <img src="http://n1-q.mafengwo.net/s11/M00/E5/A8/wKgBEFqma6WAI7T9ABYrD16tsDU41.jpeg?imageMogr2%2Fthumbnail%2F%21320x170r%2Fgravity%2FCenter%2Fcrop%2F%21320x170%2Fquality%2F100" />
              <div>
                <p>寿司</p>
                <p>距此1274米</p>
              </div>
            </nuxt-link>
          </div>
          <div class="food">
            <nuxt-link to="#">
              <img src="http://n1-q.mafengwo.net/s11/M00/E5/A8/wKgBEFqma6WAI7T9ABYrD16tsDU41.jpeg?imageMogr2%2Fthumbnail%2F%21320x170r%2Fgravity%2FCenter%2Fcrop%2F%21320x170%2Fquality%2F100" />
              <div>
                <p>寿司</p>
                <p>距此1274米</p>
              </div>
            </nuxt-link>
          </div>
          <div class="food">
            <nuxt-link to="#">
              <img src="http://n1-q.mafengwo.net/s11/M00/E5/A8/wKgBEFqma6WAI7T9ABYrD16tsDU41.jpeg?imageMogr2%2Fthumbnail%2F%21320x170r%2Fgravity%2FCenter%2Fcrop%2F%21320x170%2Fquality%2F100" />
              <div>
                <p>寿司</p>
                <p>距此1274米</p>
              </div>
            </nuxt-link>
          </div>
        </div>
      </div>
      <div class="hot-hotel">
        <div class="title">
          <span>附近热门酒店</span>
        </div>
        <ul>
          <li>位于{{ areaInfo.area }}区域， 35%游客选择住在这里。</li>
          <li v-for="(intro, introIndex) of areaInfo.introduction" :key="introIndex">
            {{ intro }}
          </li>
        </ul>
        <div class="hotel-container">
          <div class="map">
            <Map
              :areaCoordinates="AreaCoords"
              :centerCoordinate="centerAreaCoord">
            </Map>
          </div>
          <div class="hotel">
            <nuxt-link
              v-for="(hotel, hotelIndex) of areaInfo.nearby_hotel" 
              :key="hotelIndex"
              :to="{ name: 'hotel-id', params: { id: hotel.hotel_id } }">
              <img :src="hotel.image" />
              <div class="shadow">
                <span>{{ hotel.hotel }}</span>
              </div>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Map from '@/components/common/map'

export default {
  name: 'Place',
  data() {
    return {
      placeID: this.$route.params.id,
      // 景点信息
      placeInfo: {},
      centerCoord: {},
      mainSiteCoord: {},
      nearbyPlaceCoords: [],
      panToCoord: {},
      // 区域信息
      areaInfo: {},
      centerAreaCoord: {},
      AreaCoords: [],
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
      const isJPG = file.type === 'image/jpeg' || 'image/jpg' || 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG、PNG 格式!');
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
      const { placeID } = this
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const { data } = await this.$axios.post('/comment/addCommentOfPlace', Object.assign(this.form, { placeID }))
          if (data.code === 0) {
            this.$message({
              message: data.msg,
              type: 'success'
            })
            this.getPlaceInfo()
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
      const { data } = await this.$axios.post('/comment/like', { 
        commentID,
        type: 'comment'
      })
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
      const { placeID, currentPage, pageSize } = this
      const { data } = await this.$axios.get('/comment/getCommentOfPlace', {
        params: { placeID, currentPage, pageSize }
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
    // 获取景点信息
    async getPlaceInfo() {
      const { placeID } = this
      const { data } = await this.$axios.get('/geo/getPlaceInfo', {
        params: { placeID }
      })
      this.placeInfo = data.placeInfo
      const { place: label, latitude, longitude } = this.placeInfo
      this.mainSiteCoord = { label, latitude, longitude }
      this.centerCoord = { latitude, longitude }
      this.nearbyPlaceCoords = this.placeInfo.nearby_place.map(place => {
        return {
          place: place.place,
          latitude: place.latitude,
          longitude: place.longitude
        }
      })
    },
    // 获取区域信息
    async getAreaInfo() {
      const { placeID } = this
      const { data } = await this.$axios.get('/geo/getAreaInfoOfPlace', {
        params: { placeID }
      })
      if (data.code === 0) {
        this.areaInfo = data.areaInfo
        const { center, coordinates } = this.areaInfo
        this.centerAreaCoord = center
        this.AreaCoords = coordinates
      }
    }
  },
  created() {
    this.getPlaceInfo()
    this.getAreaInfo()
    this.getComment()
  }
}
</script>

<style lang="less" scoped>
@import '@/assets/css/iconfont.css';
@border-bottom: 1px solid #E4E4E4;
@black: #333333;
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

.container {
  background-color: #ffffff;
  .content-top {
    padding: 1em 18em 0;
    border-bottom: @border-bottom;
    .top-in {
      /deep/ .el-rate {
        line-height: 40px;
        i {
          line-height: 40px;
        }
      }
      padding-top: 0.5em;
      & > div:nth-of-type(2) {
        margin-top: 1em;
        padding-bottom: 1.5em;
        border-bottom: @border-bottom;
        p {
          margin: 0;
          line-height: normal;
        }
        & > p:nth-child(1) {
          color: @black;
          font-size: 2rem;
        }
        & > p:nth-child(2) {
          font-size: 1.1rem;
          color: #999999;
        }
      }
      & > div:nth-of-type(3) {
        display: flex;
        justify-content: space-between;
        align-items: center;
        & > div {
          padding: 1.5em 0;
          a {
            cursor: pointer;
            font-size: 1rem;
            padding: 0 1.5em;
            color: @black;
            span {
              font-size: 0.8rem;
              color: #999999;
            }
          }
          a:hover {
            color: @orange;
          }
        }
      }
    }
  }
  .content {
    .image-wall-wrapper {
      padding: 2.5em 18em;
      background-color: #fafafa;
      border-bottom: @border-bottom;
      .image-wall {
        display: flex;
        height: 25em;
        .main-img {
          height: 100%;
          margin-right: 0.5em;
          flex: 2;
          img {
            height: 100%;
          }
        }
        .sub-img {
          flex: 1;
          display: flex;
          justify-content: space-between;
          flex-direction: column;
          img {
            height: 49%;
          }
        }
      }
    }
    .info-wrapper {
      padding: 2em 18em 2.5em;
      color: @black;
      border-bottom: @border-bottom;
      font-size: 0.9rem;
      ul {
        margin: 0;
        padding: 0;
        list-style: none;
        li {
          margin: 0.3em 0;
        }
      }
      .info-point {
        padding-bottom: 1.5em;
        border-bottom: @border-bottom;
        li {
          font-size: 1rem;
        }
      }
      .info-other {
        padding-top: 2.5em;
        .info-row{
          display: flex;
          padding-bottom: 1.5em;
          div {
            flex: 1;
            display: flex;
            flex-direction: column;
            & > span:nth-child(1) {
              display: inline-block;
              margin-bottom: 0.5em;
            }
            & > span:nth-child(2) {
              color: #666666;
            }
          }
        }
        .info-list {
          padding-bottom: 1.5em;
          span {
            display: inline-block;
            margin-bottom: 0.5em;
          }
          li {
            color: #666666;
          }
        }
      }
    }
    .buy-ticket {
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
    .geo-wrapper {
      padding: 0 18em 2em;
      color: @black;
      border-bottom: @border-bottom;
      .title {
        padding: 2.5em 0 1.5em;
        display: flex;
        flex-direction: column;
        & > span:nth-child(1) {
          font-size: 1.3rem;
          margin-bottom: 0.2em;
        }
        & > span:nth-child(2) {
          color: #999999;
        }
      }
      .geo-container {
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
    }
    .inside-wrapper {
      padding: 0 18em 2em;
      color: @black;
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
      .place-container {
        .place {
          display: inline-block;
          width: 24%;
          height: 14em;
          margin: 0.25em;
          &:first-child {
            margin-left: 0;
          }
          &:last-child {
            margin-right: 0;
          }
          a {
            width: 100%;
            position: relative;
            display: flex;
            flex-direction: column;
            .number {
              position: absolute;
              top: 0;
              left: 0;
              height: 2.2em;
              width: 2.8em;
              line-height: 2.2em;
              color: #ffffff;
              text-align: center;
              font-size: 1rem;
              background-color: #ff9d00;
            }
            & > img {
              height: 11em;
            }
            & > span:nth-of-type(2) {
              display: inline-block;
              height: 3em;
              line-height: 3em;
              padding-left: 1em;
              font-weight: bold;
              margin-top: 0;
              font-size: 1rem;
              color: #333333;
              border: 1px solid #efefef;
            }
          }
          &:hover span:nth-of-type(2) {
            color: #ff9d00;
          }
        }
      }
    }
    .comment-wrapper {
      padding: 0 18em 2em;
      color: @black;
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
    .hot-food {
      padding: 0 18em 2em;
      color: @black;
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
      .food-container {
        display: flex;
        justify-content: space-between;
        .food {
          width: 32%;
          img {
            height: 12em;
          }
          div {
            color: #333333;
            border: 1px solid #eee;
            padding: 1em;
            p {
              margin: 0;
            }
            p:first-child {
              font-size: 1rem;
            }
            p:last-child {
              font-size: 0.8rem;
            }
          }
        }
      }
    }
    .hot-hotel {
      padding: 0 18em 2em;
      color: @black;
      border-bottom: @border-bottom;
      .title {
        padding: 2.5em 0 0.5em;
        display: flex;
        flex-direction: column;
        span {
          font-size: 1.3rem;
          margin-bottom: 0.2em;
        }
      }
      ul {
        list-style: none;
        margin: 0 0 2em 0;
        padding: 0;
        li {
          font-size: 1rem;
          color: #666666;
          margin: 0.5em 0;
        }
      }
      .hotel-container {
        display: flex;
        justify-content: space-between;
        height: 30em;
        .map {
          width: 65%;
          height: 100%;
          background-color: rgb(238, 129, 129);
        }
        .hotel {
          width: 33.5%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          & > a:hover > img {
            transform: scale(1.1);
            transition: transform 2s;
          }
          & > a {
            height: 48.5%;
            position: relative;
            overflow: hidden;
            img {
              height: 100%;
            }
            .shadow {
              height: 4.5em;
              width: 100%;
              position: absolute;
              left: 0;
              bottom: 0;
              background-color: rgba(0, 0, 0, 0.6);
              color: #ffffff;
              span {
                display: inline-block;
                padding: 0.8em;
                font-size: 1.1rem;
              }
            }
          }
        }
      }
    }
  }
}
</style>