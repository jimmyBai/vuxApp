<template>
  <div class="video-create-wrap" :style="contentSty">
    <div class="video-create-content">
      <div
        class="goods-list"
        v-for="(item,index) in dataList"
        :key="index"
        @click="getVideoDetails(item.comment.id,item.comment.type)"
      >
        <div
          class="goods-img"
          :style="{backgroundImage: 'url(' + item.comment.video_img + ')', backgroundSize:'cover',backgroundRepeat:'no-repeat'}"
        >
          <p class="goods-list-title">
            <span class="iconfont icondingwei"></span>
            <span class="iconfont-location"></span>
          </p>
          <p class="video-play-btn">
            <span class="iconfont iconbofang" style="font-size:30px;color:#fff"></span>
          </p>
          <div class="goods-img-desc">
            <div>
              <img v-lazy="item.comment.release_img">
              <span style="font-size:12px">{{item.comment.release_name }}</span>
            </div>
            <div>
              <span class="iconfont icondianzan" style="font-size:12px;color:#fff"></span>
              <span style="font-size:12px">{{item.comment.praise_num}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VideoListWrap from "@/components/common/VideoListWrap";

export default {
  name: "",
  props: ["dataList"],
  data() {
    return {};
  },

  components: {
    VideoListWrap
  },

  computed: {
    contentSty() {
      return { height: document.documentElement.clientHeight - 100 + "px" };
    }
  },

  beforeMount() {},

  mounted() {},

  methods: {
    getVideoDetails(id, typeD) {
      let type = 8;
      this.$router.push("/informationconsumdetails?id=" + id + "&type=" + type);
    }
  },

  watch: {}
};
</script>
<style lang='css' scoped>
.video-create-wrap {
  width: 100%;
  overflow: hidden;
  overflow-y: scroll;
}
.video-create-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 15px;
  box-sizing: border-box;
}
.goods-list {
  width: 49%;
  height: 240px;
  margin-bottom: 20px;
  overflow: hidden;
}
.goods-img {
  width: 100%;
  height: 240px;
  display: inline-block;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  background: #fff;
  background-position: center;
}
.goods-img-desc {
  width: 100%;
  height: 24px;
  background: rgba(102, 102, 102, 0.8);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 4px;
  box-sizing: border-box;
  border-radius: 0 0 5px 5px;
  color: #fff;
}
.goods-img-desc img {
  width: 20px;
  height: 20px;
  display: inline-block;
  border-radius: 50%;
  font-size: 12px;
}
.video-play-btn {
  width: 100%;
  height: 30px;
  text-align: center;
  line-height: 30px;
}
.goods-list-title {
  width: 100%;
  height: 24px;
  padding: 4px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 12px;
}
.iconfont-location {
  margin-left: 4px;
  color: #222;
}
</style>