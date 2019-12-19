<template>
  <div class="container">
    <div class="info-wrapper">
      <div class="user">
        <el-steps :active="active" align-center finish-status="success" process-status="wait">
          <el-step title="提交订单"></el-step>
          <el-step title="确认支付"></el-step>
          <el-step title="完成购买"></el-step>
        </el-steps>
        <div class="info-title">
          <span>确认信息</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>名称</th>
              <th>类型</th>
              <th>价格</th>
              <th>数量</th>
              <th>真实名</th>
              <th>手机</th>
              <th>邮箱</th>
              <th>备注</th>
              <th>预定时间</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ orderInfo.series }}</td>
              <td>{{ orderInfo.kind }}</td>
              <td>{{ orderInfo.price }}</td>
              <td>{{ orderInfo.quantity }}</td>
              <td>{{ orderInfo.name }}</td>
              <td>{{ orderInfo.telephone }}</td>
              <td>{{ orderInfo.email }}</td>
              <td>{{ orderInfo.remark }}</td>
              <td>{{ orderInfo.book_time }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="info-bottom">
      <div class="total">
        <div>
          <div>
            <span>门票单价：</span>
            <span>￥{{ orderInfo.price }}元</span>
          </div>
          <div>
            <span>支付总金额：</span>
            <span>￥{{ orderInfo.total }}元</span>
          </div>
        </div>
      </div>
      <div class="submit">
        <el-button size="medium" @click="cancel">取消订单</el-button>
        <el-button size="medium" type="warning" @click="commit">确认支付</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BookConfirm',
  data() {
    return {
      orderID: this.$route.params.id,
      active: 1,
      orderInfo: {}
    }
  },
  methods: {
    async cancel() {
      const { orderID } = this
      const { data } = await this.$axios.post('/order/cancelOrder', { orderID })
      if (data.code === 0) {
        this.$message.success(data.msg)
        setTimeout(() => {
          this.$router.push('/')
        }, 2000)
      } else {
        this.$message.error(data.msg)
      }
    },
    async commit() {
      const { orderID } = this
      const { data } = await this.$axios.post('/order/payOrder', { orderID })
      if (data.code === 0) {
        this.$message.success(`${data.msg}即将跳转至个人中心！`)
        setTimeout(() => {
          this.$router.push('/userInfo/userOrder')
        }, 2000)
      } else {
        this.$message.error(data.msg)
      }
    },
    async getOrder() {
      const { orderID } = this
      const { data } = await this.$axios.get('/order/getCurrentOrder', { params: { orderID } })
      if (data.code === 0) {
        this.orderInfo = data.orderInfo
      } else {
        this.$message.error(data.msg)
      }
    }
  },
  created() {
    this.getOrder()
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
      width: 100%;
      .info-title {
        font-size: 1.2rem;
        font-weight: bold;
        margin: 2em 0;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
        th, td {
          border: @border-bottom;
          text-align: center;
          padding: 1em 0;
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