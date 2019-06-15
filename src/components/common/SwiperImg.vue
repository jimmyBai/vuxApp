<template>
  <swiper :options="swiperOption">
    <swiper-slide
      v-for="(item, index) in SwiperImgData.ImgList"
      class="img-swiper-wrap"
      :key="index"
    >
      <img v-lazy="item.img" alt srcset class="img-swiper-wrap-img-lis">
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { AdvertiseLoop, getUpdateInfo } from "@/servers/api";
export default {
  props: [""],
  components: {
    swiper,
    swiperSlide
  },
  ready() {},
  methods: {
    getBannerImg(type, height) {
      let imgArr = [];
      let carouselType = this.$route.query.carousel;
      if (!carouselType) {
        type = this.$store.state.tabIndex;
        switch (this.$store.state.tabIndex) {
          case 1:
            carouselType = 3;
            break;
          case 2:
            carouselType = 7;
            break;
          case 3:
            carouselType = 12;
            break;
          default:
            carouselType = 1;
            return;
        }
      }
      AdvertiseLoop({
        type: carouselType
      })
        .then(res => {
          if (res.result === 1) {
            for (let i = 0; i < res.data.data.carousel.length; i++) {
              imgArr.push({
                img: res.data.data.carousel[i]
              });
            }
            this.SwiperImgData = {
              ImgList: imgArr,
              index: 0,
              dotsPosition: "center",
              loop: true,
              auto: true,
              height: "160px"
            };
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    setLoopImg() {
      if (this.$route.path != "/imageandtextdetails") {
        this.$nextTick(() => {
          this.SwiperImgData = {
            ImgList: this.$store.state.carousel,
            index: 0,
            dotsPosition: "center",
            loop: true,
            auto: true,
            height: "160px"
          };
        });
      }
    }
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
      },
      swiperOption: {
        autoplay: true,
        pagination: {
          el: ".swiper-pagination"
        }
      },
      swiperSlides: []
    };
  },
  computed: {},
  created() {
  },
  mounted() {
    this.getBannerImg();
  },
  beforeDestroy() {
    this.SwiperImgData = {
      ImgList: [],
      index: 0,
      dotsPosition: "center",
      loop: true,
      auto: true,
      height: "160px"
    };
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
.img-swiper-wrap {
  width: 100%;
  height: 170px;
}
.img-swiper-wrap-img-lis {
  width: 100%;
  height: 100%;
  display: inline-block;
  border-radius: 4px;
}
</style>