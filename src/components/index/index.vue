<template>
  <div class="view-box-wrap">
    <TabContent></TabContent>
    <Kachuo-Bottom-Tab></Kachuo-Bottom-Tab>
  </div>
</template>

<script>
import { XHeader, TransferDom } from "vux";
import TabContent from "@/components/layout/TabContent";
import Header from "@/components/common/Header";
import KachuoBottomTab from "@/components/pages/tabindex/KachuoBottomTab";
import Vue from "vue";
import { getLocation } from "@/assets/js/tools";

export default {
  directives: {
    TransferDom
  },
  name: "app",
  data() {
    return {
      title: "",
      showBackOptions: false,
      showRightOptions: false,
      cordova: Vue.cordova
    };
  },
  components: {
    XHeader,
    Header,
    KachuoBottomTab,
    TabContent
  },
  methods: {
    // 判断当前路由，浏览器刷新路由不变
    changeVuexCurrentRoute() {
      this.$store.commit("changeCurrentRouteVal", this.$route.path);
    }
  },
  created() {},
  mounted() {
    this.changeVuexCurrentRoute();
  },
  computed: {
    showCurrentTitle() {
      return this.$store.state.titleObj;
    }
  },
  watch: {}
};
</script>

<style lang="less">
.view-box-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
