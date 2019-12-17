<template>
  <div class="content-top">
    <div class="top-in">
      <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>首页</el-breadcrumb-item>
          <el-breadcrumb-item>日本</el-breadcrumb-item>
          <el-breadcrumb-item>奈良</el-breadcrumb-item>
          <el-breadcrumb-item>奈良市酒店</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div v-show="$route.name === 'area-id'">
        <div class="name-container">
          <span class="name">奈良</span>
          <span class="sub-name">Nara</span>
        </div>
        <span class="img-count">(171232张图片)</span>
      </div>
      <div>
        <ul>
          <li v-for="(item, index) of navList" :key="index">
            <nuxt-link :to="{ name: item.name, params: { id: $route.params.id } }">
              <svg class="icon" aria-hidden="true">
                <use :xlink:href="`#${item.icon}`"></use>
              </svg>
              <span>{{ item.label }}</span>
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      navList: [
        { label: '概况', icon: 'icon-jieshao', name: 'travel-scenic-spot-id' },
        { label: '行程线路', icon: 'icon-changtubashi', name: 'travel-scenic-spot-id' },
        { label: '景点', icon: 'icon-jingdian', name: 'travel-scenic-spot-id' },
        { label: '酒店', icon: 'icon-jiudian', name: 'dwelling-place-id' },
        { label: '资讯', icon: 'icon-canyin', name: 'travel-scenic-spot-id' },
        { label: '景点门票', icon: 'icon-tubiaozhizuomoban-', name: 'travel-scenic-spot-id' },
        { label: '当地游记', icon: 'icon-biji-', name: 'travel-scenic-spot-id' },
        { label: '地图', icon: 'icon-ditu', name: 'travel-scenic-spot-id' }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
@import '@/assets/css/iconfont.css';

@border-bottom: 1px solid #E4E4E4;

.content-top {
  background-color: #fafafa;
  .top-in {
    padding: 1.2em 18em 0.5em;
    border-bottom: @border-bottom;
    & > div:nth-child(1) {
      margin-bottom: 1.5em;
    }
    & > div:nth-child(2) {
      display: flex;
      align-items: center;
      .name-container {
        display: flex;
        flex-direction: column;
        .name {
          font-size: 3em;
          margin-right: 0.5em;
        }
        .sub-name {
          font-size: 1.5em;
          color: #999999;
        }
      }
      .img-count {
        color: #999999;
      }
    }
    & > div:nth-child(3) {
      margin-top: 1.5em;
      ul {
        list-style: none;
        display: flex;
        padding: 0;
        li {
          margin-right: 1.2em;
          a {
            display: flex;
            align-items: center;
            svg {
              width: 2.5em;
              height: 2.5em;
              margin-right: 0.3em;
            }
            span {
              color: #666666;
            }
          }
          &:hover span {
            color: #333333;
          }
        }
      }
    } 
  }
}
</style>