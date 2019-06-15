<template>
  <div class="video-details-wrap">
    <Header
      :titleContent="TitleObjData.titleContent"
      :showLeftBack="TitleObjData.showLeftBack"
      :showRightMore="TitleObjData.showRightMore"
    ></Header>
    <div class="information-content-wrap" :style="informationContent">
      <div class="video" id="wrapper"></div>
      <GiveLike
        :praiseNum="praiseNum"
        :clickState="clickState"
        v-on:changePhriseState="refreshData"
      ></GiveLike>
      <DividedArea></DividedArea>
      <CommentList
        :id="currentId"
        :pullDownRefreshObj="pullDownRefreshObj"
        :dataList.sync="commitDataList"
        :scrollTop="340"
        :scrollSty="scrollStyle"
        class="commit-list"
      ></CommentList>
      <Comments v-on:pushCommition="updateCommintList"></Comments>
    </div>
  </div>
</template>

<script>
let count = 1;
import ChimeeMobilePlayer from "chimee-mobile-player";
import "../../../../node_modules/chimee-mobile-player/lib/chimee-mobile-player.browser.css";
import Header from "@/components/common/Header";
import VideoPlayer from "@/components/common/VideoPlayer";
import DividedArea from "@/components/common/DividedArea";
import GiveLike from "@/components/common/GiveLike";
import Comments from "@/components/common/Comments";
import CommentList from "@/components/layout/CommentList";
import { ScenceVideoDetails } from "@/servers/api";

export default {
  name: "",
  props: [""],
  data() {
    return {
      TitleObjData: {
        titleContent: "",
        showLeftBack: true,
        showRightMore: false
      },
      pullDownRefreshObj: {
        threshold: 70,
        stop: 40
      },
      videoObj: {},
      commitDataList: [],
      videoId: "",
      clickState: 0,
      praiseNum: 0
    };
  },

  components: {
    Header,
    VideoPlayer,
    DividedArea,
    GiveLike,
    CommentList,
    Comments
  },

  computed: {
    informationContent() {
      return { height: document.documentElement.clientHeight - 50 + "px" };
    },
    currentId() {
      return this.$route.query.id;
    },
    scrollStyle() {
      return {
        height: document.documentElement.clientHeight - 300 + "px",
        top: "340px"
      };
    }
  },

  beforeMount() {},

  mounted() {
    this.getDetails();
  },

  methods: {
    //更新评论数据列表
    updateCommintList() {
      this.videoId = this.$route.query.id;
      ScenceVideoDetails({
        id: this.$route.query.id,
        type: this.$route.query.type
      })
        .then(res => {
          if (res.result === 1) {
            if (res.data.comment.length) {
              this.commitDataList = res.data.comment;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 更新点赞状态
    refreshData() {
      this.videoId = this.$route.query.id;
      ScenceVideoDetails({
        id: this.$route.query.id,
        type: this.$route.query.type
      })
        .then(res => {
          if (res.data.video) {
            this.clickState = res.data.video.type;
            this.praiseNum = res.data.video.praise_num;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 初始化数据
    getDetails() {
      this.videoId = this.$route.query.id;
      ScenceVideoDetails({
        id: this.$route.query.id,
        type: this.$route.query.type
      })
        .then(res => {
          if (res.result === 1) {
            if (res.data.video) {
              this.createVideoDom(true, res.data.video);
              this.clickState = res.data.video.type;
              this.praiseNum = res.data.video.praise_num;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    createVideoDom(flag, videoObj) {
      new ChimeeMobilePlayer({
        wrapper: "#wrapper",
        src: videoObj.video_url,
        autoplay: false,
        poster: videoObj.video_img,
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

  watch: {}
};
</script>
<style lang='css' scoped>
.video-details-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  overflow-y: scroll;
}
.information-content-wrap {
  width: 100%;
  margin-top: 50px;
  overflow: hidden;
  overflow-y: scroll;
}
.video {
  width: 100%;
  height: 200px;
  overflow: hidden;
}
</style>