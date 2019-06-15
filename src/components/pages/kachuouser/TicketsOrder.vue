<template>
  <div class="tickets-discount-wrap">
    <Header
      :titleContent="TitleObjData.titleContent"
      :showLeftBack="TitleObjData.showLeftBack"
      :showRightMore="TitleObjData.showRightMore"
    ></Header>
    <div class="tickets-discount-list" :style="contentNoHeaderHeight">
      <div class="ticket-wrap" v-for="(item,index) in orderList" :key="index">
        <div class="ticket-left">
          <div class="ticket-left-top">{{item.scenic}}</div>
          <div class="ticket-left-mid">
            <p>{{item.date}}日有效</p>
            <p>有效期截止至24时</p>
          </div>
          <div class="ticket-left-bot">
            <span>{{item.state | changeState}}</span>
            <span style="margin-left:10px">退改：不可退</span>
          </div>
        </div>
        <div class="ticket-right">
          <p>票价</p>
          <p class="ticket-price">¥{{item.price}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/common/Header";
import TicketsDiscount from "@/components/layout/TicketsDiscount";

export default {
  name: "",
  props: [""],
  data() {
    return {
      TitleObjData: {
        titleContent: "已购门票",
        showLeftBack: true,
        showRightMore: false
      },
      orderList: [
        {
          scenic: "蓬莱阁",
          date: "2019-4-18",
          state: "1",
          price: "90"
        },
        {
          scenic: "蓬莱阁",
          date: "2019-4-18",
          state: "1",
          price: "90"
        },
        {
          scenic: "蓬莱阁",
          date: "2019-4-18",
          state: "1",
          price: "90"
        },
        {
          scenic: "蓬莱阁",
          date: "2019-4-18",
          state: "1",
          price: "90"
        },
        {
          scenic: "蓬莱阁",
          date: "2019-4-18",
          state: "1",
          price: "90"
        },
        {
          scenic: "蓬莱阁",
          date: "2019-4-18",
          state: "1",
          price: "90"
        }
      ]
    };
  },

  components: {
    Header,
    TicketsDiscount
  },

  computed: {
    contentNoHeaderHeight: function() {
      return { height: document.documentElement.clientHeight - 45 + "px" };
    }
  },
  filters: {
    changeState(val) {
      if (val === "0") {
        return "未支付";
      } else if (val === "1") {
        return "购票成功";
      } else {
        return "出票失败";
      }
    }
  },
  beforeMount() {},

  mounted() {},

  methods: {},

  watch: {}
};
</script>
<style lang='css' scoped>
.tickets-discount-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.tickets-discount-list {
  width: 100%;
  overflow-y: scroll;
  padding: 15px;
  box-sizing: border-box;
  margin-top: 45px;
  background: #f9f9f9;
}
.ticket-wrap {
  width: 100%;
  height: 140px;
  background: #fff;
  display: flex;
  flex-direction: row;
  margin-bottom: 15px;
}
.ticket-left {
  flex: 4;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 10px;
  box-sizing: border-box;
}
.ticket-right {
  flex: 1;
  background: #a9b6c7;
  padding: 10px;
  box-sizing: border-box;
  color: #fff;
}
.ticket-left-top {
  font-weight: bold;
}
.ticket-left-mid {
  color: #666666;
}
.ticket-left-bot {
  color: #9ca8b8;
}
.ticket-right {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.ticket-price {
  font-size: 18px;
  margin-top: 30px;
}
</style>