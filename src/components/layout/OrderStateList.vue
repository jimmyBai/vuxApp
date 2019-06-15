<template>
  <div>
    <div v-if="orderData">
      <div class="order-state-list-wrap" v-for="(item,index) in orderData" :key="index">
        <div class="order-state-list-top">
          <p>{{item.classify}}</p>
          <p>
            <span>{{item.orderState | showOrderState}}</span>
            <span></span>
          </p>
        </div>
        <div class="order-state-list-mid">
          <div class="order-state-list-mid-left">
            <img class="goods-img" :src="item.goodImg" alt srcset>
            <p class="goods-img-desc">
              <span class="text-overflow-hidden">{{item.name}}</span>
              <span class="font-12-px">{{item.spec}}</span>
            </p>
          </div>
          <div class="order-state-list-mid-right">
            <p>{{item.price}}</p>
            <p class="font-12-px">共{{item.count}}件</p>
            <p class="font-12-px">订单号：{{item.ordersn}}</p>
          </div>
        </div>
        <div class="order-state-list-bot">
          <p class="order-state-list-bot-top">
            <span>创建时间：{{item.date}}</span>
            <span>应付总额：{{item.priceCount}}</span>
          </p>
          <div class="order-state-list-bot-bot" v-show="item.orderState === '0'">
            <p>
              <x-button type="primary" mini>取消订单</x-button>
            </p>
            <p style="margin-left:20px">
              <x-button type="warn" mini @click.native="payOrder(item.ordersn)">立即付款</x-button>
            </p>
          </div>
          <div class="order-state-list-bot-bot" v-show="item.orderState === '1'">
            <p>
              <x-button type="primary" mini>提醒发货</x-button>
            </p>
            <!-- <p style="margin-left:20px">
              <x-button type="warn" mini >确认收货</x-button>
            </p>-->
          </div>
          <div class="order-state-list-bot-bot" v-show="item.orderState === '2'">
            <p>
              <x-button type="primary" mini @click.native="watchExpressInfo(item.ordersn)">查看物流</x-button>
            </p>
            <p>
              <x-button type="warn" mini @click.native="sureOrder(item.ordersn,index)">确认收货</x-button>
            </p>
          </div>
          <div
            class="order-state-list-bot-bot"
            v-show="item.orderState === '3' && item.orderType === '3'"
          >
            <p>
              <x-button type="primary" mini @click.native="sendOrder(item.ordersn)">我要寄卖</x-button>
            </p>
            <p style="margin-left:20px">
              <x-button type="primary" mini @click.native="applyBuyBack(item.id)">申请回购</x-button>
            </p>
            <p style="margin-left:20px">
              <x-button type="warn" mini @click.native="delGoods(item.id,index)">删除订单</x-button>
            </p>
          </div>
          <div
            class="order-state-list-bot-bot"
            v-show="item.orderState === '3' && item.orderType != '3'"
          >
            <p style="margin-left:20px">
              <x-button type="warn" mini @click.native="delGoods(item.id,index)">删除订单</x-button>
            </p>
          </div>
        </div>
      </div>
    </div>
    <group v-else-if="orderData">
      <cell
        v-for="(type, index) in types"
        :title="type"
        :key="type"
        :inline-desc="index === 3 ? 'size=40px' : ''"
      >
        <spinner :type="type" :size="index === 3 ? '40px' : ''"></spinner>
      </cell>
    </group>
  </div>
</template>

<script>
import { XButton, Spinner, Group, Cell } from "vux";
import {
  Operation,
  Confirmation,
  buyBackSubmit,
  jm_addOrder
} from "@/servers/api";
export default {
  name: "",
  props: ["orderData"],
  data() {
    return {
      types: ["ios"]
    };
  },

  components: {
    XButton,
    Spinner,
    Group,
    Cell
  },
  filters: {
    showOrderState(status) {
      switch (status) {
        case "0":
          return "待付款";
          break;
        case "1":
          return "待发货";
          break;
        case "2":
          return "待收货";
          break;
        case "3":
          return "已完成";
          break;
        default:
          return "";
      }
    }
  },
  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {
    // 付款
    payOrder(id){
      this.$router.push("/payment?orderid="+id);
    },
    // 一键寄卖
    sendOrder(orderId) {
      this.$vux.confirm.show({
        showInput: true,
        title: "寄卖价格",
        content: "",
        onCancel: () => {
          return;
        },
        onConfirm: val => {
          if (!val) {
            this.$vux.toast.show({
              type: "text",
              text: "价格不能为空",
              time: 1000
            });
          } else {
            jm_addOrder({
              order_sn: orderId,
              price: val,
              type: 2
            })
              .then(res => {
                if (res.result === 1) {
                  this.$vux.alert.show({
                    title: "申请成功",
                    content: "申请通过后，请到app寄卖列表查看您的寄卖商品。",
                    onHide: () => {
                      this.$router.push("/backleasesale?title=艺品寄卖");
                    }
                  });
                } else {
                  if (res.code === "51004") {
                    this.$vux.alert.show({
                      title: "提示",
                      content: "此商品已经申请，请等待审核结果。"
                    });
                  }
                }
              })
              .catch(err => {
                console.log(err);
              });
          }
        }
      });
    },
    // 申请回购
    applyBuyBack(id) {
      buyBackSubmit({
        id: id
      })
        .then(res => {
          console.log(res);
          if (res.result === 1) {
            this.$vux.alert.show({
              title: "提示",
              content: "申请已提交，请等待工作人员联系。"
            });
          } else {
            this.$vux.alert.show({
              title: "提示",
              content: res.msg
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 确认收货
    sureOrder(id, index) {
      this.$vux.confirm.show({
        title: "提示",
        content: "确定收货吗？",
        onCancel: () => {
          console.log("用户点击取消");
        },
        onConfirm: () => {
          this.postSureOrder(id, index);
        }
      });
    },
    postSureOrder(id, index) {
      Confirmation({
        order_id: id
      })
        .then(res => {
          console.log(res);
          if (res.result === 1) {
            this.$emit("sureOrder", index);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    watchExpressInfo(id) {
      this.$router.push("/expressinfo?id=" + id);
    },
    // 删除订单
    delGoods(id, index) {
      this.$vux.confirm.show({
        title: "提示",
        content: "确定要删除该订单吗？",
        onCancel: () => {
          console.log("用户点击取消");
        },
        onConfirm: () => {
          this.deleteItem(id, index);
        }
      });
    },
    deleteItem(id, index) {
      Operation({
        order_id: id,
        status: "-1"
      }).then(res => {
        console.log(res);
        if (res.result === 1) {
          this.$emit("delData", index);
        }
      });
    }
  },

  watch: {}
};
</script>
<style lang='css' scoped>
.font-12-px {
  font-size: 12px;
  color: #999;
}
.order-state-list-wrap {
  width: 100%;
  height: 180px;
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
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
}
.order-state-list-bot {
  flex: 2;
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
  width: 50px;
  height: 50px;
  display: inline-block;
}
.goods-img-desc {
  width: 150px;
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  overflow: hidden;
}
.order-state-list-bot-top {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  font-size: 12px;
  color: #999;
  margin-top: 4px;
}
.order-state-list-bot-bot {
  flex: 2;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}
</style>