<template>
  <div v-transfer-dom>
    <popup v-model="isShow" :hide-on-blur="true" @on-hide="hide">
      <div class="popup2" v-show="showBottom">
        <div class="video" id="wrapper"></div>
        <div class="navigaion-video-detail-wrap">
          <p class="navigaion-video-detail-p">
            <span class="dot"></span>
            <span>{{dataPosition.name}}</span>
          </p>
          <p class="navigaion-video-detail-con">{{content}}</p>
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
import { getScenicPointDetails } from "@/servers/api";

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
      showBottom: true
    };
  },
  methods: {
    getScenicDetails(obj) {
      this.descDetails = null;
      getScenicPointDetails({
        longitude: obj.lng,
        latitude: obj.lat
      })
        .then(res => {
          console.log(res);
          if (res.result === 1) {
            this.showBottom = true;
            if (res.data) {
              this.$store.commit("changeNavigationDetailsState", true);
              this.descDetails = res.data;
              this.content = res.data.content;
              this.createVideoDom(true, res.data);
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
    createVideoDom(flag, videoObj) {
      new ChimeeMobilePlayer({
        wrapper: "#wrapper",
        src: videoObj.scenic_video,
        autoplay: false,
        poster: videoObj.scenic_image,
        controls: flag,
        playsInline: true,
        preload: "auto",
        x5VideoPlayerFullscreen: true,
        x5VideoOrientation: "landscape|portrait",
        xWebkitAirplay: true,
        muted: false
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