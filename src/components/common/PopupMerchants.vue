<template>
  <div v-transfer-dom>
    <popup v-model="isShow" :hide-on-blur="true" @on-hide="hide">
      <div class="popup2" v-show="showBottom">
        <div class="video" id="wrapper"></div>
        <div class="navigaion-video-detail-wrap">
          <p class="navigaion-video-detail-p">
            <span class="dot"></span>
            <span>{{descDetails.name}}</span>
          </p>
          <p class="navigaion-video-detail-con">特色：{{descDetails.product}}</p>
          <p class="navigaion-video-detail-con">描述：{{descDetails.content}}</p>
          <p class="navigaion-video-detail-con">联系人：{{descDetails.responsible}}</p>
          <p class="navigaion-video-detail-con">
            联系方式：
            <a :href="'tel:'+ descDetails.phone">{{descDetails.phone}}</a>
          </p>
          <p class="navigaion-video-detail-con">地址：{{descDetails.address}}</p>
        </div>
      </div>
    </popup>
  </div>
</template>

<script>
import ChimeeMobilePlayer from "chimee-mobile-player";
import "../../../node_modules/chimee-mobile-player/lib/chimee-mobile-player.browser.css";
import { TransferDom, Popup } from "vux";
import VideoPlayer from "@/components/common/VideoPlayer";
import { getScenicMerchantsDetails } from "@/servers/api";

export default {
  directives: {
    TransferDom
  },
  props: ["dataPosition"],
  components: {
    Popup,
    VideoPlayer
  },
  data() {
    return {
      show: false,
      isControls: true,
      content: "",
      descDetails: {},
      showBottom: false
    };
  },
  methods: {
    getScenicDetails(id) {
      getScenicMerchantsDetails({
        id: id
      })
        .then(res => {
          if (res.result === 1) {
            this.showBottom = true;
            if (res.data) {
              this.$store.commit("changeNavigationDetailsState", true);
              this.descDetails = res.data;
              if (res.data.video) {
                this.createVideoDom(true, res.data.video, res.data.video_image);
              }
            }
          } else {
            this.showBottom = false;
            this.$vux.toast.show({
              type: "text",
              text: "暂无介绍",
              time: 1000
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    hide() {
      this.$store.commit("changeNavigationDetailsState", false);
    },
    createVideoDom(flag, video, img) {
      new ChimeeMobilePlayer({
        wrapper: "#wrapper",
        src: video,
        autoplay: false,
        poster: img,
        controls: flag,
        playsInline: true,
        preload: "auto",
        x5VideoPlayerFullscreen: true,
        x5VideoOrientation: "landscape|portrait",
        xWebkitAirplay: true,
        muted: false,
        disableUA: [
          "Mozilla/5.0 (Linux; Android 4.4.2; HM NOTE 1TD Build/KOT49H; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/62.0.3202.97 Mobile Safari/537.36"
        ]
      });
    }
  },
  computed: {
    isShow: {
      get: function() {
        return this.$store.state.navigationDetails;
      },
      set: function() {}
    }
  },
  updated() {},
  watch: {}
};
</script>

<style lang="less" scoped>
@import "~vux/src/styles/close.less";

.popup2 {
  padding-bottom: 15px;
  height: 400px;
  overflow-x: hidden;
  overflow-y: scroll;
  background: #fff;
  box-sizing: border-box;
}
.navigaion-video-detail-wrap {
  padding: 10px;
  box-sizing: border-box;
}
.navigaion-video-detail-p {
  width: 100%;
  height: 20px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.dot {
  width: 6px;
  height: 6px;
  display: inline-block;
  border-radius: 50%;
  background: #222;
  margin-right: 6px;
}
.video {
  width: 100%;
  height: 200px;
  overflow: hidden;
}
</style>