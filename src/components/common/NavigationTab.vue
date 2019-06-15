<template>
  <tab :line-width="3" bar-position="top" custom-bar-width="40px">
    <tab-item
      v-for="(item,index) in dataList"
      :selected="index === selectIndex"
      :key="index"
      @on-item-click="onItemClick"
    >{{item}}</tab-item>
  </tab>
</template>

<script>
import { Tab, TabItem } from "vux";
export default {
  name: "",
  props: ["dataList"],
  data() {
    return {};
  },

  components: {
    Tab,
    TabItem
  },

  computed: {
    selectIndex() {
      let index = this.$route.query.type;
      if (index) {
        if (index <= 3) {
          return index - 1;
        } else {
          return index - 4;
        }
      } else {
        return 0;
      }
    }
  },

  beforeMount() {},

  mounted() {},

  methods: {
    onItemClick(index) {
      this.$emit("changePath", index);
    }
  },

  watch: {}
};
</script>
<style lang='' scoped>
</style>