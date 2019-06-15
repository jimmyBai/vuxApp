<template>
  <swiper :options="swiperOption">
    <swiper-slide v-for="(item, index) in swiperSlides" :key="index">
      <img :src="item.img" alt srcset @click="getToItem(index)">
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { AdvertiseLoop } from "@/servers/api";
export default {
  props: [""],
  components: {
    swiper,
    swiperSlide
  },
  ready() {},
  methods: {
    getToItem(index) {
      switch (index) {
        case 0:
          this.$router.push("/intelligentnavigation");
          break;
        case 1:
        this.$store.commit("changeTabIndex", 1);
          break;
        case 2:
          break;
        default:
          return;
      }
    },
    getDataList() {
      let imgArr = [];
      AdvertiseLoop({
        type: 1
      })
        .then(res => {
          if (res.result === 1) {
            for (let i = 0; i < res.data.data.carousel.length; i++) {
              imgArr.push({
                img: res.data.data.carousel[i]
              });
            }
            this.swiperSlides = imgArr;
            sessionStorage.removeItem("carouselTip");
            sessionStorage.setItem(
              "carouselTip",
              JSON.stringify(res.data.advert)
            );
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  data() {
    return {
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
  mounted() {
    this.getDataList();
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