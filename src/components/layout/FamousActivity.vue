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
      <ScenceRelease :dataList="items"></ScenceRelease>
      <!-- <p style="text-align:center" v-show="items.length===0">暂无数据</p> -->
    </vue-better-scroll>
  </main>
</template>
 
<script>
import ScenceRelease from "@/components/layout/FamousRelease";
import { ScenceReleaseList } from "@/servers/api";
let totalCount = 0;
export default {
  name: "app",
  components: {
    ScenceRelease
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
    this.getData();
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
      return new Promise(resolve => {
        let arr = [];
        ScenceReleaseList({
          page: this.page,
          diff:1,
          merchid:this.$route.query.id
        })
          .then(res => {
            if (res.result === 1) {
              console.log(res);
              totalCount = res.data.totalofnum;
              setTimeout(() => {
                if (res.data.dynamic.length) {
                  arr = res.data.dynamic;
                  this.items = arr;
                  resolve(res.data.dynamic);
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
