<template>
  <div class="tab-personal-center-wrap" :style="heightSty">
    <TabPersonCenterHeader></TabPersonCenterHeader>
    <AppUserInfo></AppUserInfo>
    <Cell class="margin-top-10px" :cellList="cellListToolsA"></Cell>
    <Cell class="margin-top-10px" :cellList="cellListToolsB"></Cell>
    <Cell class="margin-top-10px" :cellList="cellListToolsC"></Cell>
  </div>
</template>

<script>
import TabPersonCenterHeader from "@/components/layout/TabItemPersonHeader.vue";
import AppUserInfo from "@/components/layout/AppUserInfo.vue";
import DividedArea from "@/components/common/DividedArea.vue";
import Cell from "@/components/common/Cell.vue";

export default {
  name: "",
  props: [""],
  data() {
    return {
      cellListToolsA: [
        {
          title: "通证",
          icon: "iconfont icontongzheng",
          link: "/usertoken"
        },
        {
          title: "积分",
          icon: "iconfont iconjifen",
          link: "/userintegral"
        }
      ],
      cellListToolsB: [
        {
          title: "购物车",
          icon: "iconfont icongouwuche",
          link: "/ShoppingCart"
        },
        {
          title: "商品订单",
          icon: "iconfont icondingdan",
          link: "/orderlist"
        },
        {
          title: "文创订单",
          icon: "iconfont iconwenhuashuli",
          link: "/orderlistcaiyuan?type=1"
        },
        {
          title: "艺创订单",
          icon: "iconfont iconyishuchuangzuo",
          link: "/orderlistcaiyuan?type=2"
        },
        {
          title: "溯源订单",
          icon: "iconfont iconchanpinsuyuan",
          link: "/orderlistcaiyuan?type=3"
        },
        {
          title: "我的门票",
          icon: "iconfont iconmenpiaodingdan",
          link: "/ticketsorder"
        }
      ],
      cellListToolsC: [
        {
          title: "收藏",
          icon: "iconfont iconshoucang",
          link: "/collection"
        },
        {
          title: "云相册",
          icon: "iconfont iconyunxiangce",
          link: "/photoalbum"
        }
      ]
    };
  },

  components: {
    TabPersonCenterHeader,
    AppUserInfo,
    DividedArea,
    Cell
  },

  computed: {
    heightSty(){
      return {
        height:document.documentElement.clientHeight - 45 + 'px'
      }
    }
  },

  beforeMount() {},

  mounted() {},

  methods: {},

  watch: {}
};
</script>
<style lang='css' scoped>
.tab-personal-center-wrap {
  width: 100%;
  overflow: hidden;
  overflow-y: scroll;
  background: #f5f5f5;
  padding-bottom: 10px;
  box-sizing: border-box;
}
.margin-top-10px {
  margin-top: 10px;
}
</style>