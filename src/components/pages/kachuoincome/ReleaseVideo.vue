<template>
  <div class="release-video-wrap">
    <Header
      :titleContent="TitleObjData.titleContent"
      :showLeftBack="TitleObjData.showLeftBack"
      :showRightMore="TitleObjData.showRightMore"
    ></Header>
    <div class="release-video-content-wrap" :style="contentHeight">
      <VideoUploaderSwap></VideoUploaderSwap>
    </div>
  </div>
</template>

<script>

import Header from "@/components/common/Header";
import VideoUploaderSwap from "@/components/layout/VideoUploaderSwap";

export default {
  name: "",
  props: [""],
  data() {
    return {
      TitleObjData: {
        titleContent: "发布",
        showLeftBack: true,
        showRightMore: false
      }
    };
  },

  components: {
    Header,
    VideoUploaderSwap
  },

  computed: {
    contentHeight() {
      return { height: document.documentElement.clientHeight - 50 + "px" };
    }
  },

  beforeMount() {},

  mounted() {},

  methods: {},

  watch: {}
};
</script>
<style lang='css' scoped>
.release-video-content-wrap {
  width: 100%;
  overflow: hidden;
  overflow-y: scroll;
  padding: 0 15px;
  box-sizing: border-box;
  margin-top: 50px;
}
</style>