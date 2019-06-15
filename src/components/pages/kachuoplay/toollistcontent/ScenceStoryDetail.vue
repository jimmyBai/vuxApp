<template>
  <div>
    <Header
      :titleContent="TitleObjData.titleContent"
      :showLeftBack="TitleObjData.showLeftBack"
      :showRightMore="TitleObjData.showRightMore"
    ></Header>
    <div class="scence-story-wrap" :style="contentHeight">
      <div class="video" id="wrapper"></div>
      <ScenceStoryDetailDesc :dataObj="videoData" class="z-index-999"></ScenceStoryDetailDesc>
      <DividedArea></DividedArea>
      <div class="scence-story-goods-title z-index-999">
        <span style="font-size:16px;font-weight:bold">相关作品</span>
        <span style="color:#999">查看更多</span>
      </div>
      <HorizontalScroller class="scroll" :goodsList="goodsDataList"></HorizontalScroller>
      <DividedArea></DividedArea>
      <CommentList
        :id="currentId"
        :dataList.sync="commitDataList"
        class="commit-list"
      ></CommentList>
    </div>
    <Comments v-on:pushCommition="updateCommintList"></Comments>
  </div>
</template>

<script>
import ChimeeMobilePlayer from "chimee-mobile-player";
import Header from "@/components/common/Header";
import VideoPlayer from "@/components/common/VideoPlayer";
import ScenceStoryDetailDesc from "@/components/layout/ScenceStoryDetailDesc";
import DividedArea from "@/components/common/DividedArea";
import HorizontalScroller from "@/components/common/HorizontalScroller";
import CommentList from "@/components/layout/ClickGetPageDataPlayRL";
import Comments from "@/components/common/Comments";
import { ScenceRememberAndLearnDetails } from "@/servers/api";

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
      videoData: {},
      currentId: "",
      pullDownRefreshObj: {
        threshold: 30,
        stop: 30
      },
      commitDataList: [],
      imgListObj: {
        ImgList: [],
        index: 0,
        dotsPosition: "center",
        loop: true,
        auto: true,
        height: "220px"
      },
      goodsDataList: []
    };
  },

  components: {
    Header,
    VideoPlayer,
    ScenceStoryDetailDesc,
    DividedArea,
    HorizontalScroller,
    CommentList,
    Comments
  },

  computed: {
    contentHeight() {
      return { height: document.documentElement.clientHeight - 90 + "px" };
    }
  },

  beforeMount() {},

  mounted() {
    this.getData();
  },

  methods: {
    //更新评论数据列表
    updateCommintList() {
      let arr = [];
      ScenceRememberAndLearnDetails({
        id: this.$route.query.id,
        type: this.$route.query.branch,
        page: 1
      })
        .then(res => {
          // console.log(res);
          if (res.result === 1) {
            if (res.data.comment.length) {
              arr = JSON.parse(JSON.stringify(res.data.comment));
            }
          }
          this.commitDataList = arr;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 初始化数据
    getData() {
      this.currentId = this.$route.query.id;
      ScenceRememberAndLearnDetails({
        id: this.$route.query.id,
        type: this.$route.query.branch,
        page: 1
      })
        .then(res => {
          // console.log(res);
          let arr = [];
          if (res.result === 1) {
            if (res.data.video) {
              this.createVideoDom(true, res.data.video);
              this.clickState = res.data.video.type;
              this.praiseNum = res.data.video.praise_num;
              this.videoData = res.data.video;
              this.goodsDataList = res.data.goods;
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
.z-index-999 {
  position: relative;
  z-index: 999;
  background: #fff;
}
.video-player-wrap {
  width: 100%;
  height: 200px;
}
.scence-story-wrap {
  margin-top: 45px;
  overflow: hidden;
  overflow-y: scroll;
  background: #fff;
}
.scence-story-goods-title {
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  position: relative;
  z-index: 999;
}
.video {
  width: 100%;
  height: 200px;
  overflow: hidden;
}
.scroll {
  width: 100%;
  height: 90px;
  background: #fff;
  position: relative;
  z-index: 999;
}
.commit-list {
  width: 100%;
  height: 130px;
  background: #fff;
}
</style>