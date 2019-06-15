<template>
  <div class="tab-item-play-header-wrap">
    <SwiperImg class="tab-item-play-swiper"></SwiperImg>
    <div class="tab-item-play-header-title">
      <div class="location-icon text-align-center" @click="locationSelf">
        <span class="iconfont icondingwei"></span>
        <span class="scenic-name">{{scenicName}}</span>
      </div>
      <div class="search-icon text-align-center" @click="searchScence">输入作品/作者/景区</div>
      <div class="message-icon text-align-center" @click="appMessageCenter">
        <!-- <span class="iconfont iconxiaoxi"></span> -->
      </div>
    </div>
  </div>
</template>

<script>
import SwiperImg from "@/components/common/SwiperImgIndex";
import { vueCordovaFunction } from "@/assets/js/vuecordova";
import { getScenicNameByScenicId } from "@/assets/js/common";
export default {
  name: "",
  props: [""],
  data() {
    return {
      scenicName: ""
    };
  },

  components: {
    SwiperImg
  },

  computed: {},

  beforeMount() {},

  mounted() {
    this.getScenicName();
  },

  methods: {
    getScenicName() {
      this.scenicName = getScenicNameByScenicId(
        sessionStorage.getItem("currentScenic")
      );
    },
    locationSelf() {
      if (!sessionStorage.getItem("positionInfo")) {
        this.$vux.confirm.show({
          title: "提示",
          content:
            "为了提供更好的服务，请在设置中打开允许卡戳获取您的位置信息。",
          showCancelButton: false,
          onCancel: () => {
            console.log(this);
          },
          onConfirm: () => {
            vueCordovaFunction.getLocation();
            this.$router.push("/userlocation");
          }
        });
      } else {
        this.$router.push("/userlocation");
      }
    },
    searchScence() {
      this.$router.push("/usersearch");
    },
    appMessageCenter() {
      this.$router.push("/appmessage");
    }
  },

  watch: {
    $route(to, from) {
      this.getScenicName();
    }
  }
};
</script>
<style lang='css' scoped>
.tab-item-play-header-wrap {
  width: 100%;
  height: 220px;
  overflow: hidden;
  position: relative;
  top: 0;
  left: 0;
}
.tab-item-play-header-title {
  width: 100%;
  height: 45px;
  position: absolute;
  z-index: 9999;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  background: rgba(0, 0, 0, 0.4);
}
.text-align-center {
  text-align: center;
}
.location-icon {
  flex: 1;
}
.message-icon {
  flex: 1;
}
.search-icon {
  flex: 3;
  width: 300px;
  height: 26px;
  line-height: 26px;
  background: #fff;
  border-radius: 20px;
  font-size: 12px;
  color: #999;
}
.tab-item-play-swiper {
  width: 100%;
  height: 100%;
}
.tab-item-play-content {
  width: 100%;
  min-height: 200px;
  height: auto;
  background: #999;
}
.scenic-name {
  font-size: 12px;
}
</style>