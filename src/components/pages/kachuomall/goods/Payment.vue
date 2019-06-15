<template>
  <div class="scence-gifts-wrap">
    <Header
      :titleContent="TitleObjData.titleContent"
      :showLeftBack="TitleObjData.showLeftBack"
      :showRightMore="TitleObjData.showRightMore"
    ></Header>
    <div class="scence-gifts-content" :style="scenceGiftsContent">
      <x-button type="primary" @click.native="aliPay">支付宝支付</x-button>
      <x-button type="primary" @click.native="weixinPay">微信支付</x-button>
    </div>
  </div>
</template>

<script>
import Header from "@/components/common/Header";
import { XButton } from "vux";
import { Pay } from "@/servers/api";
export default {
  name: "",
  props: [""],
  data() {
    return {
      TitleObjData: {
        titleContent: "支付",
        showLeftBack: true,
        showRightMore: false
      }
    };
  },

  components: {
    Header,
    XButton
  },

  computed: {
    scenceGiftsContent() {
      return { height: document.documentElement.clientHeight - 45 + "px" };
    }
  },

  beforeMount() {},

  mounted() {},

  methods: {
    // 下单
    payRequest(type) {
      Pay({
        paytype: type,
        order_sn: this.$route.query.orderid,
        isJf: "0"
      })
        .then(res => {
          console.log(res);
          if (res.result === 1) {
            if (type === "21") {
              this.WeixinPay(res.data.url);
            } else {
              this.AliPay(res.data.url);
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    aliPay() {
      this.payRequest("22");
    },
    weixinPay() {
      this.payRequest("21");
    },
    // 支付失败回调
    errorToast() {
      this.$vux.toast.show({
        text: "支付成功",
        type: "success",
        time: 1000,
        onHide: () => {
          this.$router.push("/orderlist");
        }
      });
    },
    // 支付成功回调
    successToast() {
      this.$vux.toast.show({
        text: "支付成功",
        type: "success",
        time: 1000,
        onHide: () => {
          this.$router.push("/orderlist");
        }
      });
    },
    // 微信支付
    WeixinPay(res) {
      let WXparams = {
        partnerid: res.partnerid, // merchant id
        prepayid: res.prepayid, // prepay id
        noncestr: res.noncestr, // nonce
        timestamp: res.timestamp.toString(), // timestamp
        sign: res.paySign // signed string
      };
      let that = this;
      document.addEventListener("deviceready", onDeviceReady, false);
      function onDeviceReady() {
        Wechat.sendPaymentRequest(
          WXparams,
          s => {
            that.successToast();
          },
          e => {
            that.errorToast();
          }
        );
      }
    },
    // 支付宝支付
    AliPay(aliInfo) {
      let that = this;
      document.addEventListener("deviceready", onDeviceReady, false);
      function onDeviceReady() {
        cordova.plugins.alipay.payment(
          aliInfo,
          function success(e) {
            if (e.resultStatus === 9000) {
              that.successToast();
            } else {
              that.errorToast();
            }
          },
          function error(e) {
            console.log(e);
            that.errorToast();
          }
        );
      }
    }
  },

  watch: {}
};
</script>
<style lang='css' scoped>
.scence-gifts-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.scence-gifts-content {
  width: 100%;
  margin-top: 50px;
  background: #fff;
  overflow: hidden;
  overflow-y: scroll;
  box-sizing: border-box;
  padding: 50px 15px 0;
}
</style>