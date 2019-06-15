<template>
  <div class="order-list-wrap">
    <Header
      :titleContent="TitleObjData.titleContent"
      :showLeftBack="TitleObjData.showLeftBack"
      :showRightMore="TitleObjData.showRightMore"
    ></Header>
    <Tab style="margin-top:50px" :tabList="tabListCon" v-on:changeTab="onChangeTab"></Tab>
    <div class="con-hei-wrap" :style="conSty">
      <OrderStateList :orderData="dataList" v-on:delData="refreshDate" v-on:sureOrder="refreshDate"></OrderStateList>
    </div>
  </div>
</template>

<script>
import Header from "@/components/common/Header";
import Tab from "@/components/common/Tab";
import OrderStateList from "@/components/layout/OrderStateList";
import { GoodsList } from "@/servers/api";
import { getLocalTime, formateDate, timeTodate } from "@/assets/js/tools";
import { setTimeout } from "timers";

export default {
  name: "",
  props: [""],
  data() {
    return {
      TitleObjData: {
        titleContent: "订单",
        showLeftBack: true,
        showRightMore: false
      },
      tabListCon: ["全部订单", "待付款", "待发货", "待收货", "已完成"],
      dataList: [],
      getData: []
    };
  },

  components: {
    Header,
    Tab,
    OrderStateList
  },

  computed: {
    conSty() {
      return { height: document.documentElement.clientHeight - 60 + "px" };
    }
  },

  beforeMount() {},

  mounted() {
    this.getOrderList("9999");
  },

  methods: {
    refreshDate(val){
      this.dataList.splice(val,1);
    },
    onChangeTab(val) {
      this.getOrderList(val);
    },
    getOrderList(status) {
      this.dataList = [];
      GoodsList({
        status: status
      })
        .then(res => {
          if (res.result === 1) {
            if (res.data.result) {
              for (let i = 0; i < res.data.result.length; i++) {
                this.dataList.push({
                  id: res.data.result[i].id,
                  goodsId: res.data.result[i].goods[0].id,
                  ordersn:res.data.result[i].ordersn,
                  orderType:res.data.result[i].iswxappcreate,
                  classify: res.data.result[i].goods[0].suoshujingqu,
                  status: res.data.result[i].status,
                  orderState: res.data.result[i].status,
                  goodImg: res.data.result[i].goods[0].shangpinxinxi.thumb,
                  name: res.data.result[i].goods[0].shangpinxinxi.title,
                  spec: "无",
                  price: res.data.result[i].goods[0].goodsprice,
                  count: res.data.result[i].goods[0].total,
                  date: timeTodate(res.data.result[i].goods[0].createtime),
                  priceCount: res.data.result[i].goods[0].price
                });
              }
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  updated() {
    this.dataList.length = 0;
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
.con-hei-wrap {
  width: 100%;
  overflow: hidden;
  overflow-y: scroll;
  background: #f9f9f9;
  padding-bottom: 50px;
  box-sizing: border-box;
}
</style>