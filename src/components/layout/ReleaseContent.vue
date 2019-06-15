<template>
  <div>
    <Header
      :titleContent="TitleObjData.titleContent"
      :showLeftBack="TitleObjData.showLeftBack"
      :showRightMore="TitleObjData.showRightMore"
    ></Header>
    <TextArea class="input-text-wrap"></TextArea>
  </div>
</template>

<script>

import Header from "@/components/common/Header";
import TextArea from "@/components/common/TextArea";

export default {
  name: "",
  props: [""],
  data() {
    return {
      TitleObjData: {
        titleContent: "发布",
        showLeftBack: true,
        showRightMore: false
      }
    };
  },

  components: {
    Header,
    TextArea
  },

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {},

  watch: {}
};
</script>
<style lang='css' scoped>
.input-text-wrap{
  margin-top: 45px;
  padding:10px;
  box-sizing: border-box;
}
</style>