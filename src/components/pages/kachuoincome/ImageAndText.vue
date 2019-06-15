<!--
 * @Description: 
 * @Author: lpb
 * @Github: https://github.com/lpb273
 * @LastEditors: lpb
 * @Date: 2019-03-15 13:34:24
 * @LastEditTime: 2019-05-07 09:10:31
 -->
<template>
  <div class="img-and-text-wrap">
    <x-header
      :left-options="{showBack: true,preventGoBack:true}"
      :right-options="{showMore: false}"
      @on-click-back="back"
      @on-click-more="showMenus = true"
      slot="header"
      style="width:100%;position:absolute;left:0;top:0;z-index:100;"
    >
      <a slot="right" @click="releaseContent" style="font-size:16px">发布</a>
    </x-header>
    <div class="img-and-text-content" :style="conHeight">
      <ImgAndTxtList></ImgAndTxtList>
    </div>
  </div>
</template>

<script>
import { XHeader } from "vux";
import ImgAndTxtList from "@/components/layout/ImgAndTxtList";
import DividedArea from "@/components/common/DividedArea";
import Scroll from "@/components/common/Scroller";

export default {
  name: "",
  props: [""],
  data() {
    return {
      page: 0,
      list: []
    };
  },

  components: {
    XHeader,
    ImgAndTxtList,
    DividedArea,
    Scroll
  },

  computed: {
    conHeight() {
      return { height: document.documentElement.clientHeight - 45 + "px" };
    }
  },

  beforeMount() {},

  mounted() {

  },

  methods: {
    back() {
      this.$router.goBack();
    },
    releaseContent() {
      this.$router.push("/releaseimgandtext?branch=10");
    }
  },

  watch: {}
};
</script>
<style lang='css' scoped>
.img-and-text-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.img-and-text-content {
  width: 100%;
  overflow: hidden;
  overflow-y: scroll;
  margin-top: 45px;
  height: 400px;
}
.scence-release-content {
  margin-top: 30px;
}
.position-box {
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>