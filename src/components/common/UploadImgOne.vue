<template>
  <div class="control-form">
    <ul class="upload-imgs">
      <li>
        <input
          type="file"
          class="upload"
          @change="addImg"
          ref="inputer"
          accept="image/*"
        >
        <a class="add">
          <p class="add-icon">+</p>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import { imageUpload, setNickName } from "@/servers/api";
export default {
  data() {
    return {
      formData: new FormData(),
      imgs: {},
      imgLen: 0,
      getImg: "",
      videoUploadUrl:
        "https://core.kachuo.com/app/ewei_shopv2_app.php?i=5&c=site&a=entry&m=ewei_shopv2&do=mobile&r=util.uploader.uploadm"
    };
  },
  methods: {
    updataUserImg(val) {
      setNickName({
        avatar: val
      })
        .then(res => {
          if (res.result === 1) {
            this.$vux.toast.show({
              type: "success",
              text: "设置成功",
              time: 1000
            });
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
    },
    addImg(event) {
      let inputDOM = this.$refs.inputer;
      this.fil = inputDOM.files;
      let oldLen = this.imgLen;
      let len = this.fil.length + oldLen;
      for (let i = 0; i < this.fil.length; i++) {
        let size = Math.floor(this.fil[i].size / 1024);
        if (size > 10 * 1024 * 1024) {
          this.showToast("请选择10M以内的图片！");
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
    submit() {
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
            console.log(res);
            this.$vux.toast.show({
              type: "success",
              text: "上传成功",
              time: 1000
            });
            this.getImg = res.data.data.files[0];
            this.$store.commit("changeUserAvatar", res.data.data.files[0].url);
            this.$emit("getHeaderImgUrl", res.data.data.files[0].url);
            this.updataUserImg(res.data.data.files[0].url);
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
  mounted() {}
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
  border: 1px solid #eee;
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