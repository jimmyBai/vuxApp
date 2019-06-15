<!--
 * @Description: 
 * @Author: lpb
 * @Github: https://github.com/lpb273
 * @LastEditors: lpb
 * @Date: 2019-05-07 11:08:15
 * @LastEditTime: 2019-05-07 11:10:57
 -->
<template>
  <div class="photo-album-wrap">
    <Header
      :titleContent="TitleObjData.titleContent"
      :showLeftBack="TitleObjData.showLeftBack"
      :showRightMore="TitleObjData.showRightMore"
    ></Header>
    <div class="photo-album-content" :style="conHei">
      <p v-html="imgList">
        
      </p>
      <x-button type="primary" class="submit" @click.native="formData">我要抢单</x-button>
    </div>
  </div>
</template>

<script>
import Header from "@/components/common/Header";
import { XInput, Group, XButton, Cell } from "vux";
import ImageUploader from "@/components/common/ImageUploader";
import { SaveYcOrder } from "@/servers/api";
export default {
  name: "",
  props: [""],
  data() {
    return {
      TitleObjData: {
        titleContent: "艺创征集",
        showLeftBack: true,
        showRightMore: false
      },
      iconType: "",
      imgList: [],
      label: "",
      explain: "",
      elem: "",
      desc: ""
    };
  },

  components: {
    Header,
    Group,
    XInput,
    XButton,
    Cell,
    ImageUploader
  },

  computed: {
    conHei() {
      return { height: document.documentElement.clientHeight - 45 + "px" };
    }
  },

  beforeMount() {},

  mounted() {
    this.imgList = this.$route.query.arr;
  },

  methods: {
    formData() {
      this.$router.push("/yichuangqiangdaninput?id="+this.$route.query.id);
    }
  },

  watch: {}
};
</script>
<style lang='css' scoped>
.photo-album-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #fff;
}
.photo-album-content {
  width: 100%;
  background: #fff;
  margin-top: 45px;
  overflow: hidden;
  overflow-y: scroll;
  box-sizing: border-box;
}
.tip {
  width: 100%;
  height: 20px;
  line-height: 20px;
  text-align: center;
}
.p-title {
  width: 100%;
  height: 30px;
  text-align: left;
  line-height: 30px;
  font-size: 14px;
  padding-left: 15px;
  box-sizing: border-box;
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
.submit {
  width: 80%;
  margin-top: 30px;
  margin-bottom: 30px;
}
</style>