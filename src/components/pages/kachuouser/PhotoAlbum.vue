<template>
  <div class="photo-album-wrap">
    <Header
      :titleContent="TitleObjData.titleContent"
      :showLeftBack="TitleObjData.showLeftBack"
      :showRightMore="TitleObjData.showRightMore"
    ></Header>
    <div class="photo-album-content" :style="conHei">
      <div v-for="(item,index) in dataList" :key="index">
        <p class="date-title">{{item.date}}</p>
        <div class="img-wrap">
          <span v-for="(item2,index2) in item.image" :key="index2" class="previewer-demo-img">
            <img v-lazy="item2" alt srcset @click="show(item.image,index2)">
          </span>
        </div>
      </div>
      <div v-transfer-dom>
        <previewer
          :list="list"
          ref="previewer"
          :options="options"
          @on-index-change="logIndexChange"
        ></previewer>
      </div>
      <imgUploader></imgUploader>
    </div>
  </div>
</template>

<script>
import Header from "@/components/common/Header";
import BetterScroll from "@/components/common/BetterScroll";
import imgUploader from "@/components/common/CloudImgUpload";
import { CloudUploadImg, GetCloudUploadImg } from "@/servers/api";
import { Previewer, TransferDom } from "vux";
export default {
  directives: {
    TransferDom
  },
  name: "",
  props: [""],
  data() {
    return {
      TitleObjData: {
        titleContent: "云相册",
        showLeftBack: true,
        showRightMore: false
      },
      dataList: [],
      list: [],
      options: {
        getThumbBoundsFn(index) {
          // find thumbnail element
          let thumbnail = document.querySelectorAll(".previewer-demo-img")[
            index
          ];
          // get window scroll Y
          let pageYScroll =
            window.pageYOffset || document.documentElement.scrollTop;
          // optionally get horizontal scroll
          // get position of element relative to viewport
          let rect = thumbnail.getBoundingClientRect();
          // w = width
          return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
          // Good guide on how to get element coordinates:
          // http://javascript.info/tutorial/coordinates
        }
      }
    };
  },

  components: {
    Header,
    BetterScroll,
    imgUploader,
    Previewer
  },

  computed: {
    conHei() {
      return { height: document.documentElement.clientHeight - 45 + "px" };
    }
  },

  beforeMount() {},

  mounted() {
    this.getImgList();
  },

  methods: {
    logIndexChange(arg) {
      console.log(arg);
    },
    show(item, index2) {
      this.list.length = 0;
      for (let i = 0; i < item.length; i++) {
        this.list.push({
          msrc: item[i],
          src: item[i]
        });
      }
      this.$refs.previewer.show(index2);
    },
    getImgList() {
      GetCloudUploadImg({
        page: 1
      })
        .then(res => {
          if (res.result === 1) {
            this.dataList = res.data.data;
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
.photo-album-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.photo-album-content {
  width: 100%;
  background: #fff;
  margin-top: 45px;
  overflow: hidden;
  overflow-y: scroll;
  padding: 15px;
  box-sizing: border-box;
}
.tip {
  width: 100%;
  height: 20px;
  line-height: 20px;
  text-align: center;
}
.img-wrap {
  width: 100%;
  min-height: 100px;
  height: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: 10px;
}
.img-wrap img {
  width: 80px;
  height: 80px;
  display: inline-block;
  object-fit: cover;
  margin-right: 10px;
}
.date-title {
  width: 100%;
  height: 30px;
  line-height: 30px;
  border-bottom: 1px solid #eee;
  font-size: 16px;
  font-weight: bold;
}
</style>