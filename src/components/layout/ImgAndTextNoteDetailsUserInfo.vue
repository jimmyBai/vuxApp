<template>
  <div class="img-and-text-details-user-info-wrap">
    <div class="details-left">
      <div>
        <img class="header-img" :src="detailsObj.avatar">
      </div>
      <div class="header-desc">
        <p>{{detailsObj.nickname}}</p>
        <p style="font-size:12px">{{detailsObj.createtime}}</p>
      </div>
    </div>
    <div class="details-right">
      <span>
        <GiveLike
          v-on:changePhriseState="refreshData"
          :clickState="clickState"
          :praiseNum="praiseNum"
        ></GiveLike>
      </span>
    </div>
  </div>
</template>

<script>
import GiveLike from "@/components/common/GiveLike";
import { SeourceCreatedListDetails } from "@/servers/api";

export default {
  name: "",
  props: ["detailsObj"],
  data() {
    return {
      clickState: 0,
      praiseNum: 0
    };
  },

  components: {
    GiveLike
  },

  computed: {},

  beforeMount() {},

  mounted() {
    this.getDetailsData();
  },

  methods: {
    // 更新点赞状态
    refreshData() {
      this.videoId = this.$route.query.id;
      SeourceCreatedListDetails({
        id: this.$route.query.id,
        type: this.$route.query.type
      })
        .then(res => {
          if (res.data.video) {
            this.clickState = res.data.video.type;
            this.praiseNum = res.data.video.praise_num;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 初始化数据
    getDetailsData() {
      SeourceCreatedListDetails({
        id: this.$route.query.id,
        type: this.$route.query.type
      })
        .then(res => {
          if (res.result === 1) {
            if (res.data.video) {
              this.clickState = res.data.video.type;
              this.praiseNum = res.data.video.praise_num;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },

  watch: {}
};
</script>
<style lang='css' scoped>
.img-and-text-details-user-info-wrap {
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  box-sizing: border-box;
}
.header-img {
  width: 40px;
  height: 40px;
  display: inline-block;
  border-radius: 50%;
}
.details-left {
  flex: 1;
  display: flex;
  flex-direction: row;
}
.details-right {
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
.header-desc {
  margin-left: 10px;
}
</style>