<template>
  <div class="search-container">
    <div class="position">
      <span class="position-in" onselectstart="return false">奈良印象</span>
    </div>
    <span class="el-icon-search" onselectstart="return false">&nbsp;选择县区&nbsp;</span>
    <el-select v-model="county" placeholder="请选择所属县">
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
    <el-select v-model="city" placeholder="请选择所属市" :disabled="!county.toString().length">
      <el-option
        v-for="item in cities"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-button type="primary" @click="handleClick">Go!</el-button>
    <span class="el-icon-search" onselectstart="return false">&nbsp;关键字查找&nbsp;</span>
    <el-select
      v-model="selectedCity"
      filterable
      remote
      placeholder="请输入区县"
      :remote-method="remoteMethod"
      :loading="loading">
      <el-option
        v-for="item in allCities"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'Search',
  data: function() {
    return {
      loading: false,
      city: '',
      county: '',
      selectedCity: '',
      counties: [],
      cities: [],
      allCities: []
    }
  },
  watch: {
    async county(newValue) {
      const self = this
      const {status, data:{code, cities}} = await self.$axios.get(`/geo/getCities/${newValue}`)
      if(status === 200){
        if(code === 0){
          self.cities = cities.map(city => {
            return {
              value: city.city_id,
              label: city.city_name
            }
          })
        }else{
          self.cities = cities
        }
      }else{
        self.cities = []
      }
    },
    selectedCity(newValue) {
      this.$router.push({ name: 'area-id', params: { id: newValue} }) 
    }
  },
  methods: {
    remoteMethod: _.debounce(async function(query) {
      if (query !== '') {
        this.loading = true
        const {status, data:{code, all_cities}} = await this.$axios.get('/geo/getAllCities')
        this.loading = false
        if(status === 200){
          if(code === 0){
            this.allCities = all_cities
              .filter(city => city.city_name.indexOf(query) > -1)
              .map(city => {
                return {
                  value: city.city_id,
                  label: city.city_name
                }
              })
          } else {
            this.allCities = []
          }
        } else {
          this.allCities = []
        }
      } else {
        this.allCities = []
      }
    }, 500),
    handleClick() {
      const { county, city } = this
      if (county === '' && city === '') return
      city === '' 
        ? this.$router.push({ path: '/area', query: { id: this.county } })
        : this.$router.push({ name: 'area-id', params: { id: this.city} }) 
    }
  },
  async mounted() {
    const self = this
    const {status, data:{code, counties}} = await self.$axios.get('/geo/getCounties')
    if(status === 200){
      if(code === 0){
        let [cou, loc] = [[], []]
        counties.forEach((county) => {
          if(!loc.includes(county.local)){
            loc.push(county.local)
            cou.push({
              label: county.local,
              options: [{
                value: county.county_id,
                label: county.county_name
              }]
            })
          }else{
            cou.forEach((ite) => {
              if(ite.label === county.local){
                ite.options.push({
                  value: county.county_id,
                  label: county.county_name
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