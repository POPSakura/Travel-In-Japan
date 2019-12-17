<template>
  <div>
  </div>
</template>

<script>
export default {
  name: 'Map',
  props: {
    centerCoordinate: {
      type: Object,
      default: () => {}
    },
    mainSiteCoordinate: {
      type: Object,
      default: () => {}
    },
    siteCoordinates: {
      type: Array,
      default: () => []
    },
    areaCoordinates: {
      type: Array,
      default: () => []
    },
    panToCoordinate: {
      type: Object,
      default: () => {}
    },
    panToAreaCoordinate: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      focusPoint: {}
    }
  },
  watch: {
    // 中心点标记
    centerCoordinate: {
      deep: true,
      handler(value) {
        const point = new BMap.Point(value.longitude, value.latitude)
        this.$Map.centerAndZoom(point, 14)
      }
    },
    // 主景点标记
    mainSiteCoordinate: {
      deep: true,
      handler(value) {
        this.$Map.clearOverlays()
        const point = new BMap.Point(value.longitude, value.latitude)
        const marker = new BMap.Marker(point, {
          title: value.label
        })
        this.$Map.addOverlay(marker)
        marker.setAnimation(BMAP_ANIMATION_BOUNCE)
      }
    },
    // 其他景点标记
    siteCoordinates: {
      deep: true,
      handler(value) {
        value.forEach(site => {
          const point = new BMap.Point(site.longitude, site.latitude)
          const marker = new BMap.Marker(point, {
            title: site.place
          })
          this.$Map.addOverlay(marker)
        })
      }
    },
    // 范围标记
    areaCoordinates: {
      deep: true,
      handler(value) {
        value.forEach(area => {
          const label = new BMap.Label(area.name, {
            position: new BMap.Point(area.longitude, area.latitude)
          })
          this.$Map.addOverlay(label)
          label.hide()
          const polygon = new BMap.Polygon(area.coords.map( crood => {
            return new BMap.Point(crood.longitude, crood.latitude)
          }), {
            strokeColor: "blue",
            strokeWeight: 2,
            strokeOpacity: 0.5
          })
          this.$Map.addOverlay(polygon)
          polygon.addEventListener('mouseover', (e) => {
            e.target.setFillColor('#0a89e4')
            e.target.setFillOpacity(0.3)
            e.target.setStrokeWeight(4)
            label.setStyle({
              color: '#0A89E4',
              borderRadius: '10px',
              padding: '2px 6px',
              border: '2px solid #0A89E4'
            })
            label.show()
          })
          polygon.addEventListener('mouseout', (e) => {
            e.target.setFillColor('#ffffff')
            e.target.setFillOpacity(0.3)
            e.target.setStrokeWeight(2)
            label.hide()
          })
        })
      }
    },
    panToCoordinate: {
      deep: true,
      handler(value) {
        const mainPoint = new BMap.Point(value.longitude, value.latitude)
        const point = this.focusPoint
        if (JSON.stringify(mainPoint) === JSON.stringify(point)) return
        const overlays = this.$Map.getOverlays()
        overlays.slice(1).forEach(overlay => {
          if (JSON.stringify(overlay.getPosition()) === JSON.stringify(point)) {
            this.$Map.removeOverlay(overlay)
          }
          if (JSON.stringify(overlay.getPosition()) === JSON.stringify(mainPoint)) {
            this.$Map.removeOverlay(overlay)
          }
        })
        this.$Map.panTo(mainPoint)
        this.focusPoint = mainPoint
        const mainMarker = new BMap.Marker(mainPoint)
        this.$Map.addOverlay(mainMarker)
        mainMarker.setAnimation(BMAP_ANIMATION_BOUNCE)
        const marker = new BMap.Marker(point)
        this.$Map.addOverlay(marker)
      }
    },
    panToAreaCoordinate: {
      deep: true,
      handler(value) {
        const point = new BMap.Point(value.longitude, value.latitude)
        this.$Map.panTo(point)
      }
    }
  },
  mounted() {
    const map = new BMap.Map(this.$el)
    map.enableScrollWheelZoom(true)
    map.addControl(new BMap.NavigationControl({
      type: BMAP_NAVIGATION_CONTROL_LARGE,
      // type: BMAP_NAVIGATION_CONTROL_SMALL,
      // type: BMAP_NAVIGATION_CONTROL_PAN,
      // type: BMAP_NAVIGATION_CONTROL_ZOOM
    })) 
    map.addControl(new BMap.ScaleControl())
    map.addControl(new BMap.OverviewMapControl())  
    map.addControl(new BMap.MapTypeControl())
    // map.setCurrentCity("奈良")
    this.$Map = map
  }
}
</script>

<style lang="less" scoped>
div {
  width: 100%;
  height: 100%;
  /deep/ img {
    width: auto;
    height: auto;
  }
}
</style>