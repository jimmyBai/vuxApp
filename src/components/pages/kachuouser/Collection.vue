<template>
  <div class="order-list-wrap">
    <Header
      :titleContent="TitleObjData.titleContent"
      :showLeftBack="TitleObjData.showLeftBack"
      :showRightMore="TitleObjData.showRightMore"
    ></Header>
    <Tab
      style="margin-top:50px"
      :tabList="tabListCon"
      ref="tabItem"
      v-on:currentIndex="getCurrentINdex"
    ></Tab>
    <div class="con-hei-wrap" :style="conSty">
      <GoodsCollection v-if="showIndex === 0" :orderData="dataList"></GoodsCollection>
      <JonuaryCollection v-if="showIndex === 1" :dataList="dataList"></JonuaryCollection>
      <NotesCollection v-if="showIndex === 2" :dataList="dataList"></NotesCollection>
      <LectureCollection v-if="showIndex === 3" :dataList="dataList"></LectureCollection>
    </div>
  </div>
</template>

<script>
import Header from "@/components/common/Header";
import Tab from "@/components/common/Tab";
import GoodsCollection from "@/components/layout/GoodsCollection";
import JonuaryCollection from "@/components/layout/JonuaryCollection";
import NotesCollection from "@/components/layout/NotesCollection";
import LectureCollection from "@/components/layout/LectureCollection";
import { CollectionList } from "@/servers/api";

export default {
  name: "",
  props: [""],
  data() {
    return {
      TitleObjData: {
        titleContent: "收藏",
        showLeftBack: true,
        showRightMore: false
      },
      tabListCon: ["作品", "旅拍", "游记", "讲堂"],
      dataList: [],
      showIndex: 0
    };
  },

  components: {
    Header,
    Tab,
    GoodsCollection,
    JonuaryCollection,
    NotesCollection,
    LectureCollection
  },

  computed: {
    conSty() {
      return { height: document.documentElement.clientHeight - 60 + "px" };
    }
  },

  beforeMount() {},

  updated() {},

  mounted() {
    this.getInitData(1);
  },

  methods: {
    getCurrentINdex(val) {
      this.showIndex = val;
      let type = 1;
      if(val === 0){
        type = 1;
      }else if(val === 1){
        type = 9;
      }else if(val === 2){
        type = 10;
      }else{
        type = 8;
      }
      this.getInitData(type);
    },
    getInitData(type){
      this.dataList = [];
      CollectionList({
        type:type
      })
      .then(res =>{
        if(res.result === 1){
          this.dataList = res.data.result;
        }
      })
      .catch(err =>{
        console.log(err);
      })
    }
  },

  watch: {}
};
</script>
<style lang='css' scoped>
.order-list-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.con-hei-wrap {
  width: 100%;
  overflow: hidden;
  overflow-y: scroll;
  background: #f9f9f9;
  padding-bottom: 50px;
  box-sizing: border-box;
}
</style>