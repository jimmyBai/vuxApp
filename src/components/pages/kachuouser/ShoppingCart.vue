<template>
  <div class="order-list-wrap">
    <Header
      :titleContent="TitleObjData.titleContent"
      :showLeftBack="TitleObjData.showLeftBack"
      :showRightMore="TitleObjData.showRightMore"
    ></Header>
    <div class="order-list-content" :style="orderListCon">
      <p class="no-goods-tip" v-show="dataList.length === 0">您的购物车暂无商品，快去添加吧～</p>
      <SwiperOut
        :dataListCon="dataList"
        :countArr="numArr"
        :checkFlagArr="checkFlagArr"
        v-on:changeList="updateList"
      ></SwiperOut>
      <DividedArea></DividedArea>
      <Divider :content="desc"></Divider>
      <GoodsList :goodList="goodsListData"></GoodsList>
    </div>
    <div class="bot-method-wrap">
      <span>共计：¥{{marketTotalPrice}}</span>
      <div class="sub-btn" @click="shoppingCartOrder">下单</div>
    </div>
  </div>
</template>

<script>
import { XButton } from "vux";
import Header from "@/components/common/Header";
import SwiperOut from "@/components/common/SwiperOut";
import DividedArea from "@/components/common/DividedArea";
import Divider from "@/components/common/Divider";
import GoodsList from "@/components/layout/GoodsList";
import { ShopList, goodsBucketRecomm, goodsBucketSubmit } from "@/servers/api";
import { parse } from "path";

export default {
  name: "",
  props: [""],
  data() {
    return {
      desc: "推荐商品",
      TitleObjData: {
        titleContent: "购物车",
        showLeftBack: true,
        showRightMore: false
      },
      numArr: [],
      dataList: [],
      checkFlagArr: [],
      goodsListData: [],
      marketTotalPrice: 0
    };
  },

  components: {
    Header,
    SwiperOut,
    DividedArea,
    GoodsList,
    Divider,
    XButton
  },

  computed: {
    orderListCon() {
      return { height: document.documentElement.clientHeight - 45 + "px" };
    }
  },

  beforeMount() {},

  mounted() {
    this.getDataList();
    this.getGoodsComm();
  },
  updated() {
    this.getMarketTotalPrice();
  },
  methods: {
    // 购物车下单
    shoppingCartOrder() {
      let arr = [];
      for (let i = 0; i < this.checkFlagArr.length; i++) {
        if (this.checkFlagArr[i]) {
          arr.push({
            goodsid: this.dataList[i].goodsid,
            shopid: this.dataList[i].id,
            name: this.dataList[i].goods_sx.title,
            img: this.dataList[i].goods_sx.thumb,
            num: this.numArr[i],
            price: this.dataList[i].goods_sx.marketprice
          });
        }
      }
      sessionStorage.setItem("shoppingCartOrderList", JSON.stringify(arr));
      this.$router.push("/confirmordershoppingcart");
    },
    // 商品推荐
    getGoodsComm() {
      goodsBucketRecomm({
        type: 1
      })
        .then(res => {
          if (res.result === 1) {
            this.goodsListData = res.data.result;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 计算总价
    getMarketTotalPrice() {
      let amount = 0;
      for (let i = 0; i < this.checkFlagArr.length; i++) {
        if (this.checkFlagArr[i]) {
          amount += this.numArr[i] * parseInt(this.dataList[i].marketprice, 10);
        }
      }
      this.marketTotalPrice = amount.toFixed(2);
    },
    updateList(index) {
      this.dataList.splice(index, 1);
      this.numArr.splice(index, 1);
    },
    // 获取列表
    getDataList() {
      ShopList({
        page: 1
      })
        .then(res => {
          if (res.result === 1) {
            let obj = res.data.result;
            for (let i in obj) {
              for (let j in obj[i][0]) {
                this.dataList.push(obj[i][0][j]);
                this.numArr.push(parseInt(obj[i][0][j].total, 10));
                this.checkFlagArr.push(true);
              }
            }
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
.order-list-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.order-list-content {
  width: 100%;
  margin-top: 50px;
  background: #f9f9f9;
  box-sizing: border-box;
  overflow: hidden;
  overflow-y: scroll;
  padding-bottom: 60px;
}
.bot-method-wrap {
  width: 100%;
  height: 50px;
  background: #fff;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 999;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  border-top: 1px solid #f9f9f9;
}
.sub-btn {
  width: 100px;
  height: 50px;
  border-radius: 0;
  background: #222;
  color: #fff;
  text-align: center;
  line-height: 50px;
  overflow: hidden;
  margin-left: 20px;
}
.no-goods-tip{
  width: 100%;
  height: 50px;
  text-align: center;
  line-height: 50px;
}
</style>