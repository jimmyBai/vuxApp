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
    <div class="position-box" v-show="contentList.length">
      <div class="comment-list-for flex-wrap" v-for="(item,index) in contentList" :key="index">
        <div class="comment-list-for-header">
          <img class="comment-list-header-img" v-lazy="item.user_avatar">
        </div>
        <div class="comment-list-content">
          <p class="comment-list-user">
            <span style="font-size:12px;">{{item.user_name}}</span>
            <span style="font-size:12px;margin-right:10px;color:#999">{{item.created_at | formTime}}</span>
          </p>
          <p class="comment-list-desc">{{item.content}}</p>
        </div>
      </div>
    </div>
    <p class="get-more-data" @click="getMoreData">{{dataDesc}}</p>
    <p style="text-align:center;" v-show="showLoadingMore">
      <inline-loading></inline-loading>
      <span style="vertical-align:middle;display:inline-block;font-size:14px;">加载中</span>
    </p>
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
  props: ["dataList", "scrollTop", "pullDownRefreshObj", "scrollSty"],
  data() {
    return {
      items: [],
      commentCount: 99,
      contentList: [],
      page: 1,
      totalNum: 0,
      dataDesc: "",
      showLoadingMore: false
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
    this.getCommintList();
  },
  watch: {
    newArr(val) {
      this.getCommintList();
    }
  },
  methods: {
    // 加载更多
    getMoreData() {
      this.page++;
      this.getCommintList();
    },
    //更新评论数据列表
    getCommintList() {
      this.showLoadingMore = true;
      return new Promise(resolve => {
        let arr = [];
        ScenceReleaseListDetails({
          id: this.$route.query.id,
          type: this.$route.query.type,
          page: this.page
        })
          .then(res => {
            if (res.result === 1) {
              this.showLoadingMore = false;
              totalCount = res.data.totalofnum;
              this.totalNum = res.data.totalofnum;
              if (res.data.currentpage === 1) {
                this.contentList = res.data.comment;
              } else {
                this.contentList = this.contentList.concat(res.data.comment);
              }
              if (res.data.currentpage === res.data.totalpage) {
                this.dataDesc = "没有更多了～";
              } else {
                this.dataDesc = "加载更多";
              }
            }
          })
          .catch(err => {
            console.log(err);
          });
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
  height: 30px;
  line-height: 30px;
  position: relative;
  z-index: 999;
}
.position-box {
  background: #fff;
  padding: 10px 15px 0 15px;
  padding-top: 0;
  box-sizing: border-box;
}
.get-more-data {
  width: 100%;
  height: 50px;
  line-height: 30px;
  text-align: center;
}
</style>