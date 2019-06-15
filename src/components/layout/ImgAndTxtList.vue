<!--
 * @Description: 
 * @Author: lpb
 * @Github: https://github.com/lpb273
 * @LastEditors: lpb
 * @Date: 2019-03-15 17:20:34
 * @LastEditTime: 2019-05-06 10:01:42
 -->
<template>
  <div>
    <p style="text-align:center;" v-if="!dataList.length && dataList.length!=0">
      <inline-loading></inline-loading>
      <span style="vertical-align:middle;display:inline-block;font-size:14px;">加载中</span>
    </p>
    <p style="text-align:center;" v-if="dataList.length === 0">
      <span style="vertical-align:middle;display:inline-block;font-size:14px;">加载中</span>
    </p>
    <main class="position-box" v-else-if="dataList.length">
      <vue-better-scroll
        class="wrapper"
        ref="scroll"
        :scrollbar="scrollbarObj"
        :pullDownRefresh="pullDownRefreshObj"
        :pullUpLoad="pullUpLoadObj"
        :startY="parseInt(startY)"
        @pullingDown="onPullingDown"
        @pullingUp="onPullingUp"
      >
        <div v-for="(item,index) in dataList" :key="index">
          <Divider></Divider>
          <div class="img-and-txt-list-for" @click="getDetailsContent(item.id)">
            <div class="img-and-txt-left">
              <p class="img-and-txt-left-top text-show-line3">{{item.summary}}</p>
              <p class="img-and-txt-left-bot">
                <img :src="item.release_img" alt srcset class="img-and-txt-left-header">
                <span class="img-and-txt-left-name">{{item.release_name}}</span>
                <span class="img-and-txt-left-place" style="color:#999">
                  <span class="iconfont icondingwei text-overflow-hidden"></span>
                  {{item.address | stringToArr}}
                </span>
              </p>
            </div>
            <div class="img-and-txt-right">
              <img :src="item.video_img[0]" alt srcset class="img-and-txt-right-img">
            </div>
          </div>
        </div>
      </vue-better-scroll>
    </main>
  </div>
</template>

<script>
let totalCount = 0;
import { InlineLoading } from "vux";
import { SeourceCreatedList } from "@/servers/api";
import Divider from "@/components/common/DividedArea";
export default {
  name: "",
  props: [""],
  data() {
    return {
      dataList: [],
      refreshText: "下拉刷新",
      noDataText: "没有更多数据",
      scrollbarObj: {
        fade: true
      },
      pullDownRefreshObj: {
        threshold: 70,
        stop: 40
      },
      pullUpLoadObj: {
        threshold: 0,
        txt: {
          more: "加载更多",
          noMore: "没有更多数据了"
        }
      },
      startY: 45,
      scrollToX: 0,
      scrollToY: 0,
      scrollToTime: 700,
      items: [],
      page: 1
    };
  },

  components: {
    InlineLoading,
    Divider
  },
  filters: {
    stringToArr(str) {
      if (str) {
        return str.split(",")[0].substring(0,str.split(",")[0].length-1);
      } else {
        return "未知";
      }
    }
  },
  computed: {},

  beforeMount() {},

  mounted() {
    this.onPullingDown();
  },

  methods: {
    getDetailsContent(id) {
      let type = this.$route.query.branch;
      this.$router.push("/imageandtextdetails?type=" + type + "&id=" + id);
    },
    // 滚动到页面顶部
    scrollTo() {
      this.$refs.scroll.scrollTo(
        this.scrollToX,
        this.scrollToY,
        this.scrollToTime
      );
    },
    // 数据初始化
    getData() {
      return new Promise(resolve => {
        let arr = [];
        SeourceCreatedList({
          type: 10,
          page: this.page
        })
          .then(res => {
            if (res.result === 1) {
              totalCount = res.data.totalofnum;
              setTimeout(() => {
                if (res.data.comment.length) {
                  arr = res.data.comment;
                  resolve(res.data.comment);
                } else {
                  this.$refs.scroll.forceUpdate(false);
                }
              }, 1000);
            }
          })
          .catch(err => {
            console.log(err);
          });
      });
    },
    onPullingDown() {
      totalCount = 0;
      this.page = 1;
      this.getData().then(res => {
        this.dataList = res;
        this.$nextTick(() => {
          this.$refs.scroll.forceUpdate(true);
        });
      });
    },
    onPullingUp() {
      this.page += 1;
      this.getData().then(res => {
        this.dataList = this.dataList.concat(res);
        if (this.dataList.length < totalCount) {
          this.$refs.scroll.forceUpdate(true);
        } else {
          this.$refs.scroll.forceUpdate(false);
        }
      });
    },
    back() {
      this.$router.goBack();
    },
    releaseContent() {
      this.$router.push("/releaseimgandtext");
    }
  },

  watch: {}
};
</script>
<style lang='css' scoped>
.img-and-txt-list-wrap {
  background: #f9f9f9;
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
  width: 24px;
  height: 24px;
  display: inline-block;
  overflow: hidden;
  border-radius: 50%;
  object-fit: cover;
}
.img-and-txt-left-name {
  flex: 3;
  font-size: 12px;
  overflow: hidden;
  margin-left: 4px;
}
.img-and-txt-left-place {
  flex: 2;
  font-size: 12px;
}
.img-and-txt-right-img {
  border-radius: 4px;
}
.position-box {
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  bottom: 0;
}
.img-and-txt-left-desc {
  flex: 4;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>