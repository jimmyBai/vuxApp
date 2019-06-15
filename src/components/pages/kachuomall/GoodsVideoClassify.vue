<template>
  <div class="scence-release-wrap">
    <Header
      :titleContent="TitleObjData.titleContent"
      :showLeftBack="TitleObjData.showLeftBack"
      :showRightMore="TitleObjData.showRightMore"
    ></Header>
    <div class="position-box" :style="contentNoHeaderHeight">
      <div class="video-list-for" v-for="(item,index) in items" :key="index" @click="getDetailFn(item.id)">
        <img v-lazy="item.show_img" :alt="item.title" srcset>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/common/ReleaseHeader";
import { VideoListIndex } from "@/servers/api";
export default {
  name: "",
  props: [""],
  data() {
    return {
      TitleObjData: {
        titleContent: "品类",
        showLeftBack: true,
        showRightMore: false
      },
      items: []
    };
  },

  components: {
    Header
  },

  computed: {
    contentNoHeaderHeight: function() {
      return { height: document.documentElement.clientHeight - 45 + "px" };
    }
  },

  beforeMount() {},

  mounted() {
    this.getData();
  },

  methods: {
    // 获取详情
    getDetailFn(id){
      this.$router.push("/goodsVideoclassifydetails?id="+id+"&type=1");
    },
    // 数据请求
    getData() {
      VideoListIndex({})
        .then(res => {
          if (res.result === 1) {
            this.items = res.data;
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
.scence-release-wrap {
  width: 100%;
  height: 100%;
  background: #fff;
}
.position-box {
  width: 100%;
  height: 100%;
  overflow: hidden;
  overflow-y: scroll;
  background: #f5f5f5;
  margin-top: 45px;
  padding: 0 15px;
  box-sizing: border-box;
}
.video-list-for{
  width: 100%;
  height: 120px;
  object-fit: contain;
  margin-top: 10px;
  background: #fff;
  border-radius: 5px;
  overflow: hidden;
}
</style>