<template>
  <div class="scence-story-details-desc-wrap">
    <div class="scence-story-details-desc-title">
      <p class="scence-story-details-desc-name text-overflow-hidden">{{dataObj.title}}</p>
      <p class="scence-story-details-desc-click">
        <GiveLike
          class="scence-story-details-like"
          v-on:changePhriseState="refreshData"
          :clickState="clickState"
          :praiseNum="praiseNum"
        ></GiveLike>
      </p>
      <!-- <p>{{dataObj.praise_num}}</p> -->
    </div>
    <!-- <div
      class="scence-story-details-desc-con text-show-line4"
      @click="showDetails"
    >{{dataObj.synopsis}}</div> -->
    <div
      class="scence-story-details-desc-con-normal"
      @click="showDetails"
    >{{dataObj.synopsis}}</div>
  </div>
</template>

<script>
import GiveLike from "@/components/common/GiveLike";
import { ScenceRememberAndLearnDetails } from "@/servers/api";

export default {
  name: "",
  props: ["dataObj"],
  data() {
    return {
      desc: "",
      showDetailsFlag: false,
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
    this.refreshData();
  },

  methods: {
    showDetails() {
      this.showDetailsFlag = !this.showDetailsFlag;
    },
    refreshData() {
      this.currentId = this.$route.query.id;
      ScenceRememberAndLearnDetails({
        id: this.$route.query.id,
        type: this.$route.query.branch,
        page: 1
      })
        .then(res => {
          let arr = [];
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
.scence-story-details-desc-wrap {
  padding: 0 15px;
  box-sizing: border-box;
}
.scence-story-details-desc-title {
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
}
.scence-story-details-desc-name {
  flex: 1;
  font-weight: bold;
}
.scence-story-details-desc-click {
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.scence-story-details-like {
  width: 100%;
  height: 30px;
  position: relative;
  left: 18px;
  top: -1px;
}
.scence-story-details-desc-con {
  width: 100%;
  height: 30px;
  font-size: 12px;
}
.scence-story-details-desc-con-normal {
  width: 100%;
  min-height: 30px;
  height: auto;
  padding: 10px 0;
  font-size: 12px;
  box-sizing: border-box;
}
</style>