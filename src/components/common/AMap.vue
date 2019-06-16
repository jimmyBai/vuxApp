<template>
  <div>
    <div class="amap-page-container">
      <div id="container" :style="mapHeight" class="amap-demo">
      </div>
    </div>
    <Popup class="content-model" ref="videoWrap" :dataPosition="clickPosition"></Popup>
  </div>
</template>

<script>

let map = null,walking = null;
import { getCurrentPositionByCurrentScenicId } from "@/assets/js/tools";
import { getScenicMerchants } from "@/servers/api";
import Popup from "@/components/common/PopupMerchants";
import locationIcon from "@/assets/images/amap-icon/location-icon.png";  //定位按钮
import inlocationIcon from "@/assets/images/amap-icon/inlocation-icon.png"; //当前位置
import cate from "@/assets/images/amap-icon/cate.png";  //美食
import cateActive from "@/assets/images/amap-icon/cateActive.png";
import life from "@/assets/images/amap-icon/life.png";  //休闲
import lifeActive from "@/assets/images/amap-icon/lifeActive.png";
import hotel from "@/assets/images/amap-icon/hotel.png";//酒店
import hotelActive from "@/assets/images/amap-icon/hotelActive.png";
import recreation from "@/assets/images/amap-icon/recreation.png";//娱乐
import recreationActive from "@/assets/images/amap-icon/recreationActive.png";
import game from "@/assets/images/amap-icon/recreation.png";//玩吧
import gameActive from "@/assets/images/amap-icon/recreationActive.png";
import eat from "@/assets/images/amap-icon/eat.png";//吃吧
import eatActive from "@/assets/images/amap-icon/eatActive.png";
import drink from "@/assets/images/amap-icon/drink.png";//喝吧
import drinkActive from "@/assets/images/amap-icon/drinkActive.png";
const iconArray=[cate,cateActive,life,lifeActive,hotel,hotelActive,recreation,recreationActive,game,gameActive,eat,eatActive,drink,drinkActive]
 
export default {
  name: "",
  props: ["mapHeight"],
  data() {
    return {
      mapCenter: [],
      markerArr: [],
      showModelFlag: false,
      clickPosition: {}
    };
  },

  components: {
    Popup
  },

  computed: {},

  beforeMount() {},
  created() {},
  mounted() {
    this.getUserClick();
  },

  methods: {
    getUserClick() {
      let type = this.$route.query.type||'1';
      this.getMapCenterPosition(type)
    },
    showModel(id) {
      this.$refs.videoWrap.getScenicDetails(id);
    },
    // 添加商家标记
    getMerchantsData(type) {
      let markerArr = [];
      getScenicMerchants({
        scenicid: sessionStorage.getItem("currentScenic"),
        type: type
      }).then(res => {
          if (res.result === 1) {
            if (res.data.length) {
              for (let i = 0; i < res.data.length; i++) {
                markerArr.push({
                  position: [
                    parseFloat(res.data[i].latitude),
                    parseFloat(res.data[i].longitude)
                  ],
                  label: res.data[i].name,
                  id: res.data[i].id
                });
              }
               this.showMarker(markerArr,type); 
            } else {
              this.$vux.toast.show({
                type:"text",
                text: "暂无推荐",
                time:1000,
                position:"middle",
                isShowMask:true
              });
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getMapCenterPosition(type) {
      let id = sessionStorage.getItem("currentScenic");
      getCurrentPositionByCurrentScenicId(id).then(res => {
          this.mapCenter = res.split(",");
          this.init(type);
        })
        .catch(err => {
          console.log(err);
        });
    },
    showMarker(markArr,type) {
      let markers=[],marker=null;
      let normalIcon='',activeIcon=''
      if(type==1){
        normalIcon=iconArray[8]
        activeIcon=iconArray[9]
      }else if(type==2){
        normalIcon=iconArray[10]
        activeIcon=iconArray[11]
      }else if(type==3){
        normalIcon=iconArray[12]
        activeIcon=iconArray[13]
      }else if(type==4){
        normalIcon=iconArray[0]
        activeIcon=iconArray[1]
      }else if(type==5){
        normalIcon=iconArray[2]
        activeIcon=iconArray[3]
      }else if(type==6){
        normalIcon=iconArray[4]
        activeIcon=iconArray[5]
      }else if(type==7){
        normalIcon=iconArray[6]
        activeIcon=iconArray[7]
      }
      markArr.forEach((item, index) => {
        marker = new AMap.Marker({
          icon: new AMap.Icon({            
            image: activeIcon,
            size: new AMap.Size(30,35),  //图标大小
            imageSize: new AMap.Size(30,35),
            anchor:[15,35], // 设置锚点方位
          }),
          position: [item.position[0], item.position[1]],
          offset: new AMap.Pixel(-15,-35), //设置偏移量
          label: {
            anchor:'bottom-center', // 设置锚点方位
            offset:  new AMap.Pixel(-15,-22)
          }
        });    
        markers.push(marker)    
        marker.setLabel({
          content:`<div>${ item.label }</div>`,
          id: item.id
        });
        map.add(marker);        
        marker.on("click", item => {
          // for (var i = 0; i < markers.length; i++) {
          //     markers[i].setIcon(new AMap.Icon({            
          //     image: normalIcon,
          //     size: new AMap.Size(10,18),  //图标大小
          //     imageSize: new AMap.Size(10,28)
          //   }));
          // }
          // marker.setIcon( new AMap.Icon({            
          //   image: activeIcon,
          //   size: new AMap.Size(35,40),  //图标大小
          //   imageSize: new AMap.Size(35,40),
          // }),)
          this.showModel(item.target.Uh.label.id);
          // this.drawMap(item.lnglat.lng,item.lnglat.lat)
        });
         map.setFitView();
      });
    },

    // //绘制路线
    // drawMap(Tlng,Tlat) { // 专车--画地图
    //      //构造路线导航类
        
    //     if(walking){
    //       //调用clear()函数清除上一次结果，可以清除地图上绘制的路线以及路径文本结果
    //         walking.clear();         
    //     }
    //     walking = new AMap.Walking({
    //       map: map,   
    //       hideMarkers: false,
    //       isOutline: true,
    //       outlineColor: '#ffeeee',
    //       autoFitView: true
    //     });
    //     walking.search([this.mapCenter[0], this.mapCenter[1]], [Tlng, Tlat], function(status, result) {
    //         // result即是对应的步行路线数据信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_WalkingResult
    //         if (status === 'complete') {
    //             console.log('绘制路线完成')
    //         } else {
    //             console.log('获取数据失败：' + result)
    //         }
    //     });
    // },



    init(type) {
      //获取地图初始化中心点
      // 初始化地图
      if(map){
        map.clearMap();
      }
      map = new AMap.Map("container", {
        center: this.mapCenter,
        resizeEnable: true,
        zoom: 16,   
        features: ["bg","road","building", 'point'],
        pitch:60,
        viewMode:'3D',//开启3D视图,默认为关闭
        buildingAnimation:true,//楼块出现是否带动画
        showBuildingBlock:true,
      });
       //定位点
      var options = {
        'showButton': true,//是否显示定位按钮
        'buttonPosition': 'LB',//定位按钮的位置
        'buttonDom':`<img src=${locationIcon} style="width:36px;height:36px";background-color:none"/>`,
        'buttonOffset': new AMap.Pixel(10, 50),//定位按钮距离对应角落的距离
        'showMarker': true,//是否显示定位点
        'markerOptions':{//自定义定位点样式，同Marker的Options
          'offset': new AMap.Pixel(-18, -36),
          'content':`<img src=${inlocationIcon} style="width:25px;height:32px";background-color:none"/>`
        },
      }
      map.plugin(["AMap.ToolBar", "AMap.Scale","AMap.Geolocation","AMap.ControlBar"], function() {
        map.addControl(new AMap.ToolBar({
            // 简易缩放模式，默认为 false
            liteStyle: true
        }));
        map.addControl(new AMap.Scale());
        map.addControl(new AMap.ControlBar({
          showControlButton:true,
          showZoomBar:false,
        }))
        var geolocation = new AMap.Geolocation(options);
        map.addControl(geolocation);
       // geolocation.getCurrentPosition()
      });      
      // 获取标记点
      this.getMerchantsData(type);
    }
  },
  updated() {},
  watch: {}
};
</script>
<style lang='css' scoped>
.amap-page-container {
  position: relative;
}
.content-model {
  position: relative;
  z-index: 9999;
}
.map_container{
    position: absolute;
    height: 300px;
    width: 300px;
    top: 46px;
    right:10px
}
</style>