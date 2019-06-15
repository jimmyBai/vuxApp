<template>
  <div class="goods-details-wrap">
    <Header
      :titleContent="TitleObjData.titleContent"
      :showLeftBack="TitleObjData.showLeftBack"
      :showRightMore="TitleObjData.showRightMore"
    ></Header>
    <div class="goods-details-content" :style="conHei">
      <!-- <VideoPlayer :isControls="true" v-if="goodsData.ar_image" class="video-player-wrap"></VideoPlayer> -->
      <SwiperImg :SwiperImgDataList="SwiperImgData" v-if="SwiperImgData.ImgList.length"></SwiperImg>
      <div class="goods-details-desc">
        <p class="goods-name text-overflow-hidden">{{goodsData.title}}</p>
        <p class="goods-price" v-if="routeQueryPrice">
          <span style="font-size:16px;margin-right:4px">¥</span>
          {{routeQueryPrice}}
        </p>
        <p class="goods-price" v-if="!routeQueryPrice">
          <span style="font-size:16px;margin-right:4px">¥</span>
          {{goodsData.marketprice}}
        </p>
        <p class="goods-propity">
          <span>运费：包邮</span>
          <span>销量：{{goodsData.sales}}</span>
          <span>库存：{{goodsData.total}}</span>
        </p>
      </div>
      <p class="good-acvitivy">活动</p>
      <div class="divider-area-wrap"></div>
      <div class="goods-details-cells">
        <group>
          <cell title="已选" v-if="goodsData.options" is-link @click.native="selOptionFn">{{selName}}</cell>
          <cell title="已选" v-else-if="!goodsData.options" is-link disabled>*1</cell>
        </group>
        <div class="divider-area-wrap"></div>
        <group>
          <cell title="作品参数" is-link @click.native="selOptionFn2">{{selOption}}</cell>
          <cell title="服务" is-link @click.native="selServiceFn">{{selService}}</cell>
        </group>
        <div class="divider-area-wrap"></div>
      </div>
      <div class="goods-about-list">
        <p class="goods-about-list-p">
          <span @click="blockChainInfoFn">文链查证</span>
          <span @click="showSourceVideo">溯源视频</span>
          <span class="goods-about-list-p-span-noborder">文化构思</span>
        </p>
      </div>
      <div class="divider-area-wrap"></div>
      <div class="goods-about-copywriter">
        <span>产品文案</span>
      </div>
      <p style="margin-top:10px" v-html="goodsData.content">{{goodsData.content}}</p>
    </div>
    <div class="good-details-boot">
      <p class="goods-action">
        <span style="font-size:14px;" class="iconfont iconkefu"></span>
        <span style="font-size:12px">客服</span>
      </p>
      <p class="goods-action" @click="collectGoods">
        <span v-if="!collectState" style="font-size:14px" class="iconfont iconshoucang1"></span>
        <span
          v-else-if="collectState"
          style="font-size:14px"
          class="iconfont iconshoucang-xuanzhong"
        ></span>
        <span style="font-size:12px">收藏</span>
      </p>
      <p class="goods-action-right" @click="addShoppingCart">
        <span>加入购物车</span>
      </p>
      <p class="goods-action-right-buy" @click="confirmOrder">
        <span>立即购买</span>
      </p>
    </div>
    <!-- 选择类型弹层 -->
    <div v-transfer-dom>
      <popup v-model="showPopup" position="bottom">
        <div class="box-popup">
          <checker v-model="selModel">
            <x-button
              type="primary"
              mini
              v-for="(item,index) in goodsData.options"
              :key="index"
              class="option-for-item"
              @click.native="setForItem(item.title,item.id)"
            >{{item.title}}</x-button>
          </checker>
        </div>
      </popup>
    </div>
    <!-- 选择参数弹层 -->
    <div v-transfer-dom>
      <popup v-model="showPopupOption" position="bottom">
        <div class="box-popup">
          <checker v-model="selModel">
            <x-button type="primary" mini @click.native="showPopupOption = false">无</x-button>
          </checker>
        </div>
      </popup>
    </div>
    <!-- 溯源视频弹层 -->
    <div v-transfer-dom>
      <x-dialog v-model="showSourceModel" class="dialog-demo">
        <div class="img-box" v-if="this.goodsData.sy_video">
          <!-- <div class="video" id="wrapper"></div> -->
          <video
            ref="videoPlayer"
            :src="this.goodsData.sy_video"
            :poster="this.goodsData.thumb_url[0]"
            controls="controls"
            controlslist="nodownload"
          ></video>
        </div>
        <div @click="closeVideo">
          <span class="vux-close"></span>
        </div>
      </x-dialog>
    </div>
  </div>
</template>

<script>
import ChimeeMobilePlayer from "chimee-mobile-player";
import "../../../../../node_modules/chimee-mobile-player/lib/chimee-mobile-player.browser.css";
import Header from "@/components/common/Header";
import VideoPlayer from "@/components/common/VideoPlayer";
import SwiperImg from "@/components/common/SwiperImgGoodDetails";
import { getDetail, CollectionGoods, SaveShopping } from "@/servers/api";
import Divider from "@/components/common/DividedArea";
import { vueCordovaFunction } from "@/assets/js/vuecordova";
import {
  Cell,
  CellBox,
  CellFormPreview,
  Group,
  Badge,
  TransferDom,
  Popup,
  Checker,
  CheckerItem,
  XButton,
  XDialog
} from "vux";
import { setTimeout } from "timers";

export default {
  directives: {
    TransferDom
  },
  name: "",
  props: [""],
  data() {
    return {
      TitleObjData: {
        titleContent: "商品详情",
        showLeftBack: true,
        showRightMore: true
      },
      selModel: "",
      showPopup: false,
      showPopupOption: false,
      showSourceModel: false,
      goodsData: {},
      selName: "",
      selOption: "",
      selService: "",
      collectState: true,
      SwiperImgData: {
        ImgList: [],
        index: 0,
        dotsPosition: "center",
        loop: true,
        auto: true,
        height: "160px"
      }
    };
  },

  components: {
    Header,
    VideoPlayer,
    SwiperImg,
    Divider,
    Group,
    Cell,
    CellFormPreview,
    CellBox,
    Badge,
    TransferDom,
    Popup,
    Checker,
    CheckerItem,
    XButton,
    XDialog
  },

  computed: {
    conHei() {
      return { height: document.documentElement.clientHeight - 45 + "px" };
    },
    routeQueryPrice() {
      if (this.$route.query.price) {
        return this.$route.query.price;
      } else {
        return null;
      }
    }
  },
  created() {},
  beforeMount() {},

  mounted() {
    this.getGoodsDetailsInfo();
  },

  methods: {
    closeVideo() {
      this.showSourceModel = false;
      this.$refs.videoPlayer.pause();
    },
    showSourceVideo() {
      if (this.goodsData.sy_video) {
        this.showSourceModel = true;
      } else {
        this.$vux.toast.show({
          type: "text",
          text: "暂无视频",
          time: 1000,
          position: "middle",
          isShowMask: true
        });
      }
      // this.createVideoDom();
    },
    createVideoDom() {
      if (this.goodsData.sy_video) {
        this.showSourceModel = true;
        new ChimeeMobilePlayer({
          wrapper: "#wrapper",
          src: this.goodsData.sy_video,
          autoplay: false,
          poster: this.goodsData.thumb_url[0],
          controls: true,
          playsInline: true,
          preload: "auto",
          x5VideoPlayerFullscreen: true,
          x5VideoOrientation: "landscape|portrait",
          xWebkitAirplay: true,
          muted: false,
          disableUA: [
            "Mozilla/5.0 (Linux; Android 4.4.2; HM NOTE 1TD Build/KOT49H; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/62.0.3202.97 Mobile Safari/537.36"
          ]
        });
      } else {
        this.$vux.toast.show({
          type: "text",
          text: "暂无视频",
          time: 1000,
          position: "middle",
          isShowMask: true
        });
      }
      // console.log(this.goodsData);
    },
    blockChainInfoFn() {
      let id = this.$route.query.id;
      let flag = this.goodsData.is_forty;
      let rule = this.goodsData.rule;
      if (flag) {
        this.$router.push(
          "/blockinfoindex?id=" + id + "&flag=" + flag + "&rule=" + rule
        );
      } else {
        this.$vux.toast.text("数据上链中...", "middle");
        setTimeout(() => {
          this.$vux.toast.hide();
        }, 1000);
      }
    },
    // 确认清单
    confirmOrder() {
      if (this.$route.query.price) {
        this.$router.push(
          "/confirmorder?id=" +
            this.$route.query.id +
            "&priceback=" +
            this.$route.query.price
        );
      } else {
        this.$router.push("/confirmorder?id=" + this.$route.query.id);
      }
    },
    // 添加购物车
    addShoppingCart() {
      SaveShopping({
        gid: this.goodsData.id
      })
        .then(res => {
          if (res.result === 1) {
            this.$vux.toast.show({
              type: "success",
              text: "添加成功",
              time: 1000
            });
          } else {
            this.$vux.toast.show({
              type: "warn",
              text: res.msg,
              time: 1000
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 收藏
    collectGoods() {
      this.collectState = !this.collectState;
      let type = this.collectState === false ? 0 : 1;
      this.collectionGoodsMethod(type);
    },
    collectionGoodsMethod(type) {
      CollectionGoods({
        goodsid: this.goodsData.id,
        type: 1
      })
        .then(res => {
          if (res.result === 1) {
            if (type === 1) {
              this.$vux.toast.show({
                type: "success",
                text: "收藏成功",
                time: 1000
              });
            } else {
              this.$vux.toast.show({
                type: "success",
                text: "取消收藏",
                time: 1000
              });
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    setForItem(name, id) {
      this.selName = name;
      setTimeout(() => {
        this.showPopup = false;
      }, 300);
    },
    selOptionFn2() {
      this.showPopupOption = true;
    },
    selServiceFn() {
      this.showPopupOption = true;
    },
    selOptionFn() {
      this.showPopup = true;
    },
    getGoodsDetailsInfo() {
      getDetail({
        goods_id: this.$route.query.id
      })
        .then(res => {
          let arr = [];
          // console.log(res);
          if (res.result === 1) {
            if (res.data.favorite) {
              this.collectState = true;
            } else {
              this.collectState = false;
            }
            if (res.data.thumb_url.length) {
              for (let i = 0; i < res.data.thumb_url.length; i++) {
                arr.push({
                  img: res.data.thumb_url[i]
                });
              }
              this.SwiperImgData.ImgList = JSON.parse(JSON.stringify(arr));
            }
            this.$nextTick(() => {
              this.goodsData = res.data;
            });
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
<style lang='less' scoped>
@import "~vux/src/styles/close";
.divider-area-wrap {
  width: 100%;
  height: 10px;
  background: #f5f5f5;
}
.goods-details-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.goods-details-content {
  width: 100%;
  background: #fff;
  margin-top: 50px;
  overflow: hidden;
  overflow-y: scroll;
  box-sizing: border-box;
  padding-bottom: 55px;
}
.video-player-wrap {
  width: 100%;
  height: 200px;
  overflow: hidden;
}
.goods-details-desc {
  width: 100%;
  height: 110px;
}
.goods-propity {
  width: 100%;
  height: 30px;
  color: #999;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding: 0 15px;
  box-sizing: border-box;
}
.goods-name {
  width: 100%;
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  font-weight: bold;
  padding: 0 15px;
  box-sizing: border-box;
}
.goods-price {
  width: 100%;
  height: 50px;
  font-size: 30px;
  color: #b7090a;
  padding: 0 15px;
  box-sizing: border-box;
}
.good-acvitivy {
  width: 100%;
  height: 50px;
  line-height: 50px;
  padding: 0 15px;
  box-sizing: border-box;
}
.goods-about-list {
  width: 100%;
  height: 44px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.goods-about-list-p {
  width: 100%;
  height: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.goods-about-list-p span {
  flex: 1;
  text-align: center;
}
.goods-about-list-p span:nth-child(1),
.goods-about-list-p span:nth-child(2) {
  border-right: 1px solid #eee;
}
.goods-about-copywriter {
  width: 100%;
  height: 44px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.goods-about-copywriter span {
  width: 60px;
  height: 100%;
  line-height: 44px;
  text-align: center;
  display: inline-block;
  border-bottom: 4px solid #000;
}
.good-details-boot {
  width: 100%;
  height: 50px;
  border-top: 1px solid #eee;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
  background: #fff;
  box-sizing: border-box;
}
.goods-action {
  flex: 1;
  height: 60%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border-right: 1px solid #eee;
}
.goods-action span {
  font-size: 12px;
}
.goods-action-right {
  flex: 2;
  text-align: center;
}
.goods-action-right-buy {
  height: 100%;
  line-height: 50px;
  flex: 2;
  text-align: center;
  background: #222;
  color: #fff;
}
.demo1-item {
  border: 1px solid #ececec;
  padding: 5px 15px;
}
.demo1-item-selected {
  border: 1px solid green;
}
.box-popup {
  width: 100%;
  height: 300px;
  background: #fff;
  padding: 15px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  overflow: hidden;
  overflow-y: scroll;
}
.option-for-item {
  width: auto;
  min-height: 20px;
  height: auto;
  font-size: 14px;
  margin: 4px;
  padding: 0 6px;
  box-sizing: border-box;
  border-radius: 4px;
}
.video {
  width: 100%;
  height: 200px;
  overflow: hidden;
}
.dialog-demo {
  .weui-dialog {
    border-radius: 8px;
    padding-bottom: 8px;
  }
  .dialog-title {
    line-height: 30px;
    color: #666;
  }
  .img-box {
    height: 200px;
    overflow: hidden;
  }
  .vux-close {
    margin-top: 8px;
    margin-bottom: 8px;
  }
}
</style>