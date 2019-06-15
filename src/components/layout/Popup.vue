<!--
分类导航
-->
<template>
  <div v-transfer-dom class="left-popup-wrap">
    <popup v-model="showModelFlag" position="left" width="100%">
      <div class="position-horizontal">
        <x-header :left-options="{backText: '返回',preventGoBack:true}" @on-click-back="hideModel">分类</x-header>
        <div class="content-wrap">
          <div class="content-left">
            <p
              :class="{'content-left-p':currentIndex!=index,'content-left-p-active':currentIndex==index}"
              v-for="(item,index) in leftContent"
              :key="index"
              @click="changeIndex(index,item.id)"
            >{{item.name}}</p>
          </div>
          <div class="content-right">
            <div class="content-video">
              <Video :isControls="true"></Video>
            </div>
            <div class="content-list-wrap" :style="contentListRightWrap">
              <div class="content-list-item" v-for="(item,index) in rightContent" :key="index">
                <img class="content-list-img" :src="item.src">
                <p class="content-list-title">{{item.name}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </popup>
  </div>
</template>

<script>
import { TransferDom, Popup, XHeader, Sticky } from "vux";
import { GoodsClassList } from "@/servers/api";
import Video from "../common/VideoPlayer";

export default {
  directives: {
    TransferDom
  },
  components: {
    Popup,
    XHeader,
    Video,
    Sticky
  },
  data() {
    return {
      show: true,
      leftContent: [],
      rightContent: [],
      currentIndex: 0,
      dataList: []
    };
  },
  mounted() {
    this.getClassList();
  },
  methods: {
    getClassList() {
      GoodsClassList({})
        .then(res => {
          if (res.result === 1) {
            res.data.list.forEach(element => {
              if (element.name === "品类") {
                this.dataList = element.son;
                element.son.forEach(element => {
                  this.leftContent.push({ id: element.id, name: element.name });
                  if (element.son) {
                    if (element.name === "绘画") {
                      element.son.forEach(element => {
                        this.rightContent.push({
                          id: element.id,
                          name: element.name
                        });
                      });
                    }
                  }
                });
              }
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    changeIndex(i, id) {
      this.currentIndex = i;
      this.rightContent = [];
      this.dataList.forEach(item => {
        if (item.id === id) {
          if (item.son) {
            item.son.forEach(item => {
              this.rightContent.push({
                id: item.id,
                name: item.name
              });
            });
          }
        }
      });
      console.log(this.rightContent);
    },
    hideModel() {
      this.$store.commit("showMallLeftOptionState", false);
    }
  },
  computed: {
    contentListRightWrap() {
      return { height: document.documentElement.clientHeight - 225 + "px" };
    },
    showModelFlag: {
      get: function() {
        return this.$store.state.showMallLeftOption;
      },
      set: function() {}
    }
  },
  watch: {}
};
</script>

<style lang="less" scoped>
.left-popup-wrap {
  position: relative;
  z-index: 9999;
  background: #fff;
}
.position-horizontal {
  position: relative;
  height: 100%;
}
.content-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  position: fixed;
  top: 46px;
  left: 0;
}
.content-left {
  flex: 20%;
  height: 100%;
  overflow-y: scroll;
  background: #fff;
  box-sizing: border-box;
  padding-bottom: 0px;
}
.content-right {
  flex: 80%;
  height: 100%;
  overflow: hidden;
  padding: 10px;
  box-sizing: border-box;
  padding-bottom: 100px;
}
.content-left-p {
  width: 100%;
  height: 50px;
  text-align: center;
  line-height: 50px;
}
.content-left-p-active {
  width: 100%;
  height: 50px;
  text-align: center;
  line-height: 50px;
  background: #000;
  color: #fff;
}
.content-video {
  width: 100%;
  height: 160px;
  overflow: hidden;
}
.content-list-wrap {
  width: 100%;
  overflow: hidden;
  overflow-y: scroll;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 10px;
}
.content-list-item {
  width: 33%;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.content-list-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.content-list-title {
  width: 100%;
  height: 20px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
}
</style>