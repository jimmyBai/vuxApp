<template>
  <div class="amap-page-container">
    <el-amap
      vid="amap"
      :plugin="plugin"
      class="amap-demo"
      :center="center"
      :amap-manager="amapManager"
      :zoom="zoom"
    ></el-amap>
  </div>
</template>

<script>
import { amapManager } from "vue-amap";

export default {
  data() {
    let self = this;
    return {
      center: [120.752564, 37.825461],
      zoom: 16,
      lng: 0,
      lat: 0,
      amapManager,
      loaded: false,
      plugin: [
        {
          pName: "Geolocation",
          events: {
            init(o) {
              o.getCurrentPosition((status, result) => {
                if (result && result.position) {
                  self.lng = result.position.lng;
                  self.lat = result.position.lat;
                  self.center = [self.lng, self.lat];
                  self.loaded = true;
                  self.$nextTick();
                }
              });
            }
          }
        }
      ]
    };
  }
};
</script>
<style>
.amap-page-container {
  width: 100%;
  height: 100%;
}
.amap-demo {
    width: 100%;
  height: 100%;
}
</style>