<template>
  <div class="user-message-list-wrap">
    <Header
      :titleContent="TitleObjData.titleContent"
      :showLeftBack="TitleObjData.showLeftBack"
      :showRightMore="TitleObjData.showRightMore"
    ></Header>
    <div class="user-message-list" :style="conStyle">
      <div
        class="user-message-list-for"
        v-for="(item,index) in contentList"
        :key="index"
        @click="getDetailsCon"
      >
        <p class="user-message-list-content-date">{{item.date}}</p>
        <div class="user-message-list-content">
          <p class="user-message-list-content-tit">{{item.title}}</p>
          <p class="user-message-list-content-con">{{item.content}}(点击查看详情)</p>
        </div>
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
        titleContent: "",
        showLeftBack: true,
        showRightMore: false
      },
      contentList: [
        {
          title: "卡戳app10.0发布了",
          content: "卡戳app10.0.0全新发布，全新的功能开发，全新的UI设计，带给您不一样的旅游体验",
          date: "2019-4-30"
        }
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
  created() {
    this.setHeaderTitle();
  },
  beforeMount() {},

  mounted() {},

  methods: {
    getDetailsCon() {
      this.$router.push("/messagelistdetails");
    },
    setHeaderTitle() {
      switch (this.$route.query.title) {
        case "systemannounce":
          this.TitleObjData.titleContent = "系统公告";
          break;
        case "ordernotice":
          this.TitleObjData.titleContent = "订单通知";
          break;
        case "usermessage":
          this.TitleObjData.titleContent = "个人消息";
          break;
        default:
          this.TitleObjData.titleContent = "";
          break;
      }
    }
  },

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
  padding: 0 15px;
  box-sizing: border-box;
  background: #f5f5f5;
  margin-top: 45px;
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
.conStyle {
}
</style>