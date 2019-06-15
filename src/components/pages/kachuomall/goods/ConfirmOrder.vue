<template>
  <div class="confirm-order-wrap">
    <Header
      :titleContent="TitleObjData.titleContent"
      :showLeftBack="TitleObjData.showLeftBack"
      :showRightMore="TitleObjData.showRightMore"
    ></Header>
    <div class="confirm-order-content" :style="scenceGiftsContent">
      <div class="address-wrap" @click="selAddress">
        <div class="address-left">
          <span class="iconfont icondingwei"></span>
        </div>
        <div class="address-mid">
          <p>
            <span>{{addressDetails.realname}}</span>
            <span>{{addressDetails.tel}}</span>
          </p>
          <p>{{addressDetails.province}},{{addressDetails.city}},{{addressDetails.area}}</p>
          <p>{{addressDetails.address}}</p>
        </div>
        <div class="address-right">
          <span class="iconfont iconyoujiantou"></span>
        </div>
      </div>
      <div class="goods-details-wrap">
        <div class="goods-details-left">
          <img class="goods-details-img" :src="imgUrl" :alt="goodsDetails.title">
        </div>
        <div class="goods-details-mid">
          <p>{{goodsDetails.title}}</p>
          <p style="color:#999999">已选</p>
          <p style="color:#B7090A">商品价格：¥{{goodsDetails.marketprice}}</p>
          <!-- <p
            style="color:#B7090A"
            v-if="this.$route.query.priceback != undefined"
          >¥{{this.$route.query.priceback}}</p>-->
        </div>
        <div class="goods-details-right">
          <p>数量：1</p>
        </div>
      </div>
      <div class="goods-details-desc">
        <p v-if="this.$route.query.price">
          <span style="font-size:17px;color:#000">租赁价格：</span>
          <span>¥{{this.$route.query.price}}</span>
        </p>
        <p v-if="!this.$route.query.price && !this.$route.query.priceback">
          <span style="font-size:17px;color:#000">商品总额：</span>
          <span>¥{{goodsDetails.marketprice}}</span>
        </p>
        <p v-if="this.$route.query.priceback">
          <span style="font-size:17px;color:#000">寄卖价格：</span>
          <span>¥{{this.$route.query.priceback}}</span>
        </p>
        <p>
          <span>优惠</span>
          <span>-¥0.00</span>
        </p>
        <p style="border:none">
          <span>运费</span>
          <span>¥0.00</span>
        </p>
      </div>
    </div>
    <div class="confirm-order-btn-wrap">
      <p class="confirm-order-desc" v-if="this.$route.query.price">应付：¥{{this.$route.query.price}}</p>
      <p
        class="confirm-order-desc"
        v-if="!this.$route.query.price && !this.$route.query.priceback"
      >应付：¥{{goodsDetails.marketprice}}</p>
      <p
        class="confirm-order-desc"
        v-if="this.$route.query.priceback"
      >应付：¥{{this.$route.query.priceback}}</p>
      <p class="confirm-order-btn" @click="confirmOrder">立即下单</p>
    </div>
  </div>
</template>

<script>
import Header from "@/components/common/Header";
import { getDetail, getAddressDefault, AddShop } from "@/servers/api";
export default {
  name: "",
  props: [""],
  data() {
    return {
      TitleObjData: {
        titleContent: "确认订单",
        showLeftBack: true,
        showRightMore: false
      },
      addressDetails: {},
      goodsDetails: {},
      imgUrl: ""
    };
  },

  components: {
    Header
  },

  computed: {
    scenceGiftsContent() {
      return { height: document.documentElement.clientHeight - 45 + "px" };
    }
  },

  beforeMount() {},

  mounted() {
    this.getGoodsDetailsInfo();
    this.getAddressDefaultFn();
  },

  methods: {
    // 下单
    confirmOrder() {
      console.log(this.goodsDetails.id);
      console.log(this.computedPrice());
      console.log(this.addressDetails.id);
      console.log(this.checkOrderType());
      if (this.addressDetails.id) {
        AddShop({
          gid: this.goodsDetails.id,
          price: this.computedPrice(),
          addressid: this.addressDetails.id,
          type: this.checkOrderType()
        })
          .then(res => {
            console.log(res);
            if (res.result === 1) {
              this.$router.push("/payment?orderid=" + res.data.result);
            } else {
              if (res.code === "50103") {
                this.$vux.confirm.show({
                  title:"提示",
                  content:"订单中该商品未付款，是否到订单中心查看？",
                  onCancel:()=> {
                    return;
                  },
                  onConfirm:()=> {
                    this.$router.push("/orderlist");
                  }
                });
              }
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$vux.confirm.show({
          title: "提示",
          content: "请先添加收货地址",
          showCancelButton: false,
          onConfirm: () => {
            this.selAddress();
          }
        });
      }
    },
    // 判断订单类型
    // 1正常
    // 2寄卖
    // 3租赁
    checkOrderType() {
      if (this.$route.query.price) {
        return 3;
      } else if (this.$route.query.priceback) {
        return 2;
      } else {
        return 1;
      }
    },
    // 计算价格
    computedPrice() {
      if (this.$route.query.price) {
        return this.$route.query.price;
      } else if (this.$route.query.priceback) {
        return this.$route.query.priceback;
      } else {
        return this.goodsDetails.marketprice;
      }
    },
    selAddress() {
      this.$router.push("/address");
    },
    // 获取商品详情
    getGoodsDetailsInfo() {
      getDetail({
        goods_id: this.$route.query.id
      })
        .then(res => {
          console.log(res);
          if (res.result === 1) {
            this.goodsDetails = res.data;
            this.imgUrl = res.data.thumb_url[0];
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取默认收货地址
    getAddressDefaultFn() {
      getAddressDefault({})
        .then(res => {
          if (res.result === 1) {
            this.addressDetails = res.data[0];
          } else {
            this.$vux.confirm.show({
              title: "提示",
              content: "请先添加收货地址",
              showCancelButton: false,
              onConfirm: () => {
                this.selAddress();
              }
            });
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
.confirm-order-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #f9f9f9;
}
.confirm-order-content {
  width: 100%;
  overflow: hidden;
  overflow-y: scroll;
  margin-top: 50px;
}
.address-wrap {
  width: 100%;
  min-height: 50px;
  background: #fff;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  box-sizing: border-box;
  margin-top: 5px;
}
.address-left {
  flex: 1;
}
.address-mid {
  flex: 8;
}
.address-right {
  flex: 1;
  text-align: right;
}
.goods-details-wrap {
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  padding: 15px;
  box-sizing: border-box;
  margin-top: 10px;
  background: #fff;
}
.goods-details-img {
  width: 60px;
  height: 60px;
  display: inline-block;
}
.goods-details-left {
  flex: 1;
}
.goods-details-mid {
  flex: 2;
}
.goods-details-right {
  flex: 1;
}
.goods-details-desc {
  width: 100%;
  height: 150px;
  padding-left: 15px;
  box-sizing: border-box;
  background: #fff;
  margin-top: 10px;
}
.goods-details-desc p {
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding-right: 15px;
  box-sizing: border-box;
  color: #666666;
}
.confirm-order-btn-wrap {
  width: 100%;
  height: 50px;
  border-top: 1px solid #eee;
  background: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
}
.confirm-order-desc {
  flex: 2;
  padding-left: 15px;
  box-sizing: border-box;
  font-weight: bold;
  font-size: 17px;
}
.confirm-order-btn {
  flex: 1;
  height: 50px;
  background: #222;
  line-height: 50px;
  text-align: center;
  color: #fff;
}
</style>