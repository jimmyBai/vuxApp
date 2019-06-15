<template>
  <main class="position-box" :style="scrollHeight">
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
      <GoodsList :goodList="goodsListData"></GoodsList>
      <!-- <p style="text-align:center" v-show="goodsListData.length===0">暂无数据</p> -->
    </vue-better-scroll>
  </main>
</template>
 
<script>
import { ShopGoodsList, getScenicList } from "@/servers/api";
import GoodsList from "@/components/layout/GoodsList";
let totalCount = 0;
let totalPage = 0;
export default {
  name: "app",
  components: {
    GoodsList
  },
  data() {
    return {
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
      startY: "0",
      scrollToX: 0,
      scrollToY: 0,
      scrollToTime: 700,
      items: [],
      goodsListData: [],
      noData: false,
      page: 1
    };
  },
  computed: {
    scrollHeight() {
      return { height: document.documentElement.clientHeight - 300 + "px" };
    }
  },
  mounted() {
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
    // 数据请求
    getData() {
      // 1景区商城
      // 2名家商城
      // 3微商城
      let flag = this.$route.query.flag;
      if (flag === "1" || flag === "2") {
        let postData = {};
        if (flag === "1") {
          postData = {
            scenic_id: this.$route.query.id,
            page: this.page
          };
        } else {
          postData = {
            celebrity_id: this.$route.query.id,
            page: this.page
          };
        }
        return new Promise(resolve => {
          getScenicList(postData)
            .then(res => {
              if (res.result === 1) {
                resolve(res.data.list);
                totalCount = res.data.totalofnum;
                totalPage = res.data.totalpage;
                this.totalNum = res.data.totalofnum;
                this.noData =
                  res.data.currentpage === res.data.numofpage ? true : false;
              }
            })
            .catch(err => {
              console.log(err);
            });
        });
      } else {
        return new Promise(resolve => {
          ShopGoodsList({
            category_id: this.$route.query.id,
            page: this.page,
            cel: this.$route.query.type
          })
            .then(res => {
              if (res.result === 1) {
                resolve(res.data.list);
                totalCount = res.data.totalofnum;
                totalPage = res.data.totalpage;
                this.totalNum = res.data.totalofnum;
                this.noData =
                  res.data.currentpage === res.data.numofpage ? true : false;
              }
            })
            .catch(err => {
              console.log(err);
            });
        });
      }
    },
    // 下拉刷新
    onPullingDown() {
      totalCount = 0;
      this.page = 1;
      this.getData().then(res => {
        this.goodsListData = res;
        setTimeout(() => {
          this.$nextTick(() => {
            this.$refs.scroll.forceUpdate(true);
          });
        }, 1000);
      });
    },
    // 加载更多数据
    onPullingUp() {
      this.page += 1;
      if (this.page > totalPage) {
        this.$refs.scroll.forceUpdate(true);
        return;
      }
      this.getData().then(res => {
        this.goodsListData = this.goodsListData.concat(res);
        if (this.goodsListData.length < totalCount) {
          console.log("has more");
          this.$refs.scroll.forceUpdate(true);
        } else {
          console.log("no more");
          this.$refs.scroll.forceUpdate(false);
        }
      });
    }
  }
};
</script> 
 
<style>
.position-box {
  width: 100%;
  height: 100%;
  position: absolute;
}
</style> 
