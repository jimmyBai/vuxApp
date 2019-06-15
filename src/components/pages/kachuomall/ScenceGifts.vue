<template>
  <div class="scence-gifts-wrap">
    <Header
      :titleContent="TitleObjData.titleContent"
      :showLeftBack="TitleObjData.showLeftBack"
      :showRightMore="TitleObjData.showRightMore"
    ></Header>
    <div class="scence-gifts-content" :style="scenceGiftsContent">
      <TabItemMallAdvertise></TabItemMallAdvertise>
      <DividedArea></DividedArea>
      <FlexWrap :dataListCon="dataList" ref="dataList"></FlexWrap>
      <DividedArea></DividedArea>
      <Divider :content="title"></Divider>
      <GoodsList :goodList="goodsDataList"></GoodsList>
    </div>
  </div>
</template>

<script>
import Header from "@/components/common/Header";
import TabItemMallAdvertise from "@/components/layout/TabItemMallAdvertise";
import DividedArea from "@/components/common/DividedArea";
import FlexWrap from "@/components/layout/FlexWrap";
import Divider from "@/components/common/Divider";
import Scroll from "@/components/common/Scroller";
import GoodsList from "@/components/layout/GoodsList";
import { goodsBucketRecomm } from "@/servers/api";

export default {
  name: "",
  props: [""],
  data() {
    return {
      TitleObjData: {
        titleContent: "发布详情",
        showLeftBack: true,
        showRightMore: false
      },
      title: "精选好物",
      page: 0,
      list: [],
      refreshText: "下拉刷新",
      noDataText: "没有更多数据",
      dataList: [
        {
          name: "云雾山",
          link: "/scenceconsumdetails?title=云雾山&id=27&type=1&flag=1&carousel=18",
          icon:require("@/assets/images/scenic-icon/yunwushan.png")
        },
        {
          name: "神垕古镇",
          link: "/scenceconsumdetails?title=神垕古镇&id=26&type=1&flag=1&carousel=19",
          icon:require("@/assets/images/scenic-icon/shenhou.png")
        },
        {
          name: "少林寺",
          link: "/scenceconsumdetails?title=少林寺&id=25&type=1&flag=1&carousel=20",
          icon:require("@/assets/images/scenic-icon/shaolinsi.png")
        },
        {
          name: "徽州古城",
          link: "/scenceconsumdetails?title=徽州古城&id=23&type=1&flag=1&carousel=21",
          icon:require("@/assets/images/scenic-icon/huizhougucheng.png")
        },
        {
          name: "苍岩山",
          link: "/scenceconsumdetails?title=苍岩山&id=22&type=1&flag=1&carousel=22",
          icon:require("@/assets/images/scenic-icon/cangyanshan.png")
        },
        {
          name: "三孔",
          link: "/scenceconsumdetails?title=三孔&id=35&type=1&flag=1&carousel=23",
          icon:require("@/assets/images/scenic-icon/sankong.png")
        },
        {
          name: "蓬莱阁",
          link: "/scenceconsumdetails?title=蓬莱阁&id=24&type=1&flag=1&carousel=24",
          icon:require("@/assets/images/scenic-icon/penglaige.png")
        },
        {
          name: "云冈石窟",
          link: "/scenceconsumdetails?title=云冈石窟&id=66&type=1&flag=1&carousel=25",
          icon:require("@/assets/images/scenic-icon/yungang.png")
        }
      ],
      goodsDataList: []
    };
  },

  components: {
    Header,
    TabItemMallAdvertise,
    DividedArea,
    FlexWrap,
    Divider,
    Scroll,
    GoodsList
  },

  computed: {
    scenceGiftsContent() {
      return { height: document.documentElement.clientHeight - 45 + "px" };
    }
  },

  beforeMount() {},

  mounted() {
    this.setTitle();
    this.getGoodsComm();
    this.getBannerImgFn("5");
  },

  methods: {
    // 商品推荐
    getGoodsComm() {
      goodsBucketRecomm({
        type: 3
      })
        .then(res => {
          if (res.result === 1) {
            if (res.data.result) {
              this.goodsDataList = res.data.result;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    setTitle() {
      this.TitleObjData.titleContent = this.$route.query.title;
    },
    refresh(done) {
      console.log("refresh");
      setTimeout(() => {
        done();
      }, 2000);
    },
    pullup(done) {
      console.log("pullup");
      setTimeout(() => {
        done();
      }, 2000);
    }
  },

  watch: {}
};
</script>
<style lang='css' scoped>
.scence-gifts-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.scence-gifts-content {
  width: 100%;
  margin-top: 50px;
  background: #fff;
  overflow: hidden;
  overflow-y: scroll;
  box-sizing: border-box;
}
</style>