<template>
  <div class="tab-item-mall-wrap">
    <TabItemMallHeader></TabItemMallHeader>
    <TabItemMallAdvertise></TabItemMallAdvertise>
    <CellDivider :cellList="cellListTools" class="tab-item-mall-tools-wrap"></CellDivider>
    <DividedArea></DividedArea>
    <Divider :content="dividerContent"></Divider>
    <GoodsList :goodList="goodsListData"></GoodsList>
  </div>
</template>

<script>
import TabItemMallHeader from "@/components/layout/TabItemMallHeader";
import TabItemMallAdvertise from "@/components/layout/TabItemMallAdvertise";
import DividedArea from "@/components/common/DividedArea";
import CellDivider from "@/components/common/CellDivider";
import Divider from "@/components/common/Divider";
import GoodsList from "@/components/layout/GoodsList";
import { goodsBucketRecomm } from "@/servers/api";

export default {
  name: "",
  props: [""],
  data() {
    return {
      cellListTools: [
        {
          title: "品类视频",
          icon: "iconfont iconpinleishipin",
          link: "/goodsVideoclassify?title=品类视频"
        },
        {
          title: "景区消费",
          icon: "iconfont iconjingquxiaofei",
          link: "/scenceconsum?title=景区消费&carousel=4"
        },
        {
          title: "景区好礼",
          icon: "iconfont iconjingquhaoli",
          link: "/scencegifts?title=景区好礼&carousel=5"
        },
        {
          title: "名家妙藏",
          icon: "iconfont iconmingjiamiaocang",
          link: "/famouscollection?title=名家妙藏&carousel=6"
        }
      ],
      dividerContent: "猜你喜欢",
      goodsListData: []
    };
  },

  components: {
    TabItemMallHeader,
    TabItemMallAdvertise,
    DividedArea,
    CellDivider,
    Divider,
    GoodsList
  },

  computed: {},

  beforeMount() {},

  mounted() {
    this.getGoodsComm();
  },

  methods: {
    // 商品推荐
    getGoodsComm() {
      goodsBucketRecomm({
        type: 2
      })
        .then(res => {
          if (res.result === 1) {
            this.goodsListData = res.data.result;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },

  watch: {}
};
</script>
<style lang='css' scoped>
.tab-item-mall-wrap {
  padding-bottom: 30px;
  box-sizing: border-box;
}
</style>