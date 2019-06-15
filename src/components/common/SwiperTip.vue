<template>
  <swiper
    auto
    height="30px"
    direction="vertical"
    :interval="2000"
    class="text-scroll"
    :show-dots="false"
    style="border:none"
  >
    <swiper-item v-for="(item,index) in baseList" :key="index">
      <p class="text-overflow-hidden">{{item}}</p>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, GroupTitle, SwiperItem } from "vux";

export default {
  components: {
    Swiper,
    SwiperItem,
    GroupTitle
  },
  ready() {},
  methods: {},
  data() {
    return {
      baseList: []
    };
  },
  mounted(){
    this.baseList = JSON.parse(sessionStorage.getItem('carouselTip'));
  }
};
</script>

<style scoped>
.copyright {
  font-size: 14px;
  color: #ccc;
  text-align: center;
}
.text-scroll {
  border: 1px solid #ddd;
  border-left: none;
  border-right: none;
}
.text-scroll p {
  font-size: 16px;
  text-align: left;
  line-height: 30px;
  padding:0 10px;
  box-sizing: border-box;
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