<!--
 * @Description: 
 * @Author: lpb
 * @Github: https://github.com/lpb273
 * @LastEditors: lpb
 * @Date: 2019-05-07 11:08:15
 * @LastEditTime: 2019-05-07 11:10:57
 -->
<template>
  <div class="photo-album-wrap">
    <Header
      :titleContent="TitleObjData.titleContent"
      :showLeftBack="TitleObjData.showLeftBack"
      :showRightMore="TitleObjData.showRightMore"
    ></Header>
    <div class="photo-album-content" :style="conHei">
      <tab :line-width="3" custom-bar-width="50px">
        <tab-item selected @on-item-click="onItemClick">文创征集</tab-item>
        <tab-item @on-item-click="onItemClick">艺品创作</tab-item>
        <tab-item @on-item-click="onItemClick">产品溯源</tab-item>
      </tab>
      <div>
        <InitMap ref="map"></InitMap>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/common/Header";
import InitMap from "@/components/common/InitMap";
import { Tab, TabItem } from "vux";
export default {
  name: "",
  props: [""],
  data() {
    return {
      TitleObjData: {
        titleContent: "抢单",
        showLeftBack: true,
        showRightMore: false
      },
      tabIndex: 1
    };
  },

  components: {
    Header,
    Tab,
    TabItem,
    InitMap
  },

  computed: {
    conHei() {
      return { height: document.documentElement.clientHeight - 45 + "px" };
    }
  },

  beforeMount() {},

  mounted() {},

  methods: {
    onItemClick(index) {
      this.tabIndex = index + 1;
      if (index === 2) {
        this.$refs.map.getSYData();
      } else {
        this.$refs.map.getScenceDataMark();
      }
    }
  },

  watch: {}
};
</script>
<style lang='css' scoped>
.photo-album-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.photo-album-content {
  width: 100%;
  background: #f9f9f9;
  margin-top: 45px;
  overflow: hidden;
  overflow-y: scroll;
  box-sizing: border-box;
}
.tip {
  width: 100%;
  height: 20px;
  line-height: 20px;
  text-align: center;
}
</style>