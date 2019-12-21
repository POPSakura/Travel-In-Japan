<template>
  <div class="container">
    <div class="content-top">
      <div class="top-in">
        <div>
          <img :src="noteInfo.image" />
          <h1>{{ noteInfo.note }}</h1>
          <p>
            <svg class="icon" aria-hidden="true" @click="giveThumbsUp(noteID)">
              <use :xlink:href="noteInfo.like_status ? '#icon-dianzan' : '#icon-zan'"></use>
            </svg>
            <span>{{ noteInfo.like_count }}</span>
          </p>
        </div>
        <div>
          <div>
            <img :src="noteInfo.user ? noteInfo.user.head : ''" />
          </div>
          <span>作者: {{ noteInfo.user ? noteInfo.user.username : '' }}</span>
          <span>发布时间: {{ noteInfo.pubdate }}</span>
          <span>浏览数: {{ noteInfo.scan_count }}</span>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="diary-wrapper">
        <div class="info">
          <p>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-time"></use>
            </svg>
            出发时间
            <span>/</span>
            {{ noteInfo.date }}
          </p>
          <p>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-day"></use>
            </svg>
            出行天数
            <span>/</span>
            {{ noteInfo.day }}天
          </p>
          <p>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-people"></use>
            </svg>
            人数
            <span>/</span>
            {{ noteInfo.person }}人
          </p>
          <p>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-nursing_icon_additionalcost"></use>
            </svg>
            人均费用
            <span>/</span>
            {{ noteInfo.price_average }}RMB
          </p>
        </div>
        <div class="body" v-html="noteInfo.content"></div>
      </div>
      <div class="without">
        <img src="/pic/111.png" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Diary',
  data() {
    return {
      noteID: this.$route.params.id,
      noteInfo: {}
    }
  },
  methods: {
    async getNoteInfo() {
      const { noteID } = this
      const { data } = await this.$axios.get('/note/getNoteInfo', { params: { noteID } })
      if (data.code === 0) this.noteInfo = data.noteInfo
      else this.$message.error(data.msg)
    },
    // 点赞
    async giveThumbsUp(noteID) {
      const { data } = await this.$axios.post('/note/like', { 
        noteID
      })
      if (data.code === 0) {
        this.$message({
          message: data.msg,
          type: 'success'
        })
        this.getNoteInfo()
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
    // 浏览数增加
    async addScanCount() {
      const { noteID } = this
      const { data } = await this.$axios.get('/note/addScanCount', { params: { noteID } })
      if (data.code === -1) this.$message.error(data.msg)
    }
  },
  created() {
    this.getNoteInfo()
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
@orange: #ff9d00;

.container {
  color: @main-font-color;
  background-color: #ffffff;
  .content-top {
    .top-in {
      border-bottom: @border-bottom;
      div:nth-child(1) {
        height: 38em;
        position: relative;
        h1 {
          position: absolute;
          bottom: 0.5em;
          left: 16em;
          color: #ffffff;
          font-weight: bold;
          font-size: 1.6rem;
        }
        p {
          position: absolute;
          bottom: 1em;
          right: 16em;
          font-size: 1.6rem;
          font-weight: bold;
          color: #ffffff;
        }
      }
      div:nth-child(2) {
        padding: 1.5em 18em 2em;
        display: flex;
        align-items: center;
        div {
          margin-top: -6em;
          height: 8em;
          width: 8em;
          img {
            border-radius: 100%;
          }
        }
        span {
          margin: 0 1em;
        }
      }
    }
  }
  .content {
    padding: 2em 18em;
    display: flex;
    justify-content: space-between;
    & > .diary-wrapper {
      width: 70%;
      .info {
        padding: 0.5em 2em;
        border: 1px dashed #d7d7d7;
        p {
          display: inline-block;
          margin: 0.5em 4em 0.5em 0;
          line-height: normal;
          svg {
            font-size: 1.5rem;
            vertical-align: bottom;
            margin-right: 0.2em;
          }
          span {
            color: @orange;
          }
        }
      }
      .body {
        margin-top: 2em;
      }
    }
    .without {
      width: 28%;
      height: 35em;
    }
  }
}
</style>