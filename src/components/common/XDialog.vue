<template>
  <div style="height: 1000px">
    <div v-transfer-dom>
      <x-dialog v-model="showToast" class="dialog-demo">
        <div style="padding:15px;">{{allCode}}</div>
        <div @click="showToast=false">
          <span class="vux-close"></span>
        </div>
      </x-dialog>
    </div>

    <div v-transfer-dom>
      <x-dialog v-model="showHideOnBlur" class="dialog-demo" hide-on-blur>
        <div class="img-box">
          <img
            src=""
            style="max-width:100%"
          >
        </div>
        <div @click="showHideOnBlur=false">
          <span class="vux-close"></span>
        </div>
      </x-dialog>
    </div>
  </div>
</template>

<script>
import {
  XDialog,
  XButton,
  Group,
  XSwitch,
  TransferDomDirective as TransferDom
} from "vux";

export default {
  props: ["showDialogFlag"],
  directives: {
    TransferDom
  },
  components: {
    XDialog,
    XButton,
    Group,
    XSwitch
  },
  methods: {
    showToastFn(code) {
      this.showToast = true;
      this.allCode = code;
    },
    showHideOnBlurFn() {
      this.showHideOnBlur = true;
    }
  },
  data() {
    return {
      showToast: false,
      showHideOnBlur: false,
      allCode:'这是完整的code'
    };
  }
};
</script>

<style lang="less" scoped>
@import "~vux/src/styles/close";

.dialog-demo {
  .weui-dialog {
    border-radius: 8px;
    padding-bottom: 8px;
  }
  .dialog-title {
    line-height: 30px;
    color: #666;
  }
  .img-box {
    height: 350px;
    overflow: hidden;
  }
  .vux-close {
    margin-top: 8px;
    margin-bottom: 8px;
  }
}
</style>