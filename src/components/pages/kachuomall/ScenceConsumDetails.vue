<template>
  <div class="scence-consum-wrap">
    <Header
      :titleContent="TitleObjData.titleContent"
      :showLeftBack="TitleObjData.showLeftBack"
      :showRightMore="TitleObjData.showRightMore"
    ></Header>
    <div class="scence-consum-content" :style="scenceConsumHeight">
      <TabItemMallAdvertise class="z-index-99"></TabItemMallAdvertise>
      <DividedArea class="z-index-99"></DividedArea>
      <!-- <Divider :content="title"></Divider> -->
      <tab :line-width="3" custom-bar-width="30px" class="tab-style" v-if="showTab != 2">
        <tab-item selected @on-item-click="getTabIndex">商城</tab-item>
      </tab>
      <tab :line-width="3" custom-bar-width="30px" class="tab-style" v-else-if="showTab == 2">
        <tab-item selected @on-item-click="getTabIndex">商城</tab-item>
        <tab-item @on-item-click="getTabIndex">动态</tab-item>
      </tab>
      <GoodsListWrap class="tab-content" v-if="tabIndex === 0"></GoodsListWrap>
      <FamousActivity class="tab-content" v-if="tabIndex === 1"></FamousActivity>
    </div>
  </div>
</template>

<script>
import { Tab, TabItem } from "vux";
import Header from "@/components/common/Header";
import TabItemMallAdvertise from "@/components/layout/TabItemMallAdvertise";
import DividedArea from "@/components/common/DividedArea";
import Divider from "@/components/common/Divider";
import Scroll from "@/components/common/Scroller";
import GoodsList from "@/components/layout/GoodsList";
import GoodsListWrap from "@/components/layout/GoodsListWrap";
import FamousActivity from "@/components/layout/FamousActivity";

export default {
  name: "",
  props: [""],
  data() {
    return {
      title: "",
      TitleObjData: {
        titleContent: "",
        showLeftBack: true,
        showRightMore: false
      },
      page: 0,
      list: [],
      refreshText: "下拉刷新",
      noDataText: "没有更多数据",
      tabIndex: 0
    };
  },

  components: {
    Header,
    TabItemMallAdvertise,
    DividedArea,
    Divider,
    Scroll,
    GoodsList,
    GoodsListWrap,
    Tab,
    TabItem,
    FamousActivity
  },

  computed: {
    scenceConsumHeight() {
      return { height: document.documentElement.clientHeight - 45 + "px" };
    },
    showTab() {
      return this.$route.query.type;
    }
  },

  beforeMount() {},

  mounted() {
    this.setTitle();
  },

  methods: {
    getTabIndex(index) {
      this.tabIndex = index;
    },
    setTitle() {
      this.title = this.$route.query.title;
    }
  },

  watch: {}
};
</script>
<style lang='css' scoped>
.z-index-99 {
  position: relative;
  z-index: 999;
}
.scence-consum-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.scence-consum-content {
  width: 100%;
  overflow: hidden;
  margin-top: 45px;
}
.scence-release-content {
  width: 100%;
  margin-top: 310px;
}
.tab-style {
  position: relative;
  z-index: 999;
}
.tab-content {
  padding-top: 10px;
  box-sizing: border-box;
}
</style>