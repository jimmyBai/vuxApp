<!-- 
头部组件
接收三个参数：showBackOptions,showRightOptions,titleContent
showBackOptions（布尔类型）：是否显示左侧返回操作
showRightOptions（布尔类型）：是否显示右侧更多操作
titleContent（string）：标题内容
 -->
<template>
  <div>
    <x-header
      :left-options="{showBack: showLeftBack,preventGoBack:true}"
      :right-options="{showMore: showRightMore}"
      @on-click-back="back"
      @on-click-more="showBottom"
      slot="header"
      style="width: 100%;position: absolute;left: 0;top: 0;z-index: 100;font-size: 20px;"
    >{{titleContent}}</x-header>
    <Popup :showRescue="showRescueP"></Popup>
    <actionsheet
      v-model="showShare"
      :menus="menus1"
      @on-click-menu="click"
      @on-after-hide="log('after hide')"
      @on-after-show="log('after show')"
    ></actionsheet>
  </div>
</template>

<script>
import { XHeader, TransferDom, Actionsheet } from "vux";
import Popup from "@/components/common/PupupRescue";
import { vueCordovaFunction } from "@/assets/js/vuecordova";
export default {
  props: ["titleContent", "showLeftBack", "showRightMore"],
  directives: {
    TransferDom
  },
  components: {
    XHeader,
    Popup,
    Actionsheet
  },
  data() {
    return {
      showRescueP: false,
      showShare: false,
      menus1: {
        menu1: "发送给朋友",
        menu2: "分享到朋友圈"
      }
    };
  },
  mounted() {
  },
  methods: {
    back() {
      this.$router.goBack();
    },
    showBottom() {
      if (this.$route.path === "/goodsdetails") {
        this.showShare = true;
      } else {
        this.showRescueP = true;
      }
    },
    log(str) {
      console.log(str);
    },
    click(key) {
      vueCordovaFunction.socialShare(this.$parent.goodsData);
    }
  }
};
</script>

<style>
.overwrite-title-demo {
  margin-top: 5px;
}
.vuex-header-wrap {
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 100;
  font-size: 16px;
}
</style>