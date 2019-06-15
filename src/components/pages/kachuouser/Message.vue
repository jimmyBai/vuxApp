<template>
  <div class="user-message-wrap">
    <Header
      :titleContent="TitleObjData.titleContent"
      :showLeftBack="TitleObjData.showLeftBack"
      :showRightMore="TitleObjData.showRightMore"
    ></Header>
    <CellDivider class="user-message-cell" :cellList="cellListTools"></CellDivider>
  </div>
</template>

<script>
import Header from "@/components/common/Header";
import CellDivider from "@/components/common/CellDivider";

export default {
  name: "",
  props: [""],
  data() {
    return {
      TitleObjData: {
        titleContent: "消息中心",
        showLeftBack: true,
        showRightMore: false
      },
      cellListTools: [
        {
          title: "系统公告",
          link: "/messagelist?title=systemannounce"
        },
        {
          title: "订单通知",
          link: "/messagelist?title=ordernotice"
        },
        {
          title: "个人消息",
          link: "/messagelist?title=usermessage"
        }
      ]
    };
  },

  components: {
    Header,
    CellDivider
  },

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {},

  watch: {}
};
</script>
<style lang='css' scoped>
.user-message-wrap {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
}
.user-message-cell{
  margin-top: 45px;
}
</style>