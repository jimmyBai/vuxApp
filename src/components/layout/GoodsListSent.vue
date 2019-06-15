<!--
商品列表
-->
<template>
  <div class="goods-list-wrap">
    <p style="width:100%;text-align:center;" v-show="!goodList.length && goodList.length!=0">
      <span style="vertical-align:middle;display:inline-block;font-size:14px;">加载中&nbsp;&nbsp;</span>
      <inline-loading></inline-loading>
    </p>
    <!-- <p style="width:100%;text-align:center;" v-show="goodList.length === 0">
      <span style="vertical-align:middle;display:inline-block;font-size:14px;">暂无数据～</span>
    </p> -->
    <div
      class="goods-list"
      v-for="(item,index) in goodList"
      :key="index"
      @click="watchGoodsDetails(item.goods_id,item.money)"
    >
      <img class="goods-img" v-lazy="item.image">
      <div class="good-desc-wrap">
        <p class="goods-name">{{item.name}}</p>
        <p class="goods-price">卖方价格：¥{{item.money}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Divider, InlineLoading } from "vux";
export default {
  name: "",
  props: ["goodList"],
  data() {
    return {
      dataList: []
    };
  },

  components: {
    Divider,
    InlineLoading
  },

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {
    watchGoodsDetails(goodsId, price) {
      let gid = goodsId;
      this.$router.push("/goodsdetails?id=" + gid + "&price=" + price);
    }
  },

  watch: {}
};
</script>
<style lang='css' scoped>
.goods-list-wrap {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 15px;
  box-sizing: border-box;
}
.goods-list {
  width: 49%;
  min-height: 80px;
  height: auto;
  margin-bottom: 20px;
}
.goods-img {
  width: 100%;
  height: 100px;
  display: inline-block;
}
.goods-name {
  width: 100%;
  font-size: 12px;
  line-height: 15px;
  word-break: break-all;
  margin-top: 10px;
}
.goods-price {
  font-size: 14px;
  color: red;
  margin-top: 10px;
}
</style>