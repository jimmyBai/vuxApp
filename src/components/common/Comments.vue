<template>
  <div class="comments-wrap">
    <input
      title
      placeholder="说点什么吧～"
      class="comments-wrap-input"
      :show-clear="false"
      v-model="value"
      :min="1"
      :max="100"
      ref="inputVal"
      @input="onChange"
    >
    <x-button
      slot="right"
      type="primary"
      class="comments-wrap-btn"
      mini
      @click.native="submitData"
    >提交</x-button>
  </div>
</template>

<script>
import { XInput, Group, XButton, Cell} from "vux";
import { NewsKachuoTopic } from "@/servers/api";
import { setTimeout } from "timers";
export default {
  components: {
    XInput,
    XButton,
    Group,
    Cell
  },
  data() {
    return {
      value: ""
    };
  },
  methods: {
    onChange() {
      // console.log(this.value);
    },
    submitData() {
      if (!this.value) {
        this.$vux.toast.text("评论内容不能为空", "middle");
        setTimeout(() => {
          this.$vux.toast.hide();
        }, 1000);
        return;
      }
      NewsKachuoTopic({
        id: this.$route.query.id,
        content: this.value,
        type: this.$route.query.type
      })
        .then(res => {
          if (res.result === 1) {
            this.$vux.toast.show({
              type: "success",
              text: "感谢您的评论",
              time: 1000,
              onHide: () => {
                this.value = "";
                this.$emit("pushCommition");
              }
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  updated() {},
  beforeDestroy() {
    this.value = "";
  }
};
</script>
<style lang="css" scoped>
.comments-wrap {
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 9999;
  padding: 0 20px;
  border-top: 1px solid #eee;
  box-sizing: border-box;
}
.comments-wrap-input {
  flex: 5;
  height: 34px;
  outline: none;
  border-radius: 4px;
  border: 1px solid #eee;
  padding: 0 3px;
  box-sizing: border-box;
  font-size: 14px;
}
.comments-wrap-btn {
  flex: 1;
  margin-left: 24px;
}
</style>