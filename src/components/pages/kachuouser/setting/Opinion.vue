<template>
  <div class="opinion-wrap">
    <Header
      :titleContent="TitleObjData.titleContent"
      :showLeftBack="TitleObjData.showLeftBack"
      :showRightMore="TitleObjData.showRightMore"
    ></Header>
    <div class="opinion-con" :style="conHei">
      <group>
        <x-textarea
          class="input-font-size"
          v-model="val"
          :max="999"
          :rows="5"
          placeholder="写下您的意见，方便我们及时改进～"
          @on-change="onEvent('focus')"
        ></x-textarea>
      </group>
      <x-button type="primary" class="sub-btn" @click.native="subBtnFn">提交</x-button>
    </div>
  </div>
</template>

<script>
import Header from "@/components/common/Header";
import { Group, XTextarea, XButton } from "vux";
import { OpinionBack } from "@/servers/api";
export default {
  name: "",
  props: [""],
  data() {
    return {
      TitleObjData: {
        titleContent: "意见反馈",
        showLeftBack: true,
        showRightMore: false
      },
      val: ""
    };
  },

  components: {
    Header,
    XTextarea,
    Group,
    XButton
  },

  computed: {
    conHei() {
      return { height: document.documentElement.clientHeight - 45 + "px" };
    }
  },

  beforeMount() {},

  mounted() {},

  methods: {
    onEvent(event) {
      // console.log(this.val);
    },
    subBtnFn() {
      if (this.val) {
        console.log(this.val);
        OpinionBack({
          content: this.val
        })
          .then(res => {
            if (res.result === 1) {
              this.$vux.alert.show({
                title: "成功",
                content: "感谢您的反馈",
                onHide: () => {
                  this.$router.goBack();
                }
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$vux.toast.show({
          type: "text",
          text: "请输入内容",
          time: 1000,
          position: "top"
        });
      }
    }
  },

  watch: {}
};
</script>
<style lang='css' scoped>
.opinion-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.opinion-con {
  width: 100%;
  background: #f9f9f9;
  margin-top: 50px;
  overflow: hidden;
  overflow-y: scroll;
  padding: 15px;
  box-sizing: border-box;
}
.input-font-size {
  font-size: 16px;
}
.sub-btn {
  width: 80%;
  margin-top: 80px;
}
</style>