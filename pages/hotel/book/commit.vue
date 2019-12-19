<template>
  <div class="container">
    <div class="info-wrapper">
      <div class="user">
        <el-steps :active="active" align-center finish-status="success" process-status="wait">
          <el-step title="提交订单"></el-step>
          <el-step title="确认支付"></el-step>
          <el-step title="预定完成"></el-step>
        </el-steps>
        <div class="info-title">
          <i class="num">1</i>
          <span>预订人信息</span>
        </div>
        <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-form">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" prop="telephone">
            <el-input v-model.number="form.telephone"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input type="textarea" v-model="form.remark"></el-input>
          </el-form-item>
          <el-form-item label="预定时间" prop="time">
            <el-date-picker
              v-model="form.time"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </el-form>
        <div class="info-title">
          <i class="num">2</i>
          <span>预定相关信息</span>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>类型</th>
                <th>预定数量</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ kind }}</td>
                <td>
                  <el-input-number 
                    size="small" 
                    v-model="quantity"  
                    :min="1">
                  </el-input-number>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="series">
        <div class="image">
          <img :src="hotelInfo.image">
          <span class="title">{{ hotelInfo.hotel }}</span>
        </div>
        <div class="detail">
          <p>{{ hotelInfo.introduction }}</p>
          <div>
            <p>
              <span>{{ hotelInfo.hotel }}</span>
              <span>{{ kind }}</span>
            </p>
            <p>
              <span>数量</span>
              <span>x{{ quantity }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="info-bottom">
      <div class="total">
        <div>
          <div>
            <span>房间单价：</span>
            <span>￥{{ price }}元</span>
          </div>
          <div>
            <span>支付总金额：</span>
            <span>￥{{ total }}元</span>
          </div>
        </div>
      </div>
      <div class="submit">
        <el-checkbox v-model="read">我已阅读并同意《旅游安全须知》</el-checkbox>
        <el-button size="medium" type="warning" :disabled="!read" @click="commit('form')">提交订单</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BookCommit',
  data() {
    return {
      hotelID: parseInt(this.$route.query.id),
      price: parseInt(this.$route.query.price),
      kind: this.$route.query.kind,
      hotelInfo: {},
      active: 0,
      read: false,
      quantity: 1,
      form: {
        name: '',
        email: '',
        telephone: null,
        remark: '',
        time: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入你的名字', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 2 到 15 个字符', trigger: 'change' }
        ],
        email: [
          { required: true, message: '请输入邮箱号', trigger: 'blur' },
          { type: 'email', message: '请输入有效的邮箱', trigger: 'change'}
        ],
        telephone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { 
            validator: (rule, value, callback) => {
              const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
              if(reg.test(value)){
                callback()
              }else{
                callback(new Error('手机号格式不正确！'))
              }
            },
            trigger: 'change'
          }
        ],
        time: [
          { required: true, message: '请选择日期', trigger: 'blur' }
        ],
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now()
        }
      }
    }
  },
  computed: {
    total() {
      return this.price * this.quantity * this.dateDiff
    },
    dateDiff() {    
      if (this.form.time.length) {
        let aDate, oDate1, oDate2, iDays  
        aDate = this.form.time[0].split("-")  
        oDate1 = new Date(aDate[0], aDate[1],aDate[2])
        aDate = this.form.time[1].split("-")  
        oDate2 = new Date(aDate[0], aDate[1], aDate[2])  
        iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 /24)
        return parseInt(iDays)
      } else {
        return 0
      }
    }
  },
  methods: {
    commit(form) {
      this.$refs[form].validate(async valid => {
        if (valid) {
          const { hotelID, kind, price, quantity, total } = this
          const form = JSON.parse(JSON.stringify(this.form))
          form.time = form.time.join('至')
          const { data } = await this.$axios.post('/order/addOrderOfHotel', Object.assign({}, form, {
            hotelID, kind, price, quantity, total, hotel: this.hotelInfo.hotel
          }))
          if (data.code === 0) {
            this.$message.success(`${data.msg}即将跳转至付款页面！`)
            setTimeout(() => {
              this.$router.push({ name: 'hotel-book-payment', params: { 
                hotelID: this.hotelID,
                id: data.order_id } 
              })
            }, 2000)
          } else {
            this.$message.error(data.msg)
          }
        } else {
          this.$message({
            message: '请完善必填项！',
            type: 'error'
          })
        }
      })
    },
    async getHotelInfoOfBook() {
      const { data } = await this.$axios.get('/geo/getHotelInfoOfBook', {
        params: { id: this.hotelID }
      })
      if (data.code === 0) this.hotelInfo = data.hotelInfo
    },
    async checkStatus() {
      const { hotelID } = this
      const { data } = await this.$axios.get('/order/checkHotelOrderStatus', {
        params: { id: hotelID }
      })
      if (data.code === -1) {
        this.$message.error(data.msg)
        setTimeout(() => {
          this.$router.push('/userInfo/userOrder')
        }, 2000)
      }
    }
  },
  created() {
    this.getHotelInfoOfBook()
    this.checkStatus()
  }
}
</script>

<style lang="less" scoped>
@border-bottom: 1px solid #E4E4E4;
@main-font-color: #666666;
@sub-font-color: #999999;
@title-font-color: #333333;
@orange: #ff9d00;

.container {
  background-color: #ffffff;
  .info-wrapper {
    margin: 0 18em;
    padding: 2em 0;
    border-bottom: @border-bottom;
    display: flex;
    justify-content: space-between;
    .user {
      width: 63%;
      .info-title {
        margin: 2em 0;
        .num {
          width: 1.5em;
          height: 1.5em;
          display: inline-block;
          font-weight: normal;
          background: #ff9d00;
          border-radius: 50%;
          color: #FFF;
          text-align: center;
          line-height: 1.5em;
          font-style: normal;
          vertical-align: top;
          margin-right: 17px;
        }
      }
      table {
        border-collapse: collapse;
        border-spacing: 0;
        width: 100%;
        border: 1px solid #e5e5e5;
        th {
          background-color: #f4f4f4;
          padding: 1em 0.5em;
          border: 1px solid #cccccc;
        }
        td {
          text-align: center;
          padding: 1em 0.5em;
          border: 1px solid #cccccc;
        }
      }
    }
    .series {
      width: 31%;
      border: @border-bottom;
      height: 28em;
      .image {
        position: relative;
        .title {
          position: absolute;
          bottom: 1em;
          left: 1em;
          color: #ffffff;
          font-size: 1rem;
          font-weight: bold;
        }
      }
      .detail {
        padding: 0.8em 1.5em;
        p:nth-child(1) {
          line-height: normal;
          font-size: 1rem;
          margin-bottom: 1em;
          overflow: hidden;
          -webkit-line-clamp: 5;
          text-overflow: ellipsis;
          display: -webkit-box;
          /* autoprefixer: ignore next */
          -webkit-box-orient: vertical;
        }
        div {
          padding-top: 1em;
          border-top: @border-bottom;
          p:nth-child(1) {
            display: flex;
            justify-content: space-between;
            & > span {
            display: inline-block;
            vertical-align: middle;
            }
            & > span:nth-child(1) {
              width: 8em;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
          span {
            font-size: 1rem;
          }
          p {
            margin-top: 0.5em;
            display: flex;
            justify-content: space-between;
          }
        }
      }
    }
  }
  .info-bottom {
    padding: 0 18em;
    .total {
      padding: 1.5em 0;
      display: flex;
      justify-content: flex-end;
      border-bottom: @border-bottom;
      & > div {
        width: 22em;
        div {
          display: flex;
          justify-content: space-between;
        }
        div:nth-child(1) {
          margin-bottom: 3em;
        }
        div:nth-child(2) {
          align-items: flex-end;
          span:nth-child(2) {
            font-size: 2rem;
            color: @orange;
          }
        }
      }
    }
    .submit {
      padding: 2em 0;
      text-align: center;
    }
  }
}
</style>