<template>
  <div class="tab-item-play-search-wrap">
    <Search class="search-model-input" style="height:50px" ref="searchBox" :placeHolder="placeHolderTxt"></Search>
    <SearchModel class="search-model"></SearchModel>
  </div>
</template>

<script>
import Search from "@/components/common/Search";
import SearchModel from "@/components/layout/SearchModel";

export default {
  name: "",
  props: [""],
  data() {
    return {
      placeHolderTxt: "输入作品/作者/景区"
    };
  },

  components: {
    Search,
    SearchModel
  },

  computed: {},

  beforeMount() {},

  mounted() {
  },

  methods: {},

  watch: {}
};
</script>
<style lang='css' scoped>
.tab-item-play-search-wrap {
  width: 100%;
  height: 100%;
  background: #fff;
}
.search-model{
  margin-top: 20px;
}
</style>