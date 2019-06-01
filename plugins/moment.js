import Vue from 'vue'
import moment from 'moment'

export default () => {
  Vue.filter('dateFormat', (dateStr, pattern = 'YYYY-MM-DD HH:mm:ss') => {
    return moment(dateStr).format(pattern)
  })
}
