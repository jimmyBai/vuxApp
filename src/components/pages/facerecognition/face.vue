<template>
  <div class="face-wrap">
    <Header
      :titleContent="TitleObjData.titleContent"
      :showLeftBack="TitleObjData.showLeftBack"
      :showRightMore="TitleObjData.showRightMore"
    ></Header>
    <div class="face-content" :style="conHeight">
      <div class="face-img">
        <img
          style="width:200px;height:250px;display:inline-block;background:none"
          :src="faceImg"
          alt
        >
      </div>
      <p class="face-desc">由本人亲自操作，请正对手机，确保光线充足</p>
      <x-button type="primary" class="face-btn">
        开始拍摄
        <input
          type="file"
          class="camera-input"
          ref="cameraInput"
          accept="image/*"
          capture="camera"
          @change="getFaceImg($event)"
        >
      </x-button>
      <p class="face-tip">
        <span class="iconfont iconanquan"></span>
        信息已加密，仅用于身份验证
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const FACEUPLOADCONFIG = {
  timeout: 10000,
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("token")
  }
};
import Header from "@/components/common/Header";
import { XButton } from "vux";
import { faceCheck } from "@/servers/api";
export default {
  name: "",
  props: [""],
  data() {
    return {
      TitleObjData: {
        titleContent: "人脸识别",
        showLeftBack: true,
        showRightMore: false
      },
      faceImg: require("@/assets/images/face-img/face-icon.png"),
      videoUploadUrl:
        "https://core.kachuo.com/app/ewei_shopv2_app.php?i=5&c=site&a=entry&m=ewei_shopv2&do=mobile&r=util.uploader.uploadm",
      formData: new FormData()
    };
  },

  components: {
    Header,
    XButton
  },

  computed: {
    conHeight() {
      return { height: document.documentElement.clientHeight - 45 + "px" };
    }
  },

  beforeMount() {},

  mounted() {},

  methods: {
    checkFaceRequest(imgUrl) {
      console.log(imgUrl);
      this.$vux.loading.show({
        text: "正在识别"
      });
      faceCheck({
        image: imgUrl
      })
        .then(res => {
          console.log(res);
          if (res.result === 1) {
            this.$vux.loading.hide();
            this.$vux.toast.show({
              type: "success",
              text: "识别成功",
              time: 1000
            });
          } else {
            this.$vux.loading.hide();
            this.$vux.toast.show({
              type: "cancel",
              text: "识别失败",
              time: 1000
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getFaceImg(event) {
      const files = event.target.files;
      this.$vux.loading.show({
        text: "正在上传"
      });
      if (files && files.length > 0) {
        let file = files[0];
        if (file.size > 10 * 1024 * 1024) {
          this.$vux.loading.hide();
          this.$vux.toast.show({
            type: "cancel",
            text: "图片过大",
            time: 1000
          });
          return;
        }
        this.formData.append("file", file);
        axios
          .post(this.videoUploadUrl, this.formData, FACEUPLOADCONFIG)
          .then(res => {
            if (res.data.result === 1) {
              this.checkFaceRequest(res.data.data.files[0].url);
            } else {
              this.$vux.loading.hide();
              this.$vux.toast.show({
                type: "warn",
                text: "失败请重试",
                time: 1000
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },

  watch: {}
};
</script>
<style lang='css' scoped>
.face-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.face-content {
  width: 100%;
  margin-top: 45px;
  padding: 0 15px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.face-img {
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.face-desc {
  font-size: 14px;
  color: #666666;
}
.face-btn {
  width: 80%;
  height: 45px;
  line-height: 45px;
  display: inline-block;
  overflow: hidden;
  margin-top: 100px;
  border-radius: 20px;
  background: -webkit-linear-gradient(
    left,
    #509cf5,
    #3471fb
  ); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(
    right,
    #509cf5,
    #3471fb
  ); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(
    right,
    #509cf5,
    #3471fb
  ); /* Firefox 3.6 - 15 */
  background: linear-gradient(to right, #509cf5, #3471fb); /* 标准的语法 */
}
.face-tip {
  width: 100%;
  height: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: #999;
  margin-top: 50px;
}
.camera-input {
  width: 100%;
  height: 100%;
  opacity: 0;
  position: relative;
  z-index: 999;
  top: -48px;
}
</style>