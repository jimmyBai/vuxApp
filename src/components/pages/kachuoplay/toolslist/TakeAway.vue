<template>
  <div class="take-away-wrap">
    <Header
      :titleContent="TitleObjData.titleContent"
      :showLeftBack="TitleObjData.showLeftBack"
      :showRightMore="TitleObjData.showRightMore"
    ></Header>
    <div class="take-away-conetnt" :style="takeAwayConetnt">
      <TabItemMallAdvertise></TabItemMallAdvertise>
      <DividedArea></DividedArea>
      <Divider :content="title"></Divider>
      <main class="position-box" :style="contentNoHeaderHeight">
        <vue-better-scroll
          class="wrapper"
          ref="scroll"
          :scrollbar="scrollbarObj"
          :pullDownRefresh="pullDownRefreshObj"
          :pullUpLoad="pullUpLoadObj"
          :startY="parseInt(startY)"
          @pullingDown="onPullingDown"
          @pullingUp="onPullingUp"
        >
          <GoodsList :goodList="items"></GoodsList>
        </vue-better-scroll>
      </main>
    </div>
  </div>
</template>

<script>
let totalCount = 0;
import Header from "@/components/common/Header";
import TabItemMallAdvertise from "@/components/layout/TabItemMallAdvertise";
import DividedArea from "@/components/common/DividedArea";
import Divider from "@/components/common/Divider";
import GoodsList from "@/components/layout/GoodsList";
import { TakeAwayGoodsList } from "@/servers/api";
export default {
  name: "",
  props: [""],
  data() {
    return {
      TitleObjData: {
        titleContent: "带走的",
        showLeftBack: true,
        showRightMore: false
      },
      title: "景区商城",
      page: 0,
      list: [],
      refreshText: "下拉刷新",
      noDataText: "没有更多数据",
      scrollbarObj: {
        fade: true
      },
      pullDownRefreshObj: {
        threshold: 70,
        stop: 40
      },
      pullUpLoadObj: {
        threshold: 0,
        txt: {
          more: "加载更多",
          noMore: "没有更多数据了"
        }
      },
      startY: 0,
      scrollToX: 0,
      scrollToY: 0,
      scrollToTime: 700,
      items: [],
      page: 1
    };
  },

  components: {
    Header,
    TabItemMallAdvertise,
    DividedArea,
    Divider,
    GoodsList
  },

  computed: {
    takeAwayConetnt() {
      return { height: document.documentElement.clientHeight - 45 + "px" };
    },
    contentNoHeaderHeight() {
      return { height: document.documentElement.clientHeight - 300 + "px" };
    }
  },

  beforeMount() {},

  mounted() {
    this.getBannerImgFn("2");
    this.onPullingDown();
  },

  methods: {
    // 滚动到页面顶部
    scrollTo() {
      this.$refs.scroll.scrollTo(
        this.scrollToX,
        this.scrollToY,
        this.scrollToTime
      );
    },
    // 模拟数据请求
    getData() {
      return new Promise(resolve => {
        let arr = [];
        TakeAwayGoodsList({
          scenic_id: sessionStorage.getItem("currentScenic"),
          page: this.page
        })
          .then(res => {
            if (res.result === 1) {
              totalCount = res.data.totalofnum;
              setTimeout(() => {
                if (res.data.result.length) {
                  arr = res.data.result;
                  resolve(res.data.result);
                } else {
                  this.$refs.scroll.forceUpdate(false);
                }
              }, 1000);
            }
          })
          .catch(err => {
            console.log(err);
          });
      });
    },
    onPullingDown() {
      totalCount = 0;
      this.page = 1;
      this.getData().then(res => {
        this.items = res;
        this.$refs.scroll.forceUpdate(true);
      });
    },
    onPullingUp() {
      this.page += 1;
      this.getData().then(res => {
        this.items = this.items.concat(res);
        if (this.items.length < totalCount) {
          this.$refs.scroll.forceUpdate(true);
        } else {
          this.$refs.scroll.forceUpdate(false);
        }
      });
    }
  },

  watch: {}
};
</script>
<style lang='css' scoped>
.take-away-conetnt {
  width: 100%;
  overflow: hidden;
  overflow-y: scroll;
  margin-top: 45px;
}
.scence-release-content {
  width: 100%;
  margin-top: 310px;
  background: #fff;
}
.position-box {
  position: absolute;
  top: 310px;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>