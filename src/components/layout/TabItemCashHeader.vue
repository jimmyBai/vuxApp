<template>
  <div class="tab-item-cash-header-wrap">
    <span class="tab-item-cash-header-left"></span>
    <span class="tab-item-cash-header-mid font-weight-36px">变现</span>
    <span class="tab-item-cash-header-right">
      <span class="iconfont iconxiaoxi" @click="appMessageCenter"></span>
    </span>
  </div>
</template>

<script>
export default {
  name: "",
  props: [""],
  data() {
    return {};
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {
    appMessageCenter() {
      this.$router.push("/appmessage");
    }
  },

  watch: {}
};
</script>
<style lang='css' scoped>
.tab-item-cash-header-wrap {
  width: 100%;
  height: 45px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: #fff;
}
.tab-item-cash-header-left {
  flex: 1;
}
.tab-item-cash-header-mid {
  flex: 4;
  text-align: center;
  font-weight: bold;
}
.tab-item-cash-header-right {
  flex: 1;
  text-align: right;
  padding-right: 15px;
  box-sizing: border-box;
}
</style>