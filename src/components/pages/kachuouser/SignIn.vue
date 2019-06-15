<template>
  <div class="sign-in-wrap">
    <Header
      :titleContent="TitleObjData.titleContent"
      :showLeftBack="TitleObjData.showLeftBack"
      :showRightMore="TitleObjData.showRightMore"
    ></Header>
    <div class="sign-in-content-wrap" :style="conHei">
      <div class="sign-in-content-top flex-wrap">
        <div class="circle-wrap flex-wrap">
          <div class="circle-mid flex-wrap">
            <div class="circle-min flex-wrap">签到</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/common/Header";

export default {
  name: "",
  props: [""],
  data() {
    return {
      TitleObjData: {
        titleContent: "签到",
        showLeftBack: true,
        showRightMore: false
      }
    };
  },

  components: {
    Header
  },

  computed: {
    conHei() {
      return { height: document.documentElement.clientHeight - 45 + "px" };
    }
  },

  beforeMount() {},

  mounted() {},

  methods: {},

  watch: {}
};
</script>
<style lang='css' scoped>
.flex-wrap {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.sign-in-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.sign-in-content-wrap {
  width: 100%;
  margin-top: 50px;
  background: #f9f9f9;
}
.sign-in-content-top {
  width: 100%;
  height: 200px;
  background: #4a74fe;
}
.circle-wrap {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
}
.circle-mid {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.7);
}
.circle-min {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 1);
  color: #4a74fe;
}
</style>