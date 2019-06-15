<!-- 
在切换tab页的时候调用this.$refs.my_scroller.finishInfinite(false)
finishInfinite函数为scroller实例的方法，当参数为false时，上拉获取数据可以重新调用。当参数为true，上拉获取数据回调函数停止使用,下拉下部不再显示loading，会显示‘’暂无更多数据

下拉刷新，刷新完毕，loading动画一直存在不消失
需要手动调用finishPullToRefresh。停止下拉刷新
调用方式：this.$refs.my_scroller.finishPullToRefresh()

infinite的回调函数done调用时间
将后台获取的数据，复制到vue组件的数据源后，再进行调用done函数。如果在之前调用,会循环调用。如果不调用这个函数，上拉获取数据函数调用不成功。
-->
<template>
  <div class="wrap-scroll">
    <scroller
      :on-infinite="pullup"
      :on-refresh="refresh"
      :refreshText="refreshText"
      :noDataText="noDataText"
      style="margin-top:45px"
    >
      <!-- <list-content :list="list"></list-content> -->
    </scroller>
  </div>
</template>

<script>
import ListContent from "./Content";
export default {
  components: { ListContent },
  data() {
    return {
      page: 0,
      list: [],
      refreshText: "下拉刷新",
      noDataText: "没有更多数据"
    };
  },
  methods: {
    refresh(done) {
      console.log("refresh");
      setTimeout(() => {
        done();
      }, 2000);
    },
    pullup(done) {
      // infinite的回调函数done调用时间
      console.log("pullup");
      setTimeout(() => {
        done();
      }, 2000);
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
</style>
