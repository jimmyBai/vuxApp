<template>
  <div class="tickets-discount-wrap">
    <Header
      :titleContent="TitleObjData.titleContent"
      :showLeftBack="TitleObjData.showLeftBack"
      :showRightMore="TitleObjData.showRightMore"
    ></Header>
    <div class="tickets-discount-list" :style="contentNoHeaderHeight">
      <div class="tickets-discount-top">
        <p class="padding-10px">蓬莱阁门票</p>
        <p class="ticket-tip padding-10px" @click="show=true">订票须知 ></p>
        <p class="ticket-date padding-10px-spec">
          <datetime
            v-model="valuedata"
            @on-change="change"
            title="选择日期"
            @on-cancel="log('cancel')"
            @on-confirm="onConfirm"
            @on-hide="log('hide', $event)"
          ></datetime>
        </p>
        <p class="ticket-price padding-10px">价格：¥30</p>
      </div>
      <div class="tickets-discount-mid">
        <group class="tickets-discount-group">
          <cell is-link :link="realNameLink">
            <span slot="title">
              <span style="vertical-align:middle;">实名认证</span>
              <badge :text="isAuth"></badge>
            </span>
          </cell>
        </group>
        <group>
          <cell is-link :link="discernLink">
            <span slot="title">
              <span style="vertical-align:middle;">人脸识别</span>
              <badge :text="isDiscern"></badge>
            </span>
          </cell>
        </group>
      </div>
      <div class="tickets-discount-bot">
        <p>游客信息</p>
        <p>姓名：&ensp;{{realName}}</p>
        <p>手机号码：&ensp;{{phoneNum}}</p>
      </div>
      <div class="ticket-bot-wrap">
        <span class="sub-desc">总额：</span>
        <x-button type="primary" class="sub-btn" :disabled="disabled">购买</x-button>
      </div>
    </div>
    <div v-transfer-dom>
      <x-dialog v-model="show" class="dialog-demo">
        <div class="content-box">
          <p class="buy-ticket-title">购票须知</p>
          <p v-for="(item,index) in ticketsTip" :key="index">{{index+1}}.{{item}}</p>
        </div>
        <div @click="show=false">
          <span class="vux-close"></span>
        </div>
      </x-dialog>
    </div>
  </div>
</template>

<script>
let userInfo = JSON.parse(sessionStorage.getItem("userLoginInfo"));
import Header from "@/components/common/Header";
import {
  Datetime,
  Group,
  Cell,
  Badge,
  XButton,
  XDialog,
  TransferDomDirective as TransferDom
} from "vux";

export default {
  directives: {
    TransferDom
  },
  name: "",
  props: [""],
  data() {
    return {
      TitleObjData: {
        titleContent: "购票",
        showLeftBack: true,
        showRightMore: false
      },
      valuedata: "",
      realNameLink: "",
      discernLink: "",
      show:false,
      disabled:false,
      ticketsTip:[
        "只有通过实名认证的用户才可以购票；",
        "一人只能购买一张当前选择景区的门票；",
        "购买的门票在选择日期当日的24小时之内有效；",
        "已经购买的门票无法退款；",
        "通过人脸识别的用户可以凭身份信息快速通过景区闸机；"
      ]
    };
  },

  components: {
    Header,
    Datetime,
    Group,
    Cell,
    Badge,
    XButton,
    XDialog
  },

  computed: {
    doShowToast() {
      this.$vux.toast.show({
        text: "toast"
      });
    },
    contentNoHeaderHeight: function() {
      return { height: document.documentElement.clientHeight - 45 + "px" };
    },
    isAuth() {
      let flag = userInfo.rule;
      return flag ? "已实名" : "未实名";
    },
    isDiscern() {
      let flag = userInfo.discern;
      return flag ? "已认证" : "未认证";
    },
    realName() {
      let flag = userInfo.card_name;
      return flag ? flag : "";
    },
    phoneNum() {
      let flag = userInfo.mobile;
      return flag ? flag : "";
    }
  },

  beforeMount() {},

  mounted() {
    this.checkAuthState();
    this.checkDiscern();
  },

  methods: {
    checkDiscern() {
      if (userInfo.discern) {
        this.realNameLink = "";
      } else {
        this.realNameLink = "/face";
      }
    },
    checkAuthState() {
      if (userInfo.rule) {
        this.realNameLink = "";
      } else {
        this.$vux.confirm.show({
          title: "提示",
          content: "已通过实名认证的用户才可以购票",
          onCancel: () => {},
          onConfirm: () => {
            this.realNameLink = "/realnameauth";
          }
        });
        this.realNameLink = "/realnameauth";
        this.disabled = true;
      }
    },
    log(str1, str2 = "") {
      console.log(str1, str2);
    },
    onConfirm(val) {
      console.log("on-confirm arg", val);
      console.log("current value", this.valuedata);
    },
    change(value) {
      console.log("change", value);
    }
  },

  watch: {}
};
</script>
<style lang='less' scoped>
@import '~vux/src/styles/close';
.padding-10px-spec {
  padding: 0 15px 0 15px;
  box-sizing: border-box;
}
.padding-10px {
  padding: 0 10px 0 15px;
  box-sizing: border-box;
}
.tickets-discount-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.tickets-discount-list {
  width: 100%;
  height: auto;
  overflow-y: scroll;
  padding: 15px;
  box-sizing: border-box;
  margin-top: 45px;
  background: #f9f9f9;
}
.tickets-discount-top {
  width: 100%;
  height: 150px;
  padding: 10px 0;
  box-sizing: border-box;
  background: #fff;
  font-size: 16px;
}
.ticket-tip {
  width: 100%;
  height: 30px;
  line-height: 30px;
  color: #298df8;
  font-size: 12px;
  border-bottom: 1px solid #eee;
}
.ticket-date {
  width: 100%;
  height: 45px;
  line-height: 45px;
  border-bottom: 1px solid #eee;
}
.ticket-price {
  width: 100%;
  height: 45px;
  line-height: 45px;
}
.tickets-discount-mid {
  width: 100%;
  height: 90px;
  background: #fff;
  box-sizing: border-box;
  margin-top: 15px;
}
.tickets-discount-group {
  border-bottom: 1px solid #eee;
}
.tickets-discount-bot {
  width: 100%;
  height: 135px;
  background: #fff;
  margin-top: 15px;
}
.tickets-discount-bot p {
  width: 100%;
  height: 45px;
  line-height: 45px;
  padding: 0 15px;
  box-sizing: border-box;
  font-size: 17px;
  border-bottom: 1px solid #eee;
}
.tickets-discount-bot p:nth-last-child(1) {
  border: none;
}
.ticket-bot-wrap {
  width: 100%;
  height: 50px;
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #eee;
}
.sub-desc {
  flex: 2;
  padding-left: 15px;
  box-sizing: border-box;
}
.sub-btn {
  flex: 1;
  height: 100%;
  border-radius: 0;
}
.content-box{
  width: 100%;
  height: 400px;
  background: #fff;
  padding: 15px;
  box-sizing: border-box;
  text-align: left;
}
.content-box p{
  width: 100%;
  word-break: break-all;
  margin-bottom: 4px;
}
.dialog-demo {
  .weui-dialog{
    border-radius: 8px;
    padding-bottom: 8px;
  }
  .dialog-title {
    line-height: 30px;
    color: #666;
  }
  .vux-close {
    margin-top: 8px;
    margin-bottom: 8px;
  }
}
.buy-ticket-title{
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-weight: bold;
  font-size: 16px;
}
</style>