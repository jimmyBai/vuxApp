<template>
  <div class="user-location-wrap">
    <Header
      :titleContent="TitleObjData.titleContent"
      :showLeftBack="TitleObjData.showLeftBack"
      :showRightMore="TitleObjData.showRightMore"
    ></Header>
    <SearchButton></SearchButton>
    <ScenceHotSearch></ScenceHotSearch>
  </div>
</template>

<script>
import Header from "@/components/common/Header";
import SearchButton from "@/components/common/SearchButton";
import ScenceHotSearch from "@/components/layout/ScenceHotSearch";

export default {
  name: "",
  props: [""],
  data() {
    return {
      TitleObjData: {
        titleContent: "选择景区",
        showLeftBack: true,
        showRightMore: false
      }
    };
  },

  components: {
    Header,
    SearchButton,
    ScenceHotSearch
  },

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {},

  watch: {}
};
</script>
<style lang='css' scoped>
.user-location-wrap{
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  background: #f5f5f5;
}
</style>