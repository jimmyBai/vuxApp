<template>
  <div class="search-wrap">
    <div class="search-history">
      <div class="search-history-header">
        <span class="search-title-bold">搜索历史</span>
        <span @click="delSearchHistory">删除</span>
      </div>
      <div class="search-history-item">
        <p class="search-history-item-bj text-overflow-hidden" v-for="(item,index) in searchHistoryItem" :key="index">
          <span>{{item}}</span>
        </p>
      </div>
    </div>
    <!-- <div class="search-people-list">
      <div class="search-people-list-header">
        <span class="search-title-bold">大家都在搜</span>
        <span>换一批</span>
      </div>
      <div class="search-people-item">
        <p class="search-history-item-bj text-overflow-hidden" v-for="(item,index) in searchPeopleItem" :key="index">
          <span>{{item}}</span>
        </p>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "",
  props: [""],
  data() {
    return {
      searchHistoryItem: [],
      searchPeopleItem: []
    };
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {
    this.searchHistoryItem = JSON.parse(localStorage.getItem("searchHistory"));
  },

  methods: {
    delSearchHistory(){
      this.searchHistoryItem = [];
      localStorage.removeItem("searchHistory");
    }
  },

  watch: {}
};
</script>
<style lang='css' scoped>
.search-history-header,
.search-people-list-header {
  width: 100%;
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  box-sizing: border-box;
  font-size: 14px;
  margin-bottom: 10px;
}
.search-history-item,.search-people-item {
  width: 100%;
  min-height: 20px;
  height: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0 10px;
  box-sizing: border-box;
  justify-content: flex-start;
}
.search-history-item-bj,.search-history-item-bj {
  width: 60px;
  display: inline-block;
  text-align: center;
  height: 20px;
  line-height: 20px;
  height: auto;
  background: #eee;
  font-size: 12px;
  margin-bottom: 8px;
  border-radius: 2px;
  padding: 0 2px;
  box-sizing: border-box;
  margin-right: 10px;
}
.search-people-list{
  margin-top: 10px;
}
.search-title-bold{
  font-weight: bold;
}
</style>