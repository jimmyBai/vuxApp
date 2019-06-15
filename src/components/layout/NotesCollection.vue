<template>
  <div class="img-and-text-wrap" :style="conHeight">
    <div class="img-and-text-content">
      <div v-for="(item,index) in dataList" :key="index">
        <div class="img-and-txt-list-for" @click="getDetailsContent(item.comment.id)">
          <div class="img-and-txt-left">
            <p class="img-and-txt-left-top text-show-line3">{{item.comment.summary}}</p>
            <p class="img-and-txt-left-bot">
              <img :src="item.comment.release_img" alt srcset class="img-and-txt-left-header">
              <span style="margin-left:-50px">{{item.comment.release_name}}</span>
              <span style="color:#999">
                <span class="iconfont icondingwei"></span>
                {{item.comment.address | stringToArr}}
              </span>
            </p>
          </div>
          <div class="img-and-txt-right">
            <img :src="item.comment.video_img[0]" alt srcset class="img-and-txt-right-img">
          </div>
        </div>
        <Divider></Divider>
      </div>
    </div>
  </div>
</template>

<script>
import ImgAndTxtList from "@/components/layout/ImgAndTxtList";
import DividedArea from "@/components/common/DividedArea";
import Divider from "@/components/common/DividedArea";
export default {
  name: "",
  props: ["dataList"],
  data() {
    return {
      page: 0,
      list: [],
      refreshText: "下拉刷新",
      noDataText: "没有更多数据"
    };
  },

  components: {
    ImgAndTxtList,
    DividedArea,
    Divider
  },

  computed: {
    conHeight() {
      return { height: document.documentElement.clientHeight - 100 + "px" };
    }
  },
  filters: {
    stringToArr(str) {
      if (str) {
        return str.split(",")[0];
      }
    }
  },
  beforeMount() {},

  mounted() {},

  methods: {
    getDetailsContent(id) {
      let type = 10;
      this.$router.push("/imageandtextdetails?type=" + type + "&id=" + id);
    },
    back() {
      this.$router.goBack();
    },
    releaseContent() {
      this.$router.push("/releaseimgandtext");
    },
    refresh(done) {
      console.log("refresh");
      setTimeout(() => {
        done();
      }, 2000);
    },
    pullup(done) {
      // console.log("pullup");
      //   this.$refs.myscroller.finishInfinite(2);
      //   this.$refs.myscroller.resize();
      //   done();
    }
  },

  watch: {}
};
</script>
<style lang='css' scoped>
.img-and-text-wrap {
  width: 100%;
  overflow: hidden;
  overflow-y: scroll;
}
.img-and-text-content {
}
.scence-release-content {
  margin-top: 90px;
}
.img-and-txt-list-for {
  width: 100%;
  height: 160px;
  display: flex;
  flex-direction: row;
  padding: 10px;
  box-sizing: border-box;
  background: #fff;
  margin-top: 10px;
}
.img-and-txt-left {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  box-sizing: border-box;
}
.img-and-txt-right {
  flex: 1;
  box-sizing: border-box;
  padding: 10px;
}
.img-and-txt-left-top {
  flex: 4.5;
  word-break: break-all;
  font-weight: bold;
  font-size: 16px;
}
.img-and-txt-left-bot {
  flex: 2.5;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  box-sizing: border-box;
}
.img-and-txt-left-header {
  width: 26px;
  height: 26px;
  border-radius: 50%;
}
.img-and-txt-right-img {
  border-radius: 4px;
}
</style>