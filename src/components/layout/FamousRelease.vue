<template>
  <div>
    <p style="text-align:center;;margin-top:20px" v-if="!dataList.length">
      <inline-loading></inline-loading>
      <span style="vertical-align:middle;display:inline-block;font-size:14px;">加载中</span>
    </p>
    <!-- <p style="text-align:center;;margin-top:20px" v-if="dataList.length===0">
      <span style="vertical-align:middle;display:inline-block;font-size:14px;">暂无数据～</span>
    </p> -->
    <div
      class="scence-releace-wrap"
      v-for="(item,index) in dataList"
      :key="index"
      @click="getReleaseDetails(item.id)"
    >
      <div class="scence-releace-top">
        <div class="scence-releace-top-left">
          <p class="scence-releace-top-left-title text-show-line2">{{item.title}}</p>
          <p
            class="scence-releace-top-left-content text-show-line3"
            v-html="item.content"
          >{{item.content}}</p>
        </div>
        <div class="scence-releace-top-right">
          <img :src="item.image[0]" alt>
        </div>
      </div>
      <div class="scence-releace-bot">
        <span>{{item.type}}</span>
        <span>{{item.create_time}}</span>
        <span>{{item.comment_num}}评论</span>
        <span>{{item.praise_num}}点赞</span>
      </div>
    </div>
  </div>
</template>

<script>
import { InlineLoading } from "vux";
export default {
  name: "",
  props: ["dataList"],
  data() {
    return {};
  },

  components: {
    InlineLoading
  },

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {
    getReleaseDetails(id) {
      this.$router.push("/famousreleasedetails?id=" + id + "&type=" + 11);
    }
  },

  watch: {}
};
</script>
<style lang='css' scoped>
.scence-releace-wrap {
  width: 100%;
  height: 155px;
  overflow: hidden;
  background: #fff;
  padding: 15px;
  box-sizing: border-box;
  margin-top: 10px;
}
.scence-releace-top {
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: row;
}
.scence-releace-bot {
  width: 100%;
  height: 40px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: #999;
  font-size: 12px;
}
.scence-releace-top-left {
  flex: 3;
  padding-right: 6px;
  box-sizing: border-box;
}
.scence-releace-top-right {
  flex: 2;
}
.scence-releace-top-right img {
  width: 100%;
  height: 90px;
  overflow: hidden;
  border-radius: 4px;
}
.scence-releace-top-left-title {
  font-weight: bold;
  word-break: break-all;
  font-size: 16px;
  line-height: 20px;
  width: 100%;
  height: 38px;
}
.scence-releace-top-left-content {
  width: 100%;
  height: 52px;
  word-break: break-all;
  color: #999;
  font-size: 12px;
  margin-top: 4px;
}
</style>