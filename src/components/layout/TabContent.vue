<template>
  <div :style="conHeight">
    <KachuoTabPlay v-if="getCurrentTabItem === 0"></KachuoTabPlay>
    <KachuoTabMall v-if="getCurrentTabItem === 1"></KachuoTabMall>
    <KachuoTabCash v-if="getCurrentTabItem === 2"></KachuoTabCash>
    <KachuoTabIncome v-if="getCurrentTabItem === 3"></KachuoTabIncome>
    <KachuoTabPersonalCenter v-if="getCurrentTabItem === 4"></KachuoTabPersonalCenter>
  </div>
</template>

<script>
import store from "@/store/index";
import { Tabbar, TabbarItem, Group, Cell } from "vux";
import KachuoTabPlay from "@/components/pages/tabindex/KachuoTabPlay";
import KachuoTabMall from "@/components/pages/tabindex/KachuoTabMall";
import KachuoTabCash from "@/components/pages/tabindex/KachuoTabCash";
import KachuoTabIncome from "@/components/pages/tabindex/KachuoTabIncome";
import KachuoTabPersonalCenter from "@/components/pages/tabindex/KachuoTabPersonalCenter";

export default {
  components: {
    Tabbar,
    TabbarItem,
    Group,
    Cell,
    KachuoTabPlay,
    KachuoTabMall,
    KachuoTabCash,
    KachuoTabIncome,
    KachuoTabPersonalCenter
  },
  data() {
    return {
      conHeight:{
        width:'100%',
        height:'200px',
        overflow:'hidden',
        overflowY:'scroll'
      }
    };
  },
  created() {
    this.getContentHeight();
  },
  mounted() {},
  methods: {
    getContentHeight(){
      this.conHeight.height = document.documentElement.clientHeight - 46 + 'px';
    }
  },
  computed: {
    getCurrentTabItem() {
      return this.$store.state.tabIndex;
    }
  },
  watch: {
    $route: (to, from) => {}
  }
};
</script>
<style lang="css" scoped>
</style>
