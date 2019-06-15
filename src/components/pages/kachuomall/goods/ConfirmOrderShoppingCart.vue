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
      <div class="goods-details-wrap" v-for="(item,index) in goodsArr" :key="index">
        <div class="goods-details-left">
          <img class="goods-details-img" :src="item.img" :alt="item.title">
        </div>
        <div class="goods-details-mid">
          <p>{{item.name}}</p>
          <p style="color:#999999">已选</p>
          <p style="color:#B7090A">商品价格：¥{{item.price}}</p>
        </div>
        <div class="goods-details-right">
          <p>数量：{{item.num}}</p>
        </div>
      </div>
      <div class="goods-details-desc">
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
      <p class="confirm-order-desc">应付：¥{{totalPrice}}</p>
      <p class="confirm-order-btn" @click="confirmOrder">立即下单</p>
    </div>
  </div>
</template>

<script>
import Header from "@/components/common/Header";
import { getDetail, getAddressDefault, goodsBucketSubmit } from "@/servers/api";
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
      imgUrl: "",
      goodsArr: [],
      numArr: [],
      goodsidArr: [],
      shopidArr: []
    };
  },

  components: {
    Header
  },

  computed: {
    scenceGiftsContent() {
      return { height: document.documentElement.clientHeight - 45 + "px" };
    },
    totalPrice() {
      let total = 0;
      let goodsArr = JSON.parse(
        sessionStorage.getItem("shoppingCartOrderList")
      );
      for (let i = 0; i < goodsArr.length; i++) {
        total += goodsArr[i].price * goodsArr[i].num;
      }
      return total;
    }
  },

  beforeMount() {},

  mounted() {
    this.getGoodsDetailsInfo();
    this.getAddressDefaultFn();
  },

  methods: {
    // 计算总价
    totalPriceFn() {
      let total = 0;
      let goodsArr = JSON.parse(
        sessionStorage.getItem("shoppingCartOrderList")
      );
      for (let i = 0; i < goodsArr.length; i++) {
        total += goodsArr[i].price * goodsArr[i].num;
      }
      return total;
    },
    // 下单
    confirmOrder() {
      if (this.addressDetails.id) {
        goodsBucketSubmit({
          gid: this.goodsidArr, //商品id数组
          num: this.numArr, //商品个数数组
          price: this.totalPriceFn(), //价格
          addressid: this.addressDetails.id, //收获地址
          shop_id: this.shopidArr //商品列表id
        })
          .then(res => {
            console.log(res);
            if (res.result === 1) {
              this.$router.push("/payment?orderid=" + res.data.result);
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
    selAddress() {
      this.$router.push("/address");
    },
    // 获取商品详情
    getGoodsDetailsInfo() {
      let goodsArr = JSON.parse(
        sessionStorage.getItem("shoppingCartOrderList")
      );
      this.goodsArr = goodsArr;
      let numArr = [],
        goodsidArr = [],
        shopidArr = [];
      for (let i = 0; i < goodsArr.length; i++) {
        numArr.push(goodsArr[i].num);
        goodsidArr.push(goodsArr[i].goodsid);
        shopidArr.push(goodsArr[i].shopid);
      }
      this.numArr = numArr;
      this.goodsidArr = goodsidArr;
      this.shopidArr = shopidArr;
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