<template>
  <div class="tab-item-mall-header-wrap">
    <div class="tab-item-mall-left flex-wrap-center-wrap" @click="showLeftModel">
      <!-- <span class="iconfont iconfenlei"></span> -->
    </div>
    <div class="tab-item-mall-mid" @click="searchScence">输入作品/作者/景区</div>
    <div class="tab-item-mall-right flex-wrap-center-wrap">
      <span class="iconfont iconxiaoxi" @click="appMessageCenter"></span>
    </div>
    <Popup :showModelFlag="showModel"></Popup>
  </div>
</template>

<script>
import Popup from "@/components/layout/Popup";

export default {
  name: "",
  props: [""],
  data() {
    return {
      showModel: false
    };
  },

  components: {
    Popup
  },

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {
    searchScence() {
      this.$router.push("/usersearch");
    },
    showLeftModel() {
      // this.$store.commit("showMallLeftOptionState", true);
    },
    appMessageCenter() {
      this.$router.push("/appmessage");
    }
  },

  watch: {}
};
</script>
<style lang='css' scoped>
.tab-item-mall-header-wrap {
  width: 100%;
  height: 45px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #fff;
}
.tab-item-mall-left {
  flex: 1;
}
.tab-item-mall-mid {
  flex: 4;
  width: 300px;
  height: 26px;
  line-height: 26px;
  background: #fff;
  border-radius: 20px;
  font-size: 12px;
  color: #999;
  text-align: center;
  background: #f5f5f5;
}
.tab-item-mall-right {
  flex: 1;
}
</style>