<template>
  <div>
    <Cell :cellList="dataList"></Cell>
  </div>
</template>

<script>
import Cell from "../common/Cell";

export default {
  name: "",
  props: [""],
  data() {
    return {
      dataList: [
        {
          icon:
            "http://f.hiphotos.baidu.com/image/pic/item/359b033b5bb5c9eab0b192c9db39b6003af3b35e.jpg",
          title: "标题一",
          link: "www.baidu.com",
          showBadge:true,
          badgeText:''
        },
        {
          icon:
            "http://f.hiphotos.baidu.com/image/pic/item/359b033b5bb5c9eab0b192c9db39b6003af3b35e.jpg",
          title: "标题一",
          link: "www.baidu.com",
          showBadge:true,
          badgeText:''
        },
        {
          icon:
            "http://f.hiphotos.baidu.com/image/pic/item/359b033b5bb5c9eab0b192c9db39b6003af3b35e.jpg",
          title: "标题一",
          link: "www.baidu.com",
          showBadge:true,
          badgeText:''
        },
        {
          icon:
            "http://f.hiphotos.baidu.com/image/pic/item/359b033b5bb5c9eab0b192c9db39b6003af3b35e.jpg",
          title: "标题一",
          link: "www.baidu.com",
          showBadge:true,
          badgeText:''
        }
      ]
    };
  },

  components: {
    Cell
  },

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {},

  watch: {}
};
</script>
<style lang='' scoped>
</style>