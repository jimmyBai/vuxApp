<template>
  <div class="tab-conetnt-loop-wrap">
    <div class="tab-conetnt-loop" v-for="(item,index) in merchantsDataList" :key="index">
      <div class="tab-conetnt-loop-left">
        <img :src="item.img">
      </div>
      <div class="tab-conetnt-loop-mid">
        <p>{{item.name}}</p>
        <p style="font-size:12px;color:#999">{{item.distance}}</p>
      </div>
      <div class="tab-conetnt-loop-right">
        <p style="color:#999">{{item.price}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: ["merchantsDataList"],
  data() {
    return {

    };
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {},

  watch: {}
};
</script>
<style lang='css' scoped>
.tab-conetnt-loop-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  overflow-y: scroll;
}
.tab-conetnt-loop {
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
}
.tab-conetnt-loop-left img {
  width: 120px;
  height: 80px;
  display: inline-block;
  border-radius: 4px;
}
.tab-conetnt-loop-left {
  flex: 1;
}
.tab-conetnt-loop-mid {
  flex: 1;
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.tab-conetnt-loop-right {
  flex: 1;
  text-align: right;
}
</style>