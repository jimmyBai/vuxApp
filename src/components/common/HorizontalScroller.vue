<template>
  <scroller lock-y scrollbar-x class="scroll-wrap">
    <div class="box1">
      <div
        class="box1-item"
        v-for="(item,index) in goodsList"
        :key="index"
        @click="watchGoodsDetailsFn(item.id)"
      >
        <img v-lazy="item.thumb" :alt="item.category_name">
      </div>
    </div>
  </scroller>
</template>

<script>
import { Scroller } from "vux";

export default {
  props: ["goodsList"],
  components: {
    Scroller
  },
  data() {
    return {
      showList1: true,
      scrollTop: 0,
      onFetching: false,
      bottomCount: 20
    };
  },
  mounted() {},
  methods: {
    watchGoodsDetailsFn(id) {
      this.$router.push("/goodsdetails?id=" + id);
    }
  }
};
</script>

<style lang="css" scoped>
.box1 {
  height: 80px;
  position: relative;
  min-width: 800px;
  width: auto;
  background: #fff;
}
.box1-item {
  width: 100px;
  height: 80px;
  background-color: #fff;
  display: inline-block;
  margin-left: 15px;
  float: left;
  text-align: center;
  line-height: 80px;
}
.box1-item:first-child {
  margin-left: 0;
}
</style>