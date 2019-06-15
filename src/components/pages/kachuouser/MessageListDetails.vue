<template>
  <div class="user-message-list-wrap">
    <Header
      :titleContent="TitleObjData.titleContent"
      :showLeftBack="TitleObjData.showLeftBack"
      :showRightMore="TitleObjData.showRightMore"
    ></Header>
    <div class="user-message-list" :style="conStyle">
      <div class="content-desc">
        <p class="conTitle">卡戳APP10.0.0发布了</p>
        <p v-for="(item,index) in contentList" :key="index">{{index+1}}.{{item}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/common/Header";

export default {
  name: "",
  props: [""],
  data() {
    return {
      TitleObjData: {
        titleContent: "详情",
        showLeftBack: true,
        showRightMore: false
      },
      contentList: [
        "全新的功能，全新的UI设计。",
        "接入景区门票系统，让您享受全网最低的折扣。",
        "智慧导航带给您不一样的景区游览路线。",
        "景区服务，周边服务快速定位不同的需求。",
        "记住的，了解的带您深刻了解景区独特文化。",
        "视频创作，图文随记，让您随时随地记录所见所闻所感。",
        "百家讲坛带您体会专家的文化解读。"
      ]
    };
  },

  components: {
    Header
  },

  computed: {
    conStyle() {
      return { height: document.documentElement.clientHeight - 45 + "px" };
    }
  },
  created() {},
  beforeMount() {},

  mounted() {},

  methods: {},

  watch: {}
};
</script>
<style lang='css' scoped>
.user-message-list-wrap {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
}
.user-message-list {
  width: 100%;
  overflow: hidden;
  overflow-y: scroll;
  padding: 15px;
  box-sizing: border-box;
  background: #f5f5f5;
  margin-top: 45px;
}
.content-desc{
  width: 100%;
  height: 100%;
  background: #fff;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 4px;
  line-height: 30px;
}
.user-message-list-content {
  width: 100%;
  height: 90px;
  background: #fff;
  font-size: 14px;
  padding: 10px;
  box-sizing: border-box;
  word-break: break-all;
  border-radius: 4px;
}
.user-message-list-content-tit {
  width: 100%;
  height: 30px;
  line-height: 30px;
  font-weight: bold;
  text-overflow: ellipsis;
  overflow: hidden;
}
.user-message-list-content-con {
  width: 100%;
  height: 40px;
  line-height: 20px;
  overflow: hidden;
  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
.user-message-list-content-date {
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: #999;
}
.user-message-list-for {
  margin-bottom: 20px;
}
.conTitle {
  width: 100%;
  height: 30px;
  text-align: center;
  line-height: 30px;
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: bold;
  border-bottom: 1px solid #eee;
}
</style>