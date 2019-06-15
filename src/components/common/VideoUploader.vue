<template>
  <div class="control-form">
    <ul class="upload-imgs">
      <li v-if="imgLen>=1 ? false : true">
        <input
          type="file"
          class="upload"
          @change="addVideo"
          multiple="false"
          ref="inputer"
          accept="video/mp4, video/x-m4v, video/*"
        >
        <a class="add">
          <p class="add-icon">+</p>
        </a>
      </li>
      <li v-if="videoUrl">
        <video class="video-wrap" :src="videoUrl" :poster="posterImg"></video>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      formData: new FormData(),
      imgs: {},
      imgLen: 0,
      videoUrl: "",
      posterImg: "",
      videoUploadUrl:
        "https://core.kachuo.com/app/ewei_shopv2_app.php?i=5&c=site&a=entry&m=ewei_shopv2&do=mobile&r=util.uploader.uploadm_video"
    };
  },
  methods: {
    addVideo(event) {
      let inputDOM = this.$refs.inputer;
      this.fil = inputDOM.files;
      let oldLen = this.imgLen;
      let len = this.fil.length + oldLen;
      for (let i = 0; i < this.fil.length; i++) {
        let size = Math.floor(this.fil[i].size / 1024);
        if (size > 30 * 1024 * 1024) {
          this.showToast("请选择10M以内的视频！");
          return false;
        }
        this.imgLen++;
        this.$set(
          this.imgs,
          this.fil[i].name + "?" + new Date().getTime() + i,
          this.fil[i]
        );
      }
      this.submit();
    },
    getObjectURL(file) {
      var url = null;
      if (window.createObjectURL != undefined) {
        // basic
        url = window.createObjectURL(file);
      } else if (window.URL != undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file);
      } else if (window.webkitURL != undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
      }
      return url;
    },
    delImg(key) {
      this.$delete(this.imgs, key);
      this.imgLen--;
    },
    showLoading() {
      this.$vux.loading.show({
        text: "上传中"
      });
      setTimeout(() => {
        this.$vux.loading.hide();
      }, 2000);
    },
    showToast(content) {
      this.$vux.toast.text(content, "mid");
      setTimeout(() => {
        this.$vux.toast.hide();
      }, 2000);
    },
    postData() {},
    submit() {
      this.$vux.loading.show({
        text: "正在上传"
      });
      for (let key in this.imgs) {
        let name = key.split("?")[0];
        this.formData.append("file", this.imgs[key]);
      }
      let config = {
        timeout: 10000,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("token")
        }
      };
      axios
        .post(this.videoUploadUrl, this.formData, config)
        .then(res => {
          if (res.data.result === 1) {
            this.$vux.loading.hide();
            this.$vux.toast.show({
              type: "success",
              text: "上传成功",
              time: 1000
            });
            this.videoUrl = res.data.data.files[0].url;
            this.posterImg = res.data.data.files[0].cover_image;
            // console.log(this.videoUrl);
            this.$emit("getVideoUploadUrl", res.data.data.files[0].url);
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
  },
  mounted() {
    // this.showLoading();
    // this.showToast();
  }
};
</script>
<style lang='css' scoped>
.upload {
  opacity: 0;
}
.upload-imgs {
  overflow: hidden;
  font-size: 0;
}
.upload-imgs li {
  position: relative;
  width: 110px;
  height: 110px;
  font-size: 14px;
  display: inline-block;
  padding: 10px;
  text-align: center;
  vertical-align: middle;
}
.upload-imgs .add {
  display: block;
  background-color: #f9f9f9;
  color: #ffffff;
  height: 94px;
}
.upload-imgs li .upload {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 118px;
  height: 118px;
}
.upload-imgs .img {
  position: relative;
  width: 94px;
  height: 94px;
  line-height: 94px;
}
.video-wrap {
  width: 94px;
  height: 94px;
  display: inline-block;
  overflow: hidden;
}
.upload-imgs .img img {
  vertical-align: middle;
  object-fit: cover;
}
.upload-imgs .img .close {
  display: none;
}
.upload-imgs li .img .close {
  display: block;
  position: absolute;
  width: 20px;
  height: 20px;
  right: -10px;
  top: -10px;
  line-height: 20px;
  font-size: 20px;
  color: #999;
  background: #f9f9f9;
  border-radius: 50%;
}
.add-icon {
  font-size: 50px;
  color: #999;
}
</style>