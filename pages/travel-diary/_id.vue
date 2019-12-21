<template>
  <div class="container">
    <NavBar></NavBar>
    <div class="content">
      <div class="diary-wrapper">
        <div>
          <el-button size="small" round :autofocus="true" @click="type = 'hot'">最热游记</el-button>
          <el-button size="small" round @click="type = 'new'">最新游记</el-button>
        </div>
        <div>
          <div class="btn-group">
            <el-select 
              v-model="form.price_average" 
              placeholder="按人均消费" 
              size="small" 
              style="width:120px;"
              clearable>
              <el-option
                v-for="item in priceAvgList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select 
              v-model="form.day" 
              placeholder="按出行天数" 
              size="small" 
              style="width:120px;"
              clearable>
              <el-option
                v-for="item in dayList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="add">
            <el-button 
              type="warning" 
              icon="el-icon-edit"
              @click="$router.push({ path: '/travel-diary/diary/publish', query: {id: cityID} })">写游记
            </el-button>
          </div>
        </div>
        <div>
          <div class="note-wrapper" v-for="(note, index) of noteList" :key="index">
            <div class="image">
              <nuxt-link :to="{ name: 'diary-id', params: { id: note.note_id } }">
                <img :src="note.image" />
              </nuxt-link>
            </div>
            <div class="info">
              <div>
                <nuxt-link :to="{ name: 'diary-id', params: { id: note.note_id } }">
                  <h1 :title="note.note">{{ note.note }}</h1>
                </nuxt-link>
                <p>
                  <svg class="icon" aria-hidden="true" @click="giveThumbsUp(note.note_id)">
                    <use :xlink:href="note.like_status ? '#icon-dianzan' : '#icon-zan'"></use>
                  </svg>
                  <span>{{ note.like_count }}</span>
                </p>
              </div>
              <div>
                <img :src="note.user[0].head" />
                <span>作者：{{ note.user[0].username }}</span>
                <span>{{ note.pubdate | dateFormat }}</span>
              </div>
              <div>{{ note.describe }}</div>
              <div>
                <span>{{ note.scan_count }}次阅读</span>
              </div>
            </div>
          </div>
        </div>
        <div class="block" v-if="total !== 0">
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
      <div class="without">  
        <img src="/pic/111.png" />
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/common/NavBar'

export default {
  name: 'TravelDiary',
  data() {
    return {
      cityID: this.$route.params.id,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      type: 'hot',
      form: {
        price_average: '',
        day: ''
      },
      priceAvgList: [
        {
          value: '1-999',
          label: '1-999'
        },
        {
          value: '1000-6000',
          label: '1k-6k'
        },
        {
          value: '6000-20000',
          label: '6k-20k'
        },
        {
          value: '>20000',
          label: '20k以上'
        }
      ],
      dayList: [
        {
          value: '<3',
          label: '3天以下'
        },
        {
          value: '4-7',
          label: '4-7天'
        },
        {
          value: '8-14',
          label: '8-14天'
        },
        {
          value: '>15',
          label: '15天以上'
        }
      ],
      noteList: []
    }
  },
  components: {
    NavBar
  },
  watch: {
    type() {
      this.getNoteList()
    },
    form: {
      deep: true,
      handler() {
        this.getNoteList()
      }
    }
  },
  methods: {
    handleCurrentChange() {
      this.getNoteList()
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
        this.getNoteList()
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
    async getNoteList() {
      const { form, type, currentPage, pageSize, cityID } = this
      const { data } = await this.$axios.get('/note/getNoteOfCity', {
        params: Object.assign({}, { form, type, currentPage, pageSize, cityID })
      })
      if (data.code === 0) {
        this.noteList = data.noteList
        this.total = data.total
      } else {
        this.$message.error(data.msg)
      }
    }
  },
  created() {
    this.getNoteList()
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
  .content {
    padding: 2em 18em;
    display: flex;
    justify-content: space-between;
    .diary-wrapper {
      width: 70%;
      & > div:nth-child(1) {
        margin-bottom: 1em;
      }
      & > div:nth-child(2) {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      & > div:nth-child(3) {
        .note-wrapper {
          padding: 2em 0;
          display: flex;
          justify-content: space-between;
          border-bottom: 1px dashed #d8d8d8;
          .image {
            width: 30%;
            height: 9.5em;
          }
          .info {
            width: 67%;
            & > div:nth-child(1) {
              display: flex;
              justify-content: space-between;
              align-items: center;
              a {
                width: 90%;
                h1 {
                  color: @orange;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  &:hover {
                    text-decoration: underline;
                  }
                }
              }
              p {
                margin: 0;
              }
            }
            & > div:nth-child(2) {
              display: flex;
              align-items: center;
              padding: 0.5em 0;
              img {
                width: 1.2em;
                height: 1.2em;
              }
              span:nth-of-type(1) {
                color: @main-font-color;
                font-size: 0.75rem;
                margin: 0.5em;
              }
              span:nth-of-type(2) {
                color: @sub-font-color;
                font-size: 0.75rem;
                margin: 0.5em;
              }
            }
            & > div:nth-child(3) {
              font-size: 0.8rem;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              /*! autoprefixer: ignore next */
              -webkit-box-orient: vertical;
            }
            & > div:nth-child(4) {
              margin-top: 0.8em;
              font-size: 0.8rem;
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
    }
    .without {
      width: 28%;
      height: 35em;
      background-color: rgb(159, 245, 88);
    }
  }
}
</style>