<template>
  <div class="userorder-container">
    <h5>个人订单</h5>
    <div class="order-wrapper">
      <table>
        <thead>
          <tr>
            <th>订单号</th>
            <th>名称</th>
            <th>类型</th>
            <th>价格</th>
            <th>数量</th>
            <th>备注</th>
            <th>总金额</th>
            <th>订单状态</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(order, index) of orderList" :key="index">
            <td>{{ order.order_id }}</td>
            <td>{{ order.series }}</td>
            <td>{{ order.kind }}</td>
            <td>{{ order.price }}</td>
            <td>{{ order.quantity }}</td>
            <td>{{ order.remark }}</td>
            <td>{{ order.total }}</td>
            <td :style="{ color: computedStatus(order.status).color }">
              {{ computedStatus(order.status).text }}
            </td>
            <td>
              <el-popover
                :ref="`popover${index}`"
                placement="top-start"
                title="订单详情"
                width="1000"
                trigger="hover"
                popper-class="innerTable">
                <table>
                  <thead>
                    <tr>
                      <th>下单人</th>
                      <th>联系方式</th>
                      <th>邮箱</th>
                      <th>预定时间</th>
                      <th>订单创建时间</th>
                      <th>订单支付时间</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{{ order.name }}</td>
                      <td>{{ order.telephone }}</td>
                      <td>{{ order.email }}</td>
                      <td>{{ order.book_time }}</td>
                      <td>{{ order.create_time | dateFormat }}</td>
                      <td>{{ order.pay_time | dateFormat}}</td>
                    </tr>
                  </tbody>
                </table>
              </el-popover>
              <span v-popover:popover="`popover${index}`" class="detail">详情</span>
              <span 
                class="confirm" 
                @click="confirm(order)"
                v-if="order.status === 0">
                确认支付
              </span>
              <span 
                class="cancel" 
                @click="cancel(order)"
                v-if="order.status === 0">
                取消订单
              </span>
            </td>
          </tr>
        </tbody>
      </table>
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
</template>

<script>
export default {
  name: 'UserOrder',
  data() {
    return {
      currentPage: 1,
      pageSize: 15,
      total: 0,
      orderList: []
    }
  },
  methods: {
    computedStatus(status) {
      if (status === 0) return { text: '待支付', color: '#32dcfa' } 
      if (status === 1) return { text: '已支付', color: '#0efc0e' } 
      if (status === -1) return { text: '已取消', color: '#af1010' } 
    },
    handleCurrentChange() {
      this.getOrder()
    },
    async getOrder() {
      const { currentPage, pageSize } = this
      const { data } = await this.$axios.get('/order/getOrder', {
        params: { currentPage, pageSize }
      })
      if (data.code === 0) {
        this.total = data.total
        this.orderList = data.orderList
      }
      else this.$message.error(data.msg)
    },
    async Hotelcancel(hotelID, orderID) {
      const { data } = await this.$axios.post('/order/cancelOrderOfHotel', { hotelID, orderID })
      if (data.code === 0) {
        this.$message.success(data.msg)
        this.getOrder()
      } else {
        this.$message.error(data.msg)
      }
    },
    async Placecancel(orderID) {
      const { data } = await this.$axios.post('/order/cancelOrder', { orderID })
      if (data.code === 0) {
        this.$message.success(data.msg)
        this.getOrder()
      } else {
        this.$message.error(data.msg)
      }
    },
    async confirm(order) {
      const { order_id: orderID } = order
      const { data } = await this.$axios.post('/order/payOrder', { orderID })
      if (data.code === 0) {
        this.$message.success(data.msg)
        this.getOrder()
      } else {
        this.$message.error(data.msg)
      }
    },
    cancel(order) {
      const { series_id: seriesID, order_id: orderID, series_type: seriesType } = order
      if (seriesType === 'hotel') this.Hotelcancel(seriesID, orderID)
      if (seriesType === 'place') this.Placecancel(orderID)
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

.innerTable {
  table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    border: 1px solid #d4d4d4;
    tr {
      th {
        color: #494a4d;
        background-color: #71b8ff;
      }
      th, td {
        padding: 1em 0;
        text-align: center;
        border-bottom: 1px solid #d4d4d4;
      }
    }
  }
}

.userorder-container{
  width: 95%;
  h5 {
    font-size: 20px;
    margin-bottom: 15px;
    padding-bottom: 10px;
    padding: 10px 0 20px 0;
    letter-spacing: 0.1em;
    border-bottom: 1px solid #cfcfcf;
  }
  .order-wrapper {
    table {
      width: 100%;
      border-collapse: collapse;
      border-spacing: 0;
      margin-top: 3em;
      border: 1px solid #d4d4d4;
      tr {
        th {
          color: #494a4d;
          background-color: #71b8ff;
        }
        th, td {
          padding: 1em 0;
          text-align: center;
          border-bottom: 1px solid #d4d4d4;
        }
        .detail {
          cursor: pointer;
          color: @orange;
          font-size: 0.9rem;
          margin-right: 0.5em;
        }
        .confirm {
          cursor: pointer;
          color: #45c3fd;
          font-size: 0.9rem;
          margin-right: 0.5em;
        }
        .cancel {
          cursor: pointer;
          color: #f71616;
          font-size: 0.9rem;
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