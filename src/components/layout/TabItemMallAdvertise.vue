<template>
  <div class="tab-item-mall-advertise-wrap">
    <SwiperImg class="tab-item-mall-advertise-swiper"></SwiperImg>
    <AdvertiseSwiper class="tab-item-mall-advertise-tip"></AdvertiseSwiper>
  </div>
</template>

<script>
import SwiperImg from "@/components/common/SwiperImg";
import AdvertiseSwiper from "@/components/layout/AdvertiseSwiper";

export default {
  name: "",
  props: [""],
  data() {
    return {

    };
  },

  components: {
    SwiperImg,
    AdvertiseSwiper
  },

  computed: {},

  beforeMount() {},

  mounted() {
    this.getBannerImgFn("3");
  },

  methods: {},

  watch: {}
};
</script>
<style lang='css' scoped>
.tab-item-mall-advertise-wrap{
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: #fff;
  position: relative;
  z-index: 999;
  padding: 0 10px;
  box-sizing: border-box;
}
.tab-item-mall-advertise-swiper {
  width: 100%;
  box-sizing: border-box;
  background: #fff;
}
.vux-swiper-item {
  border-radius: 20px;
}
</style>