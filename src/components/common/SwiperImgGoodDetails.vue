<template>
  <swiper
    :loop="SwiperImgDataList.loop"
    :auto="SwiperImgDataList.auto"
    :list="SwiperImgDataList.ImgList"
    :index="SwiperImgDataList.index"
    :dots-position="SwiperImgDataList.dotsPosition"
    :height="SwiperImgDataList.height"
    id="goods-details-swiper-img"
  ></swiper>
</template>

<script>
import { Swiper, GroupTitle, SwiperItem, Divider } from "vux";

export default {
  props: ["SwiperImgDataList"],
  components: {
    Swiper,
    SwiperItem,
    GroupTitle
  },
  ready() {},
  methods: {

  },
  data() {
    return {
      SwiperImgData: {
        ImgList: [],
        index: 0,
        dotsPosition: "center",
        loop: true,
        auto: true,
        height: "160px"
      }
    };
  },
  computed: {},
  mounted() {
  },
  beforeDestroy() {
  }
};
</script>

<style scoped>
.copyright {
  font-size: 12px;
  color: #ccc;
  text-align: center;
}
.text-scroll {
  border: 1px solid #ddd;
  border-left: none;
  border-right: none;
}
.text-scroll p {
  font-size: 12px;
  text-align: center;
  line-height: 30px;
}
.black {
  background-color: #000;
}
.title {
  line-height: 100px;
  text-align: center;
  color: #fff;
}
.animated {
  animation-duration: 1s;
  animation-fill-mode: both;
}
.vux-indicator.custom-bottom {
  bottom: 30px;
}
@-webkit-keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  100% {
    opacity: 1;
    transform: none;
  }
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  100% {
    opacity: 1;
    transform: none;
  }
}
.fadeInUp {
  animation-name: fadeInUp;
}
.swiper-demo-img img {
  width: 100%;
}
</style>