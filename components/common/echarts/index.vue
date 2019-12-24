<template>
  <div>
  </div>
</template>

<script>
export default {
  name: 'Echarts',
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    data() {
      this.$chart.setOption({
        tooltip: {},
        series: [{
          name: '景区热度',
          type: 'pie',
          data: this.data,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      })
    }
  },
  methods: {
    echartsInit() {
      this.$chart = this.$echarts.init(this.$el)
      this.$chart.setOption({
        tooltip: {},
        series: [{
          name: '景区热度',
          type: 'pie',
          radius : '60%',
          center: ['50%', '55%'],
          data: this.data,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      })
    }
  },
  mounted() {
    this.echartsInit()
  }
}
</script>

<style lang="less" scoped>
div {
  width: 100%;
  height: 100%;
}
</style>