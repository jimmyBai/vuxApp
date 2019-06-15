<template>
  <div class="user-interal-wrap">
    <Header
      :titleContent="TitleObjData.titleContent"
      :showLeftBack="TitleObjData.showLeftBack"
      :showRightMore="TitleObjData.showRightMore"
    ></Header>
    <div class="user-interal-content-wrap" :style="consty">
      <div class="user-interal-desc">
        <p class="tip">当前积分</p>
        <p class="num">
          <span style="position:relative;top:-20px">{{userInfo.credit1}}</span>
        </p>
      </div>
      <CellDivider :cellList="cellListTools" class="user-interal-wrap-tools-wrap"></CellDivider>
    </div>
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
        titleContent: "积分",
        showLeftBack: true,
        showRightMore: false
      },
      cellListTools: [
        // {
        //   title: "签到领积分",
        //   icon: "iconfont iconqiandaolingjifen",
        //   link: "/signin"
        // },
        {
          title: "积分说明",
          icon: "iconfont iconjifenshuoming",
          link: "/integraldesc"
        }
      ]
    };
  },

  components: {
    Header,
    CellDivider
  },

  computed: {
    consty() {
      return { height: document.documentElement.clientHeight - 45 + "px" };
    },
    userInfo() {
      // return this.GLOBAL.getSession("userLoginInfo");
      return this.$store.state.userLoginInfo;
    }
  },
  created() {
    // this.getUserInfo();
  },
  beforeMount() {},

  mounted() {},

  methods: {

  },

  watch: {}
};
</script>
<style lang='css' scoped>
.user-interal-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.user-interal-content-wrap {
  width: 100%;
  margin-top: 50px;
  background: #f9f9f9;
}
.user-interal-desc {
  width: 100%;
  height: 200px;
  background: #4a74fe;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.tip {
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-left: 10px;
  box-sizing: border-box;
}
.num {
  flex: 4;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 30px;
}
</style>