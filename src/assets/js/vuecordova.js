import { CheckByLocation } from "@/servers/api";
export const vueCordovaFunction = {
  /** 
   * 获取经纬度
  */
  getLocation: function () {
    let positionInfo = {
      "Latitude": "",
      "Longitude": ""
    }
    document.addEventListener("deviceready", onDeviceReady, false);
    function onSuccess(position) {
      positionInfo.Latitude = position.coords.Latitude;
      positionInfo.Longitude = position.coords.Longitude;
      sessionStorage.setItem("positionInfo", JSON.stringify(positionInfo));
      let postDataObj = {
        latitude: position.coords.Latitude,
        longitude: position.coords.Longitude
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
    }
    function onError(error) {
      console.log(`code:${error.code},message:${error.message}`);
    }
    function onDeviceReady() {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
  },
  /**
  partnerid: res.partnerid, // merchant id
  prepayid: res.prepayid, // prepay id
  noncestr: res.noncestr, // nonce
  timestamp: res.timestamp.toString(), // timestamp
  sign: res.paySign, // signed string
  **/
  WeixinPay: function (res) {
    let WXparams = {
      partnerid: res.partnerid, // merchant id
      prepayid: res.prepayid, // prepay id
      noncestr: res.noncestr, // nonce
      timestamp: res.timestamp.toString(), // timestamp
      sign: res.paySign, // signed string
    }
    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
      Wechat.sendPaymentRequest(WXparams, (s) => {
        this.$vux.toast.show({
          text: '支付成功',
          type: 'success',
          time: 2000
        })
      }, (e) => {
        this.$vux.toast.show({
          text: '支付失败,请重试!',
          type: 'warn',
          time: 2000
        })
      });
    }
  },
  /**
   * 支付宝支付
   *  */
  AliPay: function (aliInfo) {
    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
      cordova.plugins.alipay.payment(aliInfo, function success(e) {
        if (e.resultStatus === 9000) {
          this.$vux.toast.show({
            text: '支付成功',
            type: 'success',
            time: 2000
          })
        } else if (e.resultStatus === 4000) {
          this.$vux.toast.show({
            text: '支付失败，请重试',
            type: 'warn',
            time: 2000
          })
        } else {
          return;
        }
      }, function error(e) {
        console.log(e);
      });
    }
  },
  /**
   * 社会化分享
   */
  socialShare: function (goodObj) {
    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
      window.plugins.socialsharing.share(goodObj.title, null, goodObj.thumb_url[0], 'https://core.kachuo.com/share/index.html?id=' + goodObj.id);
    }
  },
  // 推送
  vueJSpush: function () {

  }
}