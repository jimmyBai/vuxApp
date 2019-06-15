<template>
  <div class="input-textarea-wrap">
    <p class="input-textarea-title">标题</p>
    <x-input
      class="input-textarea-input"
      placeholder="请输入标题"
      v-model="inputValue"
      @on-change="getInputVal"
      :show-clear="false"
    ></x-input>
    <p class="input-textarea-title">内容</p>
    <Group>
      <x-textarea
        class="input-textarea-textarea"
        :rows="6"
        :max="999"
        name="description"
        placeholder="请输入内容"
        v-model="textareaValue"
        @on-change="getTextareaValue"
      ></x-textarea>
    </Group>
    <p class="image-upload-title">
      <span class>上传视频</span>
      <span class="image-upload-weak-tip">( 视频大小不能超过30M )</span>
    </p>
    <VideoUploader ref="imgUpload" v-on:getVideoUploadUrl="getVideoUrl"></VideoUploader>
    <Address v-on:selectAddress="getVideoAddress"></Address>
    <x-button type="primary" class="submit-btn" @click.native="formData">发布</x-button>
  </div>
</template>

<script>
import { XTextarea, Group, XInput, XButton } from "vux";
import VideoUploader from "@/components/common/VideoUploader";
import Address from "@/components/common/Address";
import { SeourceCreatedSubmit } from "@/servers/api";
export default {
  data() {
    return {
      inputValue: "",
      textareaValue: "",
      videoUrlData: "",
      arressVal: ""
    };
  },
  components: {
    XTextarea,
    Group,
    XInput,
    XButton,
    VideoUploader,
    Address
  },
  methods: {
    getVideoAddress(val) {
      // console.log(val);
      this.arressVal = val;
    },
    getVideoUrl(val) {
      this.videoUrlData = val;
    },
    onEvent(event) {
      // console.log("on", event);
    },
    getInputVal() {
      // console.log(this.inputValue);
    },
    getTextareaValue() {
      // console.log(this.textareaValue);
    },
    showToast(content) {
      this.$vux.toast.text(content, "mid");
      setTimeout(() => {
        this.$vux.toast.hide();
      }, 2000);
    },
    formData() {
      if (!this.inputValue) {
        this.showToast("请输入标题");
        return;
      } else if (!this.textareaValue) {
        this.showToast("请输入内容");
        return;
      } else if (!this.videoUrlData) {
        this.showToast("请上传视频");
        return;
      } else if (!this.arressVal) {
        this.$vux.confirm.show({
          title: "提示",
          content: "发布地点未选，确定要发布吗？",
          onCancel() {
            return;
          },
          onConfirm: () => {
            this.submitForm();
          }
        });
      } else {
        this.submitForm();
      }
    },
    submitForm() {
      this.$vux.loading.show({
        text: "正在发布"
      });
      SeourceCreatedSubmit({
        type: this.$route.query.branch,
        title: this.inputValue,
        summary: this.textareaValue,
        video: this.videoUrlData,
        address: this.arressVal
      })
        .then(res => {
          console.log(res);
          if (res.result === 1) {
            this.$vux.loading.hide();
            this.$vux.toast.show({
              type: "success",
              text: "发布成功",
              time: 1000,
              onHide: () => {
                this.$router.goBack();
              }
            });
          } else {
            this.$vux.loading.hide();
            this.$vux.toast.show({
              type: "warn",
              text: "失败，请重试",
              time: 1000
            });
          }
        })
        .catch(err => {
          this.$vux.loading.hide();
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.input-textarea-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.input-textarea-input {
  width: 100%;
  height: 40px;
  background: #f9f9f9;
  font-size: 14px;
  border-radius: 4px;
  font-weight: normal;
}
.input-textarea-textarea {
  width: 100%;
  height: 150px;
  background: #f9f9f9;
  font-size: 14px;
  border-radius: 4px;
}
.input-textarea-title {
  width: 100%;
  height: 50px;
  line-height: 50px;
}
.submit-btn {
  margin-top: 50px;
}
.image-upload-title {
  width: 100%;
  height: 30px;
  line-height: 30px;
  margin-top: 10px;
  padding-left: 10px;
  box-sizing: border-box;
}
.image-upload-weak-tip {
  font-size: 12px;
  color: #999;
}
</style>
