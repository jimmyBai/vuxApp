<template>
  <div>
    <div class="amap-page-container">
      <div id="container" :style="mapHeight" class="amap-demo"></div>
    </div>
    <!-- 文创订单详情 -->
    <div v-transfer-dom>
      <popup v-model="showPopup" position="bottom" max-height="50%" :hide-on-blur="true">
        <div class="popup2">
          <p class="title">
            <span style="font-size:16px">{{dataObj.wc_name}}</span>
            <span class="tip" @click="showToast=true">查看景区授权</span>
          </p>
          <p style="text-align:center;" v-show="!dataObj.details">
            <inline-loading></inline-loading>
          </p>
          <img :src="dataObj.details" alt srcset>
          <x-button class="btn" type="primary" @click.native="submit(dataObj.jq_id)">我要抢单</x-button>
        </div>
      </popup>
    </div>
    <!-- 艺创订单详情 -->
    <div v-transfer-dom>
      <popup v-model="showPopupYC" position="bottom" max-height="50%" :hide-on-blur="true">
        <div class="popup2">
          <p class="title">
            <span style="font-size:16px">{{dataObjYC.name}}</span>
            <span class="tip" @click="showToast=true">查看景区授权</span>
          </p>
          <p style="text-align:center;" v-show="!dataObjYC.arr">
            <inline-loading></inline-loading>
          </p>
          <group class="ycqd-group">
            <cell
              v-for="(item,index) in dataObjYC.arr"
              :key="index"
              :title="item.jq_name"
              is-link
              @click.native="ycqdFn(item)"
            >{{item.label}}</cell>
          </group>
        </div>
      </popup>
    </div>
    <!-- 溯源订单详情 -->
    <div v-transfer-dom>
      <popup v-model="showPopupSY" position="bottom" max-height="50%" :hide-on-blur="true">
        <div class="popup2">
          <p class="title">
            <span style="font-size:16px">当前位置溯源列表</span>
          </p>
          <p style="text-align:center;" v-show="!samePosition">
            <inline-loading></inline-loading>
          </p>
          <group class="ycqd-group">
            <cell
              v-for="(item,index) in samePosition"
              :key="index"
              :title="item.name"
              is-link
              @click.native="SYGet(item)"
            >时间：{{item.date}}</cell>
          </group>
        </div>
      </popup>
    </div>
    <!-- 景区授权 -->
    <div v-transfer-dom>
      <x-dialog v-model="showToast" class="dialog-demo">
        <div class="img-box">
          <img :src="dataObj.grant_img" style="max-width:100%;object-fit:contain;background:none">
        </div>
        <div @click="showToast=false">
          <span class="vux-close"></span>
        </div>
      </x-dialog>
    </div>
  </div>
</template>

<script>
let map = null;
let SYOrderListData = [];
import locationIcon from "@/assets/images/kachuo-location-icon.png";
import {
  TransferDom,
  Popup,
  Group,
  XDialog,
  XButton,
  InlineLoading,
  Cell
} from "vux";
import { SCENICLIST } from "@/assets/data/scenic";
import { GetSoliciList, SYorderList } from "@/servers/api";
export default {
  directives: {
    TransferDom
  },
  name: "",
  props: [],
  data() {
    return {
      mapCenter: [116.397045, 39.917959],
      markerArr: [],
      showPopup: false,
      showToast: false,
      showPopupYC: false,
      showPopupSY: false,
      clickPosition: {},
      dataObj: {},
      dataObjYC: {
        name: "",
        arr: []
      },
      SYOrderListData: [],
      samePosition: []
    };
  },

  components: {
    Popup,
    Group,
    XDialog,
    XButton,
    InlineLoading,
    Cell
  },

  computed: {
    mapHeight() {
      return { height: document.documentElement.clientHeight - 90 + "px" };
    }
  },

  beforeMount() {},
  created() {},
  mounted() {
    this.init().then(res => {
      this.showMarker(SCENICLIST);
    });
  },

  methods: {
    // 溯源抢单
    SYGet(item) {
      this.$router.push({
        path: "/SuYuanQiangdan",
        query: {
          item:JSON.stringify(item)
        }
      });
    },
    getScenceDataMark() {
      this.init().then(res => {
        this.showMarker(SCENICLIST);
      });
    },
    getSYData() {
      Promise.all([this.init(), this.getSYOrderList()]).then(res => {
        let markArr = res[1];
        markArr.forEach((item, index) => {
          var marker = new AMap.Marker({
            map: map,
            icon: locationIcon,
            position: [item.position[0], item.position[1]],
            offset: new AMap.Pixel(-13, -30)
          });
          marker.setLabel({
            offset: new AMap.Pixel(20, 20),
            content: item.name,
            id: item.id,
            position: [item.position[0], item.position[1]]
          });
          marker.on("click", item => {
            this.samePosition = [];
            for (let i = 0; i < this.SYOrderListData.length; i++) {
              if (
                this.SYOrderListData[i].position.join(",") ===
                item.target.Uh.label.position.join(",")
              ) {
                this.samePosition.push(this.SYOrderListData[i]);
              }
            }
            this.showPopupSY = true;
          });
        });
      });
    },
    // 溯源订单列表
    getSYOrderList() {
      this.SYOrderListData = [];
      return new Promise((resolve, reject) => {
        SYorderList({})
          .then(res => {
            console.log(res);
            if (res.result === 1) {
              for (let i = 0; i < res.data.data.length; i++) {
                this.SYOrderListData.push({
                  id: res.data.data[i].yc_id,
                  name: res.data.data[i].category,
                  date: res.data.data[i].date,
                  position: res.data.data[i].ip.split(","),
                  order: res.data.data[i].order,
                  address: res.data.data[i].address
                });
              }
              resolve(this.SYOrderListData);
            }
          })
          .catch(err => {
            console.log(err);
          });
      });
    },
    ycqdFn(item) {
      console.log(item);
      this.$router.push({
        path: "/yichuangqiangdan",
        query: {
          id: item.wc_id,
          arr: item.details
        }
      });
    },
    submit(id) {
      this.$router.push("/wenchuangqiangdan?id=" + id);
    },
    doShowToast() {
      this.$vux.toast.show({
        text: "toast"
      });
    },
    getdataList(type, id, name) {
      GetSoliciList({
        type: type
      })
        .then(res => {
          if (res.result === 1) {
            if (type === 1) {
              this.showPopup = true;
              for (let i = 0; i < res.data.result.length; i++) {
                if (res.data.result[i].jq_id == id) {
                  this.dataObj = res.data.result[i];
                }
              }
            } else if (type === 2) {
              this.showPopupYC = true;
              for (let i in res.data.result) {
                if (i == name) {
                  this.dataObjYC.name = i;
                  this.dataObjYC.arr = res.data.result[i];
                }
              }
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    showModel(id, name) {
      this.getdataList(this.$parent.tabIndex, id, name);
    },
    showMarker(markArr) {
      markArr.forEach((item, index) => {
        var marker = new AMap.Marker({
          map: map,
          icon: locationIcon,
          position: [item.position[0], item.position[1]],
          offset: new AMap.Pixel(-13, -30)
        });
        marker.setLabel({
          offset: new AMap.Pixel(20, 20),
          content: item.name,
          id: item.id
        });
        marker.on("click", item => {
          this.showModel(item.target.Uh.label.id, item.target.Uh.label.content);
        });
      });
    },
    init() {
      //获取地图初始化中心点
      // 初始化地图
      return new Promise((resolve, reject) => {
        map = new AMap.Map("container", {
          center: this.mapCenter,
          resizeEnable: true,
          zoom: 4,
          features: ["bg", "road", "building"]
        });
        map.clearMap();
        map.plugin(["AMap.ToolBar", "AMap.Scale"], function() {
          map.addControl(new AMap.ToolBar());
          map.addControl(new AMap.Scale());
        });
        resolve(map);
      });
    }
  },
  updated() {},
  watch: {}
};
</script>
<style lang='less' scoped>
@import "~vux/src/styles/close";
.amap-page-container {
  position: relative;
}
.content-model {
  position: relative;
  z-index: 9999;
}
.popup2 {
  padding-bottom: 20px;
  height: 50%;
  overflow: hidden;
  overflow-y: scroll;
  background: #fff;
}
.title {
  width: 100%;
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-weight: bold;
}
.tip {
  font-size: 12px;
  color: #666;
  width: 80px;
  height: 16px;
  overflow: hidden;
  padding: 2px;
  box-sizing: border-box;
  border: 1px solid #666;
  border-radius: 4px;
  font-weight: normal;
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
    height: 350px;
    overflow: hidden;
  }
  .vux-close {
    margin-top: 8px;
    margin-bottom: 8px;
  }
}
.btn {
  width: 80%;
  margin-top: 20px;
}
.order-list {
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #eee;
  padding-left: 15px;
  box-sizing: border-box;
}
</style>