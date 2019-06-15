<!-- 
头部组件
接收三个参数：showBackOptions,showRightOptions,titleContent
showBackOptions（布尔类型）：是否显示左侧返回操作
showRightOptions（布尔类型）：是否显示右侧更多操作
titleContent（string）：标题内容
 -->
<template>
  <x-header
    :left-options="{showBack: showLeftBack,preventGoBack:true}"
    :right-options="{showMore: showRightMore}"
    @on-click-back="back"
    @on-click-more="showMenus = true"
    slot="header"
    style="width:100%;position:absolute;left:0;top:0;z-index:100;"
  >
    {{titleContent}}
    <!-- <a slot="right" @click="releaseContent">发布</a> -->
  </x-header>
</template>

<script>
import { XHeader, TransferDom } from "vux";

export default {
  props: ["titleContent", "showLeftBack", "showRightMore"],
  directives: {
    TransferDom
  },
  components: {
    XHeader
  },
  data() {
    return {};
  },
  methods: {
    back() {
      this.$router.goBack();
    },
    releaseContent() {
      this.$router.push("/releasecontent");
    }
  }
};
</script>

<style>
.overwrite-title-demo {
  margin-top: 5px;
}
</style>