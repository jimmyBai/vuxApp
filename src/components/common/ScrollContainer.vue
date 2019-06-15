<template>
  <div class="scroll-container-wrap" :style="contentNoHeaderHeight" :content="content">
    <div v-html="content"></div>
  </div>
</template>

<script>
export default {
  name: "",
  props: ["content"],
  data() {
    return {};
  },

  components: {},

  computed: {
    contentNoHeaderHeight: function() {
      return { height: document.documentElement.clientHeight - 50 + "px" };
    }
  },

  beforeMount() {},

  mounted() {},

  methods: {},

  watch: {}
};
</script>
<style lang='css' scoped>
.scroll-container-wrap{
  width: 100%;
  margin-top: 50px;
}
</style>