<template>
  <div class="tab-item-person-header-wrap">
    <span class="tab-item-person-header-set font-weight-36px" @click="setting">设置</span>
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
    setting(){
      this.$router.push("/setting");
    }
  },

  watch: {}
};
</script>
<style lang='css' scoped>
.tab-item-person-header-wrap {
  width: 100%;
  height: 50px;
  padding: 0 15px;
  box-sizing: border-box;
  background: #222;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}
.tab-item-person-header-set {
  color: #fff;
}
</style>