<template>
  <div class="scence-service-wrap">
    <Header
      :titleContent="TitleObjData.titleContent"
      :showLeftBack="TitleObjData.showLeftBack"
      :showRightMore="TitleObjData.showRightMore"
    ></Header>
    <div class="scence-service-content" :style="serviceContentHeight">
      <AMap class="scence-service-map" ref="map" :mapHeight="mapHeight"></AMap>
      <NavigationTab :dataList="tabList" v-on:changePath="showPath"></NavigationTab>
    </div>
  </div>
</template>

<script>
import Header from "@/components/common/Header";
import AMap from "@/components/common/AMap";
import Tab from "@/components/common/Tab";
import TabContentLoop from "@/components/layout/TabContentLoop";
import NavigationTab from "@/components/common/NavigationTab";

export default {
  name: "",
  props: [""],
  data() {
    return {
      TitleObjData: {
        titleContent: "周边服务",
        showLeftBack: true,
        showRightMore: false
      },
      tabList: ["美食", "休闲", "酒店", "娱乐"],
      dataList: [],
      positionArr: []
    };
  },
  components: {
    Header,
    AMap,
    Tab,
    TabContentLoop,
    NavigationTab
  },

  computed: {
    serviceContentHeight() {
      return { height: document.documentElement.clientHeight - 45 + "px" };
    },
    mapHeight() {
      return { height: document.documentElement.clientHeight - 90 + "px" };
    }
  },

  beforeMount() {},

  mounted() {
    this.$refs.map.getMapCenterPosition("4");
  },

  methods: {
    showPath(index) {
      let type = index + 4;
      this.$refs.map.getMapCenterPosition(type);
    }
  },

  watch: {}
};
</script>
<style lang='css' scoped>
.scence-service-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.scence-service-content {
  width: 100%;
}
.scence-service-map {
  width: 100%;
  overflow: hidden;
  margin-top: 45px;
}
.scence-service-tab {
  width: 100%;
  height: 200px;
}
</style>