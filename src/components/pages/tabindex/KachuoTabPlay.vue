<template>
  <div>
    <FaceToast></FaceToast>
    <div class="tab-item-paly-wrap">
      <TabItemPlayHeader></TabItemPlayHeader>
      <TabItemPlayContent></TabItemPlayContent>
    </div>
  </div>
</template>

<script>
import TabItemPlayHeader from "@/components/layout/TabItemPlayHeader";
import TabItemPlayContent from "@/components/layout/TabItemPlayContent";
import FaceToast from "@/components/layout/FaceToast";
export default {
  name: "",
  props: [""],
  data() {
    return {};
  },

  components: {
    TabItemPlayHeader,
    TabItemPlayContent,
    FaceToast
  },

  computed: {},

  beforeMount() {},

  mounted() {
    this.getBannerImgFn("2");
  },

  methods: {},

  watch: {}
};
</script>
<style lang='css' scoped>
.tab-item-paly-wrap {
  background: #f5f5f5;
}
</style>