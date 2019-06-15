<template>
  <div class="integral-desc-wrap">
    <Header
      :titleContent="TitleObjData.titleContent"
      :showLeftBack="TitleObjData.showLeftBack"
      :showRightMore="TitleObjData.showRightMore"
    ></Header>
    <div class="content-wrap" :style="conHei">
      <sticky :check-sticky-support="false" :offset="46">
        <tab :line-width="3" custom-bar-width="40px">
          <tab-item
            :selected="selItem === item"
            v-for="(item, index) in list"
            @on-item-click="tabItemClick"
            :key="index"
          >{{item}}</tab-item>
        </tab>
        <div class="tab-item-wrap">
          <img :src="imgUrl" alt srcset>
        </div>
      </sticky>
    </div>
  </div>
</template>

<script>
import Header from "@/components/common/Header";
import IntegralRule from "@/components/layout/IntegralRule";
import {
  Tab,
  TabItem,
  Sticky,
  Divider,
  XButton,
  Swiper,
  SwiperItem
} from "vux";
export default {
  name: "",
  props: [""],
  data() {
    return {
      TitleObjData: {
        titleContent: "积分说明",
        showLeftBack: true,
        showRightMore: false
      },
      list: ["积分获取", "积分消耗"],
      selItem: "积分获取",
      imgUrl:
        "http://kcapp.oss-cn-beijing.aliyuncs.com/appx/credit/credit-get.png"
    };
  },

  components: {
    Header,
    IntegralRule,
    Tab,
    TabItem,
    Sticky,
    Divider,
    XButton,
    Swiper,
    SwiperItem
  },

  computed: {
    conHei() {
      return { height: document.documentElement.clientHeight - 45 + "px" };
    }
  },

  beforeMount() {},

  mounted() {},

  methods: {
    tabItemClick(val) {
      if (val === 0) {
        this.imgUrl =
          "http://kcapp.oss-cn-beijing.aliyuncs.com/appx/credit/credit-get.png";
      } else {
        this.imgUrl =
          "http://kcapp.oss-cn-beijing.aliyuncs.com/appx/credit/credit-give.png";
      }
    }
  },

  watch: {}
};
</script>
<style lang='css' scoped>
.integral-desc-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.content-wrap {
  width: 100%;
  margin-top: 50px;
  background: #f9f9f9;
  overflow: hidden;
  overflow-y: scroll;
}
.tab-item-wrap {
  width: 100%;
  height: 100%;
  padding: 15px;
  box-sizing: border-box;
  overflow: hidden;
  overflow-y: scroll;
}
</style>