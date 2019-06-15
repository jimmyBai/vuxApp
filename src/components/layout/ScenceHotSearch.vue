<template>
  <div class="search-hot-wrap">
    <p class="search-hot-title">热门景区</p>
    <div class="search-hot-list-wrap">
      <span
        class="text-overflow-hidden"
        v-for="(item,index) in dataList"
        :key="index"
        @click="selectScenic(item)"
      >{{item.name}}</span>
    </div>
  </div>
</template>

<script>
import { setTimeout } from 'timers';
export default {
  name: "",
  props: [""],
  data() {
    return {
      dataList: [
        {
          id: "22",
          name: "苍岩山",
          position: [114.145831, 37.831976]
        },
        {
          id: "23",
          name: "徽州古城",
          position: [118.434598, 29.867]
        },
        {
          id: "24",
          name: "蓬莱",
          position: [120.752564, 37.825461]
        },
        {
          id: "25",
          name: "少林",
          position: [112.95978, 34.520026]
        },
        {
          id: "26",
          name: "神垕",
          position: [113.228142, 34.118356]
        },
        {
          id: "27",
          name: "云雾山",
          position: [114.214391, 31.12476]
        },
        {
          id: "35",
          name: "三孔",
          position: [116.989873, 35.590745]
        },
        {
          id: "66",
          name: "云冈石窟",
          position: [113.144103, 40.109236]
        }
      ]
    };
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {
    selectScenic(item) {
      sessionStorage.removeItem("currentScenic");
      sessionStorage.setItem("currentScenic", item.id);
      setTimeout(() =>{
        this.$router.goBack();
      },300)
    }
  },

  watch: {}
};
</script>
<style lang='css' scoped>
.search-hot-wrap {
  width: 100%;
  height: 160px;
  background: #eee;
  padding: 15px;
  box-sizing: border-box;
  overflow: hidden;
}
.search-hot-title {
  width: 100%;
  height: 30px;
  line-height: 30px;
  font-weight: bold;
}
.search-hot-list-wrap {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: 10px;
}
.search-hot-list-wrap span {
  width: auto;
  height: 24px;
  display: inline-block;
  padding: 0 10px;
  background: #fff;
  color: #222;
  font-size: 14px;
  text-align: center;
  line-height: 24px;
  margin: 0 16px 16px 0;
  border-radius: 2px;
}
</style>