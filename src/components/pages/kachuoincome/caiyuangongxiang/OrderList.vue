<template>
  <div class="order-list-wrap">
    <Header
      :titleContent="TitleObjData.titleContent"
      :showLeftBack="TitleObjData.showLeftBack"
      :showRightMore="TitleObjData.showRightMore"
    ></Header>
    <Tab style="margin-top:50px" :tabList="tabListCon" v-on:changeTab="onChangeTab"></Tab>
    <div class="con-hei-wrap" :style="conSty">
      <OrderStateList :orderData="dataList"></OrderStateList>
    </div>
  </div>
</template>

<script>
import Header from "@/components/common/Header";
import Tab from "@/components/common/TabOrder";
import OrderStateList from "@/components/layout/OrderDataListCY";
import { CYGXorderList } from "@/servers/api";
import { getLocalTime, formateDate, timeTodate } from "@/assets/js/tools";

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
      tabListCon: ["全部", "审核中", "审核通过", "审核未通过"],
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
    this.getOrderList("99");
  },

  methods: {
    onChangeTab(val) {
      this.getOrderList(val);
    },
    getOrderList(status) {
      this.dataList = [];
      CYGXorderList({
        type: this.$route.query.type,
        status: status
      })
        .then(res => {
          if (res.result === 1) {
            this.dataList = res.data.data;
            console.log(res.data.data);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  updated() {
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