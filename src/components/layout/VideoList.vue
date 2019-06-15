<!--
门票购买
-->
<template>
  <div class="tickets-discount-list-wrap">
    <p style="text-align:center;;margin-top:20px" v-if="!dataList.length && dataList.length!=0">
      <inline-loading></inline-loading>
      <span style="vertical-align:middle;display:inline-block;font-size:14px;">加载中</span>
    </p>
    <!-- <p style="text-align:center;;margin-top:20px" v-if="dataList.length === 0">
      <span style="vertical-align:middle;display:inline-block;font-size:14px;">暂无数据～</span>
    </p> -->
    <div
      class="tickets-discount-list"
      v-for="(item,index) in dataList"
      :key="index"
      @click="getDetailsContent(item.id)"
    >
      <div class="img-wrap">
        <img v-lazy="item.video_img">
        <span class="scence-distance-wrap">
          <span class="scence-distance">{{item.distance}}</span>
        </span>
      </div>
      <div class="img-desc">
        <p class>
          <img class="img-desc-img" v-lazy="item.video_img">
          <span>{{item.release_name}}</span>
        </p>
        <div>
          <span style="margin-right:20px">
            <span class="iconfont iconxiaoxi" style="margin-right:10px"></span>
            {{item.comment_num}}
          </span>
          <span>
            <span class="iconfont iconzan" style="margin-right:10px"></span>
            {{item.praise_num}}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { XButton, InlineLoading } from "vux";

export default {
  name: "",
  props: ["dataList"],
  data() {
    return {
      backgroundImgSty: {
        width: "100%",
        height: "400px"
      }
    };
  },

  components: {
    XButton,
    InlineLoading
  },

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {
    getDetailsContent(id) {
      let type = this.$route.query.type;
      let branch = this.$route.query.branch;
      this.$router.push(
        "/scencestorydetail?id=" + id + "&type=" + type + "&branch=" + branch
      );
    }
  },

  watch: {}
};
</script>
<style lang='css' scoped>
.font-size-14 {
  font-size: 14px;
  font-weight: bold;
}
.font-size-12 {
  font-size: 12px;
}
.price-discount {
  color: #666;
  margin-left: 6px;
}
.tickets-discount-list-wrap {
  background: #f9f9f9;
  padding-top: 10px;
  box-sizing: border-box;
}
.tickets-discount-list {
  width: 100%;
  height: 250px;
  overflow: hidden;
  margin-bottom: 10px;
  border-radius: 4px;
}
.img-wrap {
  width: 100%;
  height: 200px;
  padding: 10px;
  background: #fff;
}
.img-desc {
  width: 100%;
  height: 50px;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #fff;
}
.scence-distance-wrap {
  width: 50px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  display: inline-block;
  background: #666;
  border-radius: 10px;
  position: relative;
  top: -170px;
  left: 10px;
  color: #fff;
  font-size: 12px;
}
.img-desc-img {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: inline-block;
}
</style>