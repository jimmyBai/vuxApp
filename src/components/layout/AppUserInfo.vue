<template>
  <div class="user-info-header">
    <div class="user-info-header-img-wrap">
      <div class="user-info-header-img">
        <img :src="userInfo.avatar" alt="头像">
        <ImageUpload
          class="img-upload-wrap"
          ref="ImageUploadCom"
          v-on:getHeaderImgUrl="getHeaderImgUrlData"
        ></ImageUpload>
      </div>
      <div class="user-info-header-desc">
        <p>{{userInfo.nickname}}</p>
        <p>{{userInfo.mobile}}</p>
      </div>
    </div>
    <div class="user-info-header-right" @click="setting">
      <span class="iconfont iconyoujiantou"></span>
    </div>
  </div>
</template>

<script>
import ImageUpload from "@/components/common/UploadImgOne";

export default {
  name: "",
  props: [""],
  data() {
    return {
      imgUrl: ""
    };
  },

  components: {
    ImageUpload
  },

  computed: {
    userInfo() {
      return this.$store.state.userLoginInfo;
    }
  },
  created() {},
  beforeMount() {},

  mounted() {
  },

  methods: {
    setting() {
      this.$router.push("/setting");
    },
    getHeaderImgUrlData(data) {
      this.imgUrl = data;
    }
  },

  watch: {},
  updated() {}
};
</script>
<style lang='css' scoped>
.user-info-header {
  width: 100%;
  height: 80px;
  background: #222;
  color: #fff;
  padding: 0 15px 15px 15px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.user-info-header-img-wrap {
  width: 160px;
  height: 50px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.user-info-header-img img {
  width: 50px;
  height: 50px;
  display: inline-block;
  border: 2px solid #fff;
  position: relative;
  box-sizing: border-box;
  top: 28px;
}
.img-upload-wrap {
  width: 50px;
  height: 50px;
  overflow: hidden;
  display: inline-block;
  background: red;
  position: relative;
  top: -25px;
  z-index: 999;
  opacity: 0;
}
.user-info-header-right {
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 28px;
  font-weight: bold;
}
.user-info-header-desc {
  font-size: 16px;
}
</style>