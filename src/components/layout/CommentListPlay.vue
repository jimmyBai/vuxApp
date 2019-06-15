<!-- 
详情页评论列表
 -->
<template>
  <div>
    <div class="comment-list-amount">评论({{totalNum}})</div>
    <p style="text-align:center;" v-show="!contentList.length && contentList.length != 0">
      <inline-loading></inline-loading>
      <span style="vertical-align:middle;display:inline-block;font-size:14px;">加载中</span>
    </p>
    <p style="text-align:center;" v-show="contentList.length === 0">
      <span style="vertical-align:middle;display:inline-block;font-size:14px;">暂无评论~</span>
    </p>
    <main class="position-box" v-show="contentList.length" :style="{top:scrollTop+'px'}">
      <!-- 需要一个创建一个父容器 组件高度默认等于父容器的高度 -->
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
        <div class="comment-list-for flex-wrap" v-for="(item,index) in contentList" :key="index">
          <div class="comment-list-for-header">
            <img class="comment-list-header-img" v-lazy="item.user_avatar">
          </div>
          <div class="comment-list-content">
            <p class="comment-list-user">
              <span style="font-size:12px;">{{item.user_name}}</span>
              <span
                style="font-size:12px;margin-right:10px;color:#999"
              >{{item.created_at | formTime}}</span>
            </p>
            <p class="comment-list-desc">{{item.content}}</p>
          </div>
        </div>
      </vue-better-scroll>
    </main>
  </div>
</template>

<script>
import { InlineLoading } from "vux";
import { ScenceReleaseListDetails } from "@/servers/api";
import { timeTodate } from "@/assets/js/tools";
import { setTimeout } from "timers";

let count = 1;
let totalCount = 0;
export default {
  name: "",
  props: [ "scrollTop", "pullDownRefreshObj"],
  data() {
    return {
      scrollbarObj: {
        fade: true
      },
      // pullDownRefreshObj: {
      //   threshold: 70,
      //   stop: 40
      // },
      pullUpLoadObj: {
        threshold: 0,
        txt: {
          more: "加载更多",
          noMore: "没有更多数据了"
        }
      },
      startY: 0, // 纵轴方向初始化位置
      scrollToX: 0,
      scrollToY: 0,
      scrollToTime: 700,
      items: [],
      commentCount: 99,
      contentList: [],
      page: 1,
      totalNum: 0
    };
  },
  filters: {
    formTime(val) {
      return timeTodate(val);
    }
  },
  components: {
    InlineLoading
  },

  computed: {
    newArr() {
      return this.$parent.commentListData;
    }
  },

  beforeMount() {},

  mounted() {
    this.onPullingDown();
  },
  watch: {
    newArr(val) {
      if (val) {
        this.onPullingDown();
      }
    }
  },
  methods: {
    //更新评论数据列表
    getCommintList() {
      return new Promise(resolve => {
        let arr = [];
        ScenceReleaseListDetails({
          id: this.$route.query.id,
          type: this.$route.query.type,
          page: this.page
        })
          .then(res => {
            if (res.result === 1) {
              totalCount = res.data.totalofnum;
              this.totalNum = res.data.totalofnum;
              setTimeout(() => {
                if (res.data.comment.length) {
                  arr = res.data.comment;
                  resolve(res.data.comment);
                } else {
                  this.$nextTick(() => {
                    this.$refs.scroll.forceUpdate(false);
                  });
                }
              }, 1000);
            }
          })
          .catch(err => {
            console.log(err);
          });
      });
    },
    // 滚动到页面顶部
    scrollTo() {
      this.$refs.scroll.scrollTo(
        this.scrollToX,
        this.scrollToY,
        this.scrollToTime
      );
    },
    onPullingDown() {
      totalCount = 0;
      this.page = 1;
      this.getCommintList().then(res => {
        this.contentList = res;
        this.$nextTick(() => {
          this.$refs.scroll.forceUpdate(true);
        });
      });
    },
    onPullingUp() {
      this.page += 1;
      this.getCommintList().then(res => {
        this.contentList = this.contentList.concat(res);
        if (this.contentList.length < totalCount) {
          this.$refs.scroll.forceUpdate(true);
        } else {
          this.$refs.scroll.forceUpdate(false);
        }
      });
    }
  }
};
</script>
<style lang='css' scoped>
.flex-wrap {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.comment-list-wrap {
  width: 100%;
  height: 500px;
  padding: 10px;
  box-sizing: border-box;
}
.comment-list-header-img {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 8px;
}
.comment-list-for {
  width: 100%;
  min-height: 50px;
  height: auto;
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
  padding-bottom: 10px;
  box-sizing: border-box;
  font-size: 12px;
}
.comment-list-for-header {
  width: 10%;
  min-height: 50px;
  height: auto;
  padding-top: 6px;
  box-sizing: border-box;
}
.comment-list-content {
  width: 90%;
  min-height: 50px;
  height: auto;
}
.comment-list-user {
  width: 100%;
  height: 26px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.comment-list-desc {
  width: 100%;
  flex-wrap: wrap;
  line-height: 20px;
  font-size: 14px;
}
.comment-list-amount {
  width: 100%;
  background: #fff;
  padding: 0 15px;
  box-sizing: border-box;
  font-weight: bold;
  height: 40px;
  line-height: 40px;
  position: relative;
  z-index: 999;
}
.position-box {
  position: absolute;
  /* top: 340px; */
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  padding: 15px;
  padding-top: 0;
  box-sizing: border-box;
}
</style>