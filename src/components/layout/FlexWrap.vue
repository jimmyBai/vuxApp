<!-- 
flex布局功能区域
-->
<template>
  <flexbox :gutter="0" wrap="wrap" class="function-areas-wrap">
    <flexbox-item :span="1/4" v-for="(item,index) in dataListCon" :key="index">
      <div class="flex-wrap-for" @click="getItem(item.link)">
        <span :class="item.class" v-if="item.class"></span>
        <img :src="item.icon" class="icon-img" v-if="item.icon" alt="" srcset="">
        <p class="flex-wrap-name">{{item.name}}</p>
      </div>
    </flexbox-item>
  </flexbox>
</template>

<script>
import { Flexbox, FlexboxItem, Divider } from "vux";

export default {
  name: "",
  props: ["dataListCon"],
  data() {
    return {

    };
  },

  components: {
    Flexbox,
    FlexboxItem,
    Divider
  },

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {
    getItem(link) {
      this.$router.push(link);
    }
  },

  watch: {}
};
</script>
<style lang='css' scoped>
.flex-wrap-for {
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.flex-wrap-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.flex-wrap-name {
  width: 100%;
  height: 20px;
  text-align: center;
  line-height: 20px;
  font-size: 16px;
}
.flex-wrap-for span {
  font-size: 36px;
}
.icon-img{
  width: 44px;
  height: 44px;
  display: inline-block;
}
</style>