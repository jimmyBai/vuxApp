<template>
  <div class="express-info-wrap">
    <Header
      :titleContent="TitleObjData.titleContent"
      :showLeftBack="TitleObjData.showLeftBack"
      :showRightMore="TitleObjData.showRightMore"
    ></Header>
    <div class="express-info-con" :style="conHei">
      <Flow></Flow>
    </div>
  </div>
</template>

<script>
import Header from "@/components/common/Header";
import Flow from "@/components/common/Flow";

export default {
  name: "",
  props: [""],
  data() {
    return {
      TitleObjData: {
        titleContent: "物流追踪",
        showLeftBack: true,
        showRightMore: false
      }
    };
  },

  components: {
    Header,
    Flow
  },

  computed: {
    conHei() {
      return { height: document.documentElement.clientHeight - 45 + "px" };
    }
  },

  beforeMount() {},

  mounted() {},

  methods: {},

  watch: {}
};
</script>
<style lang='css' scoped>
.express-info-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.express-info-con {
  width: 100%;
  background: #f9f9f9;
  margin-top: 50px;
  overflow: hidden;
  overflow-y: scroll;
}
</style>