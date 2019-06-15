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
      <span class>上传图片(最多上传三张)</span>
      <span class="image-upload-weak-tip">( 图片大小不能超过10M )</span>
    </p>
    <ImageUploader ref="imgUpload" v-on:getImgUploadUrl="getImgUrl"></ImageUploader>
    <Address v-show="showAddress" v-on:selectAddress="getImgAddress"></Address>
    <x-button type="primary" class="submit-btn" @click.native="formData">发布</x-button>
  </div>
</template>

<script>
import { XTextarea, Group, XInput, XButton } from "vux";
import ImageUploader from "@/components/common/ImageUploader";
import Address from "@/components/common/Address";
import { SeourceCreatedSubmit } from "@/servers/api";

export default {
  props: ["showAddress"],
  data() {
    return {
      inputValue: "",
      textareaValue: "",
      imgList: [],
      arressVal: ""
    };
  },
  components: {
    XTextarea,
    Group,
    XInput,
    XButton,
    ImageUploader,
    Address
  },
  methods: {
    getImgAddress(val) {
      // console.log(val);
      this.arressVal = val;
    },
    getImgUrl(val) {
      // console.log(val);
      this.imgList = val;
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
      } else if (!this.imgList.length) {
        this.showToast("请上传图片");
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
    onEvent(event) {
      // console.log("on", event);
    },
    getInputVal() {
      // console.log(this.inputValue);
    },
    getTextareaValue() {
      // console.log(this.textareaValue);
    },
    submitForm() {
      SeourceCreatedSubmit({
        type: this.$route.query.branch,
        title: this.inputValue,
        summary: this.textareaValue,
        image: this.imgList.join(","),
        address: this.arressVal
      })
        .then(res => {
          console.log(res);
          if (res.result === 1) {
            this.$vux.toast.show({
              type: "success",
              text: "发布成功",
              time: 1000,
              onHide: () => {
                this.$router.goBack();
              }
            });
          } else {
            this.$vux.toast.show({
              type: "warn",
              text: "失败，请重试",
              time: 1000
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  beforeDestroy() {
    this.inputValue = "";
    this.textareaValue = "";
    this.imgList = [];
    this.arressVal = "";
  }
};
</script>

<style scoped>
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
  margin-top: 80px;
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
