<template>
  <div>
    <Cell :cellList="cellList"></Cell>
  </div>
</template>

<script>
import Cell from "../common/Cell";

export default {
  name: "",
  props: [""],
  data() {
    return {
      cellList: [
        {
          icon:
            "http://a.hiphotos.baidu.com/image/h%3D300/sign=f65f1e740233874483c5297c610fd937/55e736d12f2eb9389b2b3ad6db628535e5dd6f4b.jpg",
          title: "系统公告",
          link: "",
          showBadge: true,
          badgeText: "新消息"
        },
        {
          icon:
            "http://a.hiphotos.baidu.com/image/h%3D300/sign=f65f1e740233874483c5297c610fd937/55e736d12f2eb9389b2b3ad6db628535e5dd6f4b.jpg",
          title: "系统公告",
          link: "",
          showBadge: false,
          badgeText: "新消息"
        },
        {
          icon:
            "http://a.hiphotos.baidu.com/image/h%3D300/sign=f65f1e740233874483c5297c610fd937/55e736d12f2eb9389b2b3ad6db628535e5dd6f4b.jpg",
          title: "系统公告",
          link: "",
          showBadge: false,
          badgeText: "新消息"
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