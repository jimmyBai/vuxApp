<template>
  <div class="swiper-tip-wrap">
    <span class="swiper-tip-text">景区<span class="swiper-tip-text-red">发</span>布</span>
    <SwiperTip class="swiper-tip-adv"></SwiperTip>
  </div>
</template>

<script>
import SwiperTip from "../common/SwiperTip";

export default {
  name: "",
  props: [""],
  data() {
    return {};
  },

  components: {
    SwiperTip
  },

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {},

  watch: {}
};
</script>
<style lang='css' scoped>
.swiper-tip-wrap {
  width: 100%;
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  background: #fff;
}
.swiper-tip-text {
  flex: 1;
  height: 16px;
  line-height: 16px;
  font-size: 16px;
  border-right: 1px solid #eee;
  padding-right: 6px;
  box-sizing: border-box;
}
.swiper-tip-adv {
  flex: 4;
}
.swiper-tip-text-red{
  color: red;
}
</style>