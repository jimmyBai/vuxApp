<template>
  <div>
    <div class="sketch">
      <div class="sketch-img" :style="sketchImg"></div>
      <p @click="jumpFacefn">跳过</p>
      <p class="sketch-text">
        正面平视手机、保证光线充足
        <br>请勿遮挡面部
      </p>
    </div>
    <div class="prompt">
      <div class="prompt-box">
        <div class="prompt-box-text" v-for="item in items" :key="item.number">
          <span class="prompt-box-text-number">{{item.number}}</span>
          <span class="prompt-box-text-content">{{item.text}}</span>
          <span class="prompt-box-text-border" v-if="item.border"></span>
        </div>
      </div>
    </div>
    <div class="btn-wrap">
      <x-button type="primary" class="camera-btn" style="width:80%">
        拍摄
        <input
          type="file"
          class="camera-input"
          ref="cameraInput"
          accept="image/*"
          capture="camera"
          @change="getFaceImg($event)"
        >
      </x-button>
    </div>
  </div>
</template>

<script>
import { XButton } from "vux";
import axios from "axios";
const FACEUPLOADCONFIG = {
  timeout: 10000,
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("token")
  }
};
export default {
  components: {
    XButton
  },
  data() {
    return {
      showVerifyCodeModal: false,
      verifyCode: "",
      nextDisabled: false,
      showLoading: false,
      showResult: false,
      videoResultDetail: null,
      videoFail: false,
      videoFailText: {},
      showPopupError: false,
      items: [
        {
          number: 1,
          text: "打开手机相机",
          border: 1
        },
        {
          number: 2,
          text: "切换置前置摄像头",
          border: 1
        },
        {
          number: 3,
          text: "完成拍摄，等待验证结果",
          border: 0
        }
      ],
      sketchImg: {
        backgroundImage:
          "url(" + require("@/assets/images/face-img/sketch.png") + ")",
        backgroundSize: "100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center"
      },
      videoUploadUrl:
        "https://core.kachuo.com/app/ewei_shopv2_app.php?i=5&c=site&a=entry&m=ewei_shopv2&do=mobile&r=util.uploader.uploadm",
      formData: new FormData()
    };
  },

  mounted() {
    let ua = navigator.userAgent.toLowerCase();
    let model = ua.indexOf("android");
    let browser = ua.indexOf("micromessenger");

    if (model !== -1 && browser !== -1) {
      this.showPopupError = true;
    }
  },

  methods: {
    jumpFacefn(){
      this.$router.push("/indextab");
    },
    getFaceImg(event) {
      console.log(event);
      const files = event.target.files;
      this.$vux.loading.show({
        text: "正在识别"
      });
      if (files && files.length > 0) {
        let file = files[0];
        let self = this;

        if (file.size > 10 * 1024 * 1024) {
          this.$vux.loading.hide();
          this.$vux.toast.show({
            type: "cancel",
            text: "图片过大",
            time: 1000
          });
          return;
        }
        this.formData.append("file", files);
        let reader = new FileReader();
        axios
          .post(this.videoUploadUrl, this.formData, FACEUPLOADCONFIG)
          .then(res => {
            if (res.data.result === 1) {
              this.$vux.loading.hide();
              this.$vux.toast.show({
                type: "success",
                text: "识别成功",
                time: 1000
              });
              this.getImg.push(res.data.data.files[0].url);
            } else {
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
    },
    onDialogCancel() {
      this.nextDisabled = false;
      this.showVerifyCodeModal = false;
    },

    onDialogAgain() {
      this.nextDisabled = false;
      this.showResult = false;
      this.showVerifyCodeModal = true;
    },

    onDialogVideoResult(event, sessionId) {
      // 显示loding图
      const files = event.target.files;
      this.showLoading = true;

      if (files && files.length > 0) {
        let file = files[0];
        let self = this;

        if (file.size > 20 * 1024 * 1024) {
          this.showLoading = false;
          this.videoFail = true;
          this.videoFailText = {
            title: "视频上传失败",
            detail: "您录制的视频时间过大,请重新录制"
          };
          return;
        }

        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener("loadend", function() {
          let formdata = {
            type: "faceliveness_verify",
            apiType: "faceliveness",
            session_id: sessionId,
            video_base64: reader.result.split(",")[1]
          };

          //   request
          //     .post("/aidemo")
          //     .type("form")
          //     .send(formdata)
          //     .then(({ body }) => {
          //       /* eslint-disable fecs-camelcase */
          //       const { err_no, data } = body;
          //       if (err_no) {
          //         this.errorContent();

          //         return;
          //       }
          //       self.showLoading = false;
          //       self.showResult = true;
          //       self.videoResultDetail = data;
          //       // 关闭弹窗
          //       self.showVerifyCodeModal = false;
          //       /* eslint-enable fecs-camelcase */
          //     })
          //     .catch(msg => {
          //       this.errorContent();
          //     });
        });
      }
    },

    nextStep() {
      this.showVerifyCodeModal = true;
    },

    errorContent() {
      this.showLoading = false;
      this.videoFail = true;
      this.videoFailText = {
        title: "视频上传失败",
        detail: "视频上传失败，请重新上传"
      };
    }
  }
};
</script>
<style lang="less">
@color-blue: #0c0c0c;
.btn-wrap{
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.camera-input {
  width: 100%;
  height: 100%;
  opacity: 0;
  position: relative;
  z-index: 999;
  top: -48px;
}
.camera-btn {
  width: 80%;
  height: 45px;
  display: inline-block;
  overflow: hidden;
  line-height: 45px;
  color: #fff;
}
.sketch {
  background: rgba(225, 225, 225, 0.35);
  padding: 0.8333rem 1.666rem 1.2rem;

  &-img {
    width: 14.916rem;
    height: 21.583rem;
    margin: 0 auto;
    background-size: 100% auto;
  }

  &-text {
    font-size: 14px;
    color: #999;
    letter-spacing: 0;
    line-height: 24px;
    text-align: center;
  }
}

.prompt {
  box-shadow: 0 -4px 10px 0 #e8e8e8;
  padding-bottom: 0.833rem;

  &-box {
    padding: 4.166rem 0;

    &-text {
      margin: 0 auto 2.666rem;
      height: 1.334rem;
      line-height: 1.334rem;
      width: 25.5rem;

      &:last-child {
        margin-bottom: 0;
      }

      &-number {
        border-radius: 200px;
        border: 1px solid @color-blue;
        text-align: center;
        color: @color-blue;
        display: inline-block;
        width: 1.334rem;
        height: 1.333rem;
        line-height: 1.333rem;
        box-sizing: border-box;
        font-size: 12px;
        margin-right: 0.833rem;
        letter-spacing: 0;
        vertical-align: top;
      }

      &-content {
        color: #333;
        letter-spacing: 0;
        white-space: nowrap;
        display: inline-block;
        font-size: 1.333rem;
      }

      &-border {
        height: 1.9rem;
        margin: 0.417rem 0 0.417rem 0.59rem;
        width: 0;
        border-left: 1px dotted @color-blue;
        display: block;
      }
    }
  }

  &-next {
    margin: 0 auto;
    height: 4.083rem;
    line-height: 4.083rem;
    text-align: center;
    background: @color-blue;
    border-radius: 4px;
    color: #fff;
    display: block;
    width: 28.75rem;
    font-size: 16px;
    outline: none;
    border: none;

    &-disabled {
      background-color: #ccc;
    }
  }
}
</style>