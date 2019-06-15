<!--
 * @Description: 
 * @Author: lpb
 * @Github: https://github.com/lpb273
 * @LastEditors: lpb
 * @Date: 2019-03-18 09:21:00
 * @LastEditTime: 2019-05-06 09:08:10
 -->
<template>
  <div style="img-text-details-wrap">
    <Header
      :titleContent="TitleObjData.titleContent"
      :showLeftBack="TitleObjData.showLeftBack"
      :showRightMore="TitleObjData.showRightMore"
    ></Header>
    <div class="scroll-content-wrap" :style="conHeight">
      <div class="img-text-content">
        <swiper class="z-index-sty" :options="swiperOption">
          <swiper-slide
            v-for="(item, index) in SwiperImgData.ImgList"
            class="img-swiper-wrap"
            :key="index"
          >
            <img v-lazy="item.img" alt srcset @click="show(index)" class="img-swiper-wrap-img-lis previewer-demo-img">
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <div v-transfer-dom style="z-index:10000">
          <previewer
            :list="listImg"
            ref="previewer"
            :options="options"
            @on-index-change="logIndexChange"
          ></previewer>
        </div>
        <ImgAndTextNoteDetailsUserInfo
          style="background:#fff"
          :detailsObj="descContent"
          class="z-index-sty"
        ></ImgAndTextNoteDetailsUserInfo>
        <div class="content-wrap z-index-sty">
          <p style="font-size:18px;font-weight:bold">{{descContent.title}}</p>
          <p>{{descContent.summary}}</p>
        </div>
      </div>

      <DividedArea class="z-index-sty"></DividedArea>
      <CommentList :id="currentId" :dataList="commitDataList" class="commit-list"></CommentList>
    </div>
    <Comments v-on:pushCommition="updateCommintList"></Comments>
  </div>
</template>

<script>
import Header from "@/components/common/Header";
import SwiperImg from "@/components/common/SwiperImg";
import ImgAndTextNoteDetailsUserInfo from "@/components/layout/ImgAndTextNoteDetailsUserInfo";
import CommentList from "@/components/layout/ClickGetPageData";
import DividedArea from "@/components/common/DividedArea";
import Comments from "@/components/common/Comments";
import { SeourceCreatedListDetails } from "@/servers/api";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
import { Previewer, TransferDom } from "vux";

export default {
  directives: {
    TransferDom
  },
  name: "",
  props: [""],
  data() {
    return {
      SwiperImgData: {
        ImgList: [],
        index: 0,
        dotsPosition: "center",
        loop: true,
        auto: true,
        height: "220px"
      },
      swiperOption: {
        autoplay: true,
        pagination: {
          el: ".swiper-pagination"
        }
      },
      pullDownRefreshObj: {
        threshold: 40,
        stop: 40
      },
      TitleObjData: {
        titleContent: "详情",
        showLeftBack: true,
        showRightMore: false
      },
      commitDataList: [],
      descContent: {},
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
      },
      listImg:[]
    };
  },

  components: {
    Header,
    SwiperImg,
    ImgAndTextNoteDetailsUserInfo,
    CommentList,
    DividedArea,
    Comments,
    swiper,
    swiperSlide,
    Previewer
  },

  computed: {
    conHeight() {
      return { height: document.documentElement.clientHeight - 90 + "px" };
    },
    currentId() {
      return this.$route.query.id;
    },
    scrollStyle() {
      return {
        height: document.documentElement.clientHeight - 360 + "px",
        top: "350px"
      };
    }
  },

  beforeMount() {},

  mounted() {
    this.getDetailsData();
  },

  methods: {
    logIndexChange(arg) {
      console.log(arg);
    },
    show(index) {
      this.$refs.previewer.show(index);
    },
    //更新评论数据列表
    updateCommintList() {
      this.videoId = this.$route.query.id;
      SeourceCreatedListDetails({
        id: this.$route.query.id,
        type: this.$route.query.type
      })
        .then(res => {
          if (res.result === 1) {
            if (res.data.comment.length) {
              this.commitDataList = res.data.comment;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
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
            this.descContent = res.data.video;
            this.commitDataList = res.data.comment;
            let imgList = res.data.video.video_img.split(",");
            let arrObj = [];
            for (let i = 0; i < imgList.length; i++) {
              arrObj.push({
                img: imgList[i]
              });
              this.listImg.push({
                msrc:imgList[i],
                src:imgList[i],
              })
            }
            this.SwiperImgData.ImgList = JSON.parse(JSON.stringify(arrObj));
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
.img-text-details-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.content-wrap {
  width: 100%;
  padding: 15px;
  box-sizing: border-box;
  background: #fff;
}
.scroll-content-wrap {
  width: 100%;
  margin-top: 45px;
  overflow: hidden;
  overflow-y: scroll;
}
.img-text-details-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.z-index-sty {
  position: relative;
  z-index: 999;
}
.img-swiper-wrap {
  width: 100%;
  height: 170px;
}
.img-swiper-wrap-img-lis {
  width: 100%;
  height: 100%;
  display: inline-block;
  border-radius: 4px;
  object-fit: contain;
}
.img-text-content {
  width: 100%;
}
</style>