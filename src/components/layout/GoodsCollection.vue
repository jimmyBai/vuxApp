<template>
  <div class="goods-wrap" :style="contentSty">
    <div
      class="order-state-list-wrap"
      v-for="(item,index) in orderData"
      :key="index"
      @click="getGoodsDetails(item.comment.id)"
    >
      <div class="order-state-list-mid">
        <div class="order-state-list-mid-left">
          <img class="goods-img" v-lazy="item.comment.thumb" alt srcset>
          <p class="goods-img-desc">
            <span class="text-overflow-hidden">{{item.comment.title}}</span>
            <!-- <span class="font-12-px">{{item.spec}}</span> -->
            <span>价格：{{item.comment.marketprice}}</span>
            <!-- <span>收藏时间：{{item.createtime | formDate}}</span> -->
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { XButton } from "vux";
import { getLocalTime } from "@/assets/js/tools";
export default {
  name: "",
  props: ["orderData"],
  data() {
    return {};
  },

  components: {
    XButton
  },
  filters: {
    formDate(val) {
      return getLocalTime(val);
    }
  },
  computed: {
    contentSty() {
      return { height: document.documentElement.clientHeight - 100 + "px" };
    }
  },

  beforeMount() {},

  mounted() {},

  methods: {
    getGoodsDetails(id) {
      this.$router.push("/goodsdetails?id=" + id);
    }
  },

  watch: {}
};
</script>
<style lang='css' scoped>
.goods-wrap{
  width: 100%;
  overflow: hidden;
  overflow-y: scroll;
}
.font-12-px {
  font-size: 12px;
  color: #999;
}
.order-state-list-wrap {
  width: 100%;
  height: 100px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 0 15px;
  box-sizing: border-box;
  margin-top: 10px;
  background: #fff;
}
.order-state-list-top {
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
}
.order-state-list-mid {
  flex: 2;
  display: flex;
  flex-direction: row;
  align-items: center;
  /* border-bottom: 1px solid #eee; */
  box-sizing: border-box;
}
.order-state-list-bot {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.order-state-list-mid-left {
  flex: 1;
  display: flex;
  flex-direction: row;
  overflow: hidden;
}
.order-state-list-mid-right {
  flex: 1;
  text-align: right;
}
.goods-img {
  width: 70px;
  height: 70px;
  display: inline-block;
}
.goods-img-desc {
  width: 200px;
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  overflow: hidden;
}
.order-state-list-bot-top {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex: 1;
}
.order-state-list-bot-bot {
  flex: 2;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}
</style>