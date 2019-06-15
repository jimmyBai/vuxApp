<template>
  <div class="tickets-discount-wrap">
    <Header
      :titleContent="TitleObjData.titleContent"
      :showLeftBack="TitleObjData.showLeftBack"
      :showRightMore="TitleObjData.showRightMore"
    ></Header>
    <div class="tickets-discount-list" :style="contentNoHeaderHeight">
      <TicketsDiscount></TicketsDiscount>
    </div>
  </div>
</template>

<script>
import Header from "@/components/common/Header";
import TicketsDiscount from "@/components/layout/TicketsDiscount";
import ScrollContainer from "@/components/common/ScrollContainer";

export default {
  name: "",
  props: [""],
  data() {
    return {
      TitleObjData: {
        titleContent: "票务打折",
        showLeftBack: true,
        showRightMore: false
      }
    };
  },

  components: {
    Header,
    TicketsDiscount,
    ScrollContainer
  },

  computed: {
    contentNoHeaderHeight: function() {
      return { height: document.documentElement.clientHeight - 50 + "px" };
    }
  },

  beforeMount() {},

  mounted() {
    
  },

  methods: {},

  watch: {}
};
</script>
<style lang='css' scoped>
.tickets-discount-wrap {
  width: 100%;
}
.tickets-discount-list {
  width: 100%;
  height: auto;
  overflow-y: scroll;
  padding: 15px;
  box-sizing: border-box;
  margin-top: 50px;
  background: #f9f9f9;
}
</style>