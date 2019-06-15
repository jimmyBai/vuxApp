<template>
  <div class="login-wrap" :style="backSty">
    <p class="login-wrap-title">快捷登录</p>
    <div style="width:100%;background:none">
      <x-input title="验证码" style="display:none"></x-input>
      <x-input
        title="请输入手机号"
        class="weui-vcode"
        v-model="phoneValue"
        :max="13"
        is-type="china-mobile"
        :show-clear="false"
        novalidate
      ></x-input>
      <x-input
        title="请输入验证码"
        class="input-qr-code"
        novalidate
        v-model="veriValue"
        :show-clear="false"
      >
        <x-button
          slot="right"
          type="primary"
          mini
          :disabled="veritfyCode"
          @click.native="sendVeriCode"
          class="veri-btn"
        >{{veritfyCodeTxt}}</x-button>
      </x-input>
    </div>
    <x-button type="primary" class="sub-btn-wrap" @click.native="requestLogin">登录</x-button>
    <p class="visitor-login" @click="visitorLogin">游客登录</p>
  </div>
</template>

<script>
import { XInput, Group, XButton, Cell } from "vux";
import { getVeriCode, login, getUserInfo } from "@/servers/api";
import { CheckByLocation } from "@/servers/api";
import { vueCordovaFunction } from "@/assets/js/vuecordova";
export default {
  name: "",
  props: [""],
  data() {
    return {
      timer: null,
      veritfyCodeTxt: "发送验证码",
      veritfyCode: false,
      phoneValue: "",
      veriValue: "",
      longitude:"",
      latitude:"",
      backSty: {
        backgroundImage:
          "url(" + require("@/assets/images/loginback.png") + ")",
        backgroundSize: "100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center"
      }
    };
  },

  components: {
    XInput,
    XButton,
    Group,
    Cell
  },

  computed: {},

  beforeMount() {},

  mounted() {
    this.checkTokenLogin();
  },

  methods: {
    // 游客登录
    visitorLogin() {
      this.$router.push("/indextab");
    },
    // token存在，直接登录
    checkTokenLogin() {
      let token = localStorage.getItem("token");
      if (token) {
        this.getUserLoginInfo();
        this.getLocationData();
        this.$router.push("/indextab");
      }
    },
    // 获取经纬度信息
    getLocationData() {
      let dataObj = sessionStorage.getItem("positionInfo")
        ? sessionStorage.getItem("positionInfo")
        : "";
      if (dataObj === "") {
        vueCordovaFunction.getLocation();
      }
      let postDataObj = {
        latitude: dataObj ? JSON.parse(dataObj).Latitude : "",
        longitude: dataObj ? JSON.parse(dataObj).Longitude : ""
      };
      CheckByLocation(postDataObj)
        .then(res => {
          if (res.result === 1) {
            sessionStorage.setItem("currentScenic", res.data.scenic_id);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取用户信息
    getUserLoginInfo() {
      getUserInfo({})
        .then(res => {
          if (res.result === 1) {
            this.$store.commit("setUserLoginInfo", res.data);
            this.GLOBAL.setSession("userLoginInfo", res.data);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //调用amap浏览器定位方法
    getAMapGeolocation (){
      
    },
    // 请求登录
    requestLogin() {
      if (this.phoneValue && this.veriValue) {
        // 请求登录
        login({
          tel: this.phoneValue.replace(/\s*/g, ""),
          code: this.veriValue,
          type: 1,          
          longitude:this.longitude,
          latitude:this.latitude,
        })
          .then(res => {
            if (res.result === 1) {
              localStorage.setItem("token", res.data.accessToken);
              this.$vux.toast.show({
                type: "success",
                text: "登录成功",
                time: 1000,
                onHide: () => {
                  this.getUserLoginInfo();
                  this.getLocationData();
                }
              });
              this.$router.push("/indextab");
            } else {
              if (res.code === 90000) {
                this.showToastInfo("验证码错误或过期");
              } else if (res.code === 10005) {
                this.showToastInfo("手机号不能为空");
              } else if (res.code === "1002" || res.code === 1002) {
              } else if (res.code === 10006) {
                this.showToastInfo("手机号不一致");
              } else {
                this.$router.push("/indextab");
              }
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        if (!this.phoneValue) {
          this.showToastInfo("手机号不能为空");
        } else {
          this.showToastInfo("验证码不能为空");
        }
      }
    },
    // 请求验证码
    requestVeriCode() {
      console.log("requestVeriCode");
      getVeriCode({
        tel: this.phoneValue.replace(/\s*/g, "")
      })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 发送验证码
    sendVeriCode() {
      this.verifyPhoneCode(this.phoneValue);
    },
    // 验证手机号
    verifyPhoneCode(phoneNum) {
      let regExp = /^[1][3,4,5,7,8][0-9]{9}$/;
      let phone = phoneNum.replace(/\s*/g, "");
      if (regExp.test(phone)) {
        this.showToastInfo("验证码已发送", this.emitVeritfyCode);
      } else {
        this.showToastInfo("手机号有误");
      }
    },
    // 显示提示信息
    showToastInfo(conttentTip, callback) {
      this.$vux.toast.text(conttentTip, "middle");
      setTimeout(() => {
        this.$vux.toast.hide();
        callback ? callback() : "";
      }, 1000);
    },
    // 发送验证码按钮倒计时
    emitVeritfyCode() {
      this.veritfyCode = true;
      let num = 60;
      this.veritfyCodeTxt = num + "s";
      this.requestVeriCode();
      this.timer = setInterval(() => {
        if (num > 0) {
          --num;
          this.veritfyCodeTxt = num + "s";
        } else {
          clearInterval(this.timer);
          this.veritfyCodeTxt = "重新发送";
          this.veritfyCode = false;
        }
      }, 1000);
    }
  },

  watch: {},
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>
<style lang='css' scoped>
.login-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0 15px;
  box-sizing: border-box;
}
.login-wrap-title {
  font-size: 24px;
  margin-top: 120px;
  color: #fff;
  font-weight: bold;
}
.weui-vcode,
.input-qr-code {
  width: 100%;
  border-bottom: 1px solid #fff;
  margin-top: 20px;
}
.weui-vcode {
  margin-top: 80px;
}
.sub-btn-wrap {
  margin-top: 60px;
  background: #fff;
  color: #000;
}
.veri-btn {
  width: 100px;
  display: inline-block;
  background: #fff;
  color: #000;
}
.visitor-login {
  width: 100%;
  height: 20px;
  font-size: 14px;
  text-align: center;
  color: #fff;
  margin-top: 20px;
}
</style>