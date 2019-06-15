<!--
 * @Description: 
 * @Author: lpb
 * @Github: https://github.com/lpb273
 * @LastEditors: lpb
 * @Date: 2019-02-27 10:33:25
 * @LastEditTime: 2019-05-07 11:10:20
 -->
<template>
  <div class="tab-item-mall-wrap">
    <TabItemIncomeHeader></TabItemIncomeHeader>
    <TabItemMallAdvertise></TabItemMallAdvertise>
    <CellDivider :cellList="cellListTools" class="tab-item-mall-tools-wrap"></CellDivider>
  </div>
</template>

<script>
import TabItemIncomeHeader from "@/components/layout/TabItemIncomeHeader";
import TabItemMallAdvertise from "@/components/layout/TabItemMallAdvertise";
import DividedArea from "@/components/common/DividedArea";
import CellDivider from "@/components/common/CellDivider";

export default {
  name: "",
  props: [""],
  data() {
    return {
      cellListTools: [
        {
          title: "邀约创作",
          icon: "iconfont iconcaiyuangongxiang",
          link: "/yaoyuechuangzuo"
        },
        {
          title: "视频创作",
          icon: "iconfont iconshipinchuangzuo",
          link: "/videocreated?branch=9"
        },
        {
          title: "图文随记",
          icon: "iconfont icontuwensuiji",
          link: "/imageandtext?branch=10"
        },
        {
          title: "百家讲坛",
          icon: "iconfont iconbaijiajiangtang",
          link: "/hundredshall?branch=8"
        }
      ]
    };
  },

  components: {
    TabItemIncomeHeader,
    TabItemMallAdvertise,
    DividedArea,
    CellDivider
  },

  computed: {},

  beforeMount() {},

  mounted() {
    this.getBannerImgFn("12");
  },

  methods: {
    previewMethod() {},
    addImageMethod() {},
    removeImageMethod() {}
  },

  watch: {}
};
</script>
<style lang='css' scoped>
.tab-item-mall-wrap {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
}
</style>