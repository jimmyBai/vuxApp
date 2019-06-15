<template>
  <tab
    v-model="index"
    prevent-default
    @on-before-index-change="switchTabItem"
    @on-item-click="onItemClick"
    custom-bar-width="40px"
  >
    <tab-item
      :selected="index === 0"
      @on-item-click="onItemClick"
      v-for="(item,index) in tabList"
      :key="index"
    >{{item}}</tab-item>
  </tab>
</template>

<script>
import { Tab, TabItem } from "vux";

export default {
  props: ["tabList"],
  components: {
    Tab,
    TabItem
  },
  data() {
    return {
      index: 0
    };
  },
  methods: {
    switchTabItem(index) {
      this.index = index;
      this.$emit("currentIndex",index);
      let orderState = "99";
      switch (index) {
        case 0:
          orderState = "99";
          break;
        case 1:
          orderState = "0";
          break;
        case 2:
          orderState = "1";
          break;
        case 3:
          orderState = "2";
          break;
        case 4:
          orderState = "3";
          break;
        default:
          return "";
      }
      this.$emit("changeTab", orderState);
    },
    onItemClick(index) {
      console.log("on item click:", index);
    }
  }
};
</script>

<style lang="less" scoped>
@import "~vux/src/styles/1px.less";
@import "~vux/src/styles/center.less";

.box {
  padding: 15px;
}
.active-6-1 {
  color: rgb(252, 55, 140) !important;
  border-color: rgb(252, 55, 140) !important;
}
.active-6-2 {
  color: #04be02 !important;
  border-color: #04be02 !important;
}
.active-6-3 {
  color: rgb(55, 174, 252) !important;
  border-color: rgb(55, 174, 252) !important;
}
.tab-swiper {
  background-color: #fff;
  height: 100px;
}
</style>