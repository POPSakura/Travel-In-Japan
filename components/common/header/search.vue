<template>
  <div class="search-container">
    <div class="position">
      <span class="position-in" onselectstart="return false">奈良印象</span>
    </div>
    <span class="el-icon-search" onselectstart="return false">&nbsp;选择县区&nbsp;</span>
    <el-select v-model="countyValue" placeholder="请选择所属县">
      <el-option-group
      v-for="group in counties"
      :key="group.label"
      :label="group.label">
        <el-option
          v-for="item in group.options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-option-group>
    </el-select>
    <el-select v-model="cityValue" placeholder="请选择所属市" :disabled="!countyValue.toString().length">
      <el-option
        v-for="item in cities"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <span class="el-icon-search" onselectstart="return false">&nbsp;关键字查找&nbsp;</span>
    <el-autocomplete
      v-model="city"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入区县"
      @select="handleSelect"
    ></el-autocomplete>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  data: function() {
    return {
      cityValue: '',
      countyValue: '',
      city: '',
      counties: [],
      cities: [],
      allCities: []
    }
  },
  watch: {
    async countyValue(newValue) {
      const self = this
      const {status, data:{code, cities}} = await self.$axios.get(`/geo/getCities/${newValue}`)
      if(status === 200){
        if(code === 0){
          self.cities = cities
        }else{
          self.cities = cities
        }
      }else{
        self.cities = []
      }
    }
  },
  methods: {
    querySearchAsync:_.debounce(async function(query, cb){
      const self = this
      if(self.allCities.length){
        cb(self.allCities.filter(item => item.value.indexOf(query)>-1))
      }else{
        const {status, data:{code, allCities}} = await self.$axios.get('/geo/getAllCities')
        if(status === 200){
          if(code === 0){
            self.allCities = allCities
            cb(self.allCities.filter(item => item.value.indexOf(query)>-1))
          }else{
            self.allCities = allCities
            cb()
          }
        }else{
          self.allCities = []
          cb()
        }
      }
    },500),
    handleSelect(item) {
      
    }
  },
  async mounted() {
    const self = this
    const {status, data:{code, counties}} = await self.$axios.get('/geo/getCounties')
    if(status === 200){
      if(code === 0){
        let [cou, loc] = [[], []]
        counties.forEach((item) => {
          if(!loc.includes(item.local)){
            loc.push(item.local)
            cou.push({
              label: item.local,
              options: [{
                value: item.id,
                label: item.county
              }]
            })
          }else{
            cou.forEach((ite) => {
              if(ite.label === item.local){
                ite.options.push({
                  value: item.id,
                  label: item.county
                })
              }
            })
          }
        })
        self.counties = cou
      }else{
        self.counties = counties
      }
    } else {
      self.counties = []
    }
  },
}
</script>

<style>

</style>