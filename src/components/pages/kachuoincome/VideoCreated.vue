<template>
  <div class="video-create-wrap">
    <x-header
      :left-options="{showBack: true,preventGoBack:true}"
      :right-options="{showMore: false}"
      @on-click-back="back"
      @on-click-more="showMenus = true"
      slot="header"
      style="width:100%;position:absolute;left:0;top:0;z-index:100;"
    >
      视频创作
      <a slot="right" @click="releaseContent">发布</a>
    </x-header>
    <div class="video-create-content" :style="contentSty">
      <main class="position-box">
        <vue-better-scroll
          class="wrapper"
          ref="scroll"
          :scrollbar="scrollbarObj"
          :pullDownRefresh="pullDownRefreshObj"
          :pullUpLoad="pullUpLoadObj"
          :startY="parseInt(startY)"
          @pullingDown="onPullingDown"
          @pullingUp="onPullingUp"
        >
          <VideoListWrap :videoDataList="contentList"></VideoListWrap>
        </vue-better-scroll>
      </main>
    </div>
  </div>
</template>

<script>
let totalCount = 0;
import { XHeader } from "vux";
import VideoListWrap from "@/components/common/VideoListWrap";
import { VideoCreditList, SeourceCreatedList } from "@/servers/api";
import { InlineLoading } from "vux";
import { setTimeout } from "timers";
export default {
  name: "",
  props: [""],
  data() {
    return {
      scrollbarObj: {
        fade: true
      },
      pullDownRefreshObj: {
        threshold: 70,
        stop: 40
      },
      pullUpLoadObj: {
        threshold: 0,
        txt: {
          more: "加载更多",
          noMore: "没有更多数据了"
        }
      },
      startY: 0, // 纵轴方向初始化位置
      scrollToX: 0,
      scrollToY: 0,
      scrollToTime: 700,
      items: [],
      commentCount: 99,
      contentList: [],
      page: 1,
      totalNum: 0,
      noData: false
    };
  },

  components: {
    XHeader,
    VideoListWrap,
    InlineLoading
  },

  computed: {
    contentSty() {
      return { height: document.documentElement.clientHeight - 55 + "px" };
    }
  },

  beforeMount() {},

  mounted() {
    this.onPullingDown();
  },

  methods: {
    getVideoList() {
      return new Promise(resolve => {
        let arr = [];
        SeourceCreatedList({
          type: 9,
          page: this.page
        })
          .then(res => {
            console.log(res);
            if (res.result === 1) {
              totalCount = res.data.totalofnum;
              this.totalNum = res.data.totalofnum;
              this.noData =
                res.data.currentpage === res.data.totalpage ? true : false;
              if (res.data.comment.length) {
                arr = res.data.comment;
                resolve(res.data.comment);
              } else {
                this.$nextTick(() => {
                  this.$refs.scroll.forceUpdate(false);
                });
              }
            }
          })
          .catch(err => {
            console.log(err);
          });
      });
    },
    // 滚动到页面顶部
    scrollTo() {
      this.$refs.scroll.scrollTo(
        this.scrollToX,
        this.scrollToY,
        this.scrollToTime
      );
    },
    onPullingDown() {
      totalCount = 0;
      this.page = 1;
      this.getVideoList().then(res => {
        this.contentList = res;
        setTimeout(() => {
          this.$nextTick(() => {
            this.$refs.scroll.forceUpdate(true);
          });
        }, 1000);
      });
    },
    onPullingUp() {
      this.page += 1;
      this.getVideoList().then(res => {
        this.contentList = this.contentList.concat(res);
        if (this.contentList.length < totalCount) {
          this.$refs.scroll.forceUpdate(true);
        } else {
          this.$refs.scroll.forceUpdate(false);
        }
      });
    },
    releaseContent() {
      this.$router.push("/releasevideo??branch=9");
    },
    back() {
      this.$router.goBack();
    }
  },
  beforeDestroy() {},
  watch: {}
};
</script>
<style lang='css' scoped>
.video-create-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #fff;
}
.video-create-content {
  width: 100%;
  overflow: hidden;
  background: #fff;
  box-sizing: border-box;
  margin-top: 45px;
  position: absolute;
}
.position-box {
  width: 100%;
  height: 100%;
  position: absolute;
  background: #fff;
  padding-top: 6px;
  box-sizing: border-box;
  left: 0;
  top: 0;
  /* top: 340px;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  padding: 15px;
  box-sizing: border-box; */
}
</style>