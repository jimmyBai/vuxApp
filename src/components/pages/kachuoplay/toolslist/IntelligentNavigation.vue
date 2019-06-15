<template>
  <div class="amap-page-container">
    <Header
      :titleContent="TitleObjData.titleContent"
      :showLeftBack="TitleObjData.showLeftBack"
      :showRightMore="TitleObjData.showRightMore"
    ></Header>
    <div id="container" :style="setMapHeight" class="amap-demo"></div>
    <Popup class="content-model" ref="videoWrap" v-show="showModelFlag" :dataPosition="clickPosition"></Popup>
    <NavigationTab :dataList="tabList" v-on:changePath="showPath"></NavigationTab>
  </div>
</template>

<script>
let map = null,walking=null;
let scenicDataObj = {};

import {
  SCENICSPOT as SCENICSPOT_A,
  SCENICLINE as SCENICLINE_A
} from "@/assets/scencedata/cangyanshan";
import {
  SCENICSPOT as SCENICSPOT_B,
  SCENICLINE as SCENICLINE_B
} from "@/assets/scencedata/huizhou";
import {
  SCENICSPOT as SCENICSPOT_C,
  SCENICLINE as SCENICLINE_C
} from "@/assets/scencedata/penglai";
import {
  SCENICSPOT as SCENICSPOT_D,
  SCENICLINE as SCENICLINE_D
} from "@/assets/scencedata/shaolin";
import {
  SCENICSPOT as SCENICSPOT_E,
  SCENICLINE as SCENICLINE_E
} from "@/assets/scencedata/shenhu";
import {
  SCENICSPOT as SCENICSPOT_F,
  SCENICLINE as SCENICLINE_F
} from "@/assets/scencedata/yunwushan";
import {
  SCENICSPOT as SCENICSPOT_G,
  SCENICLINE as SCENICLINE_G
} from "@/assets/scencedata/sankong";
import {
  SCENICSPOT as SCENICSPOT_H,
  SCENICLINE as SCENICLINE_H
} from "@/assets/scencedata/yungang";

import Header from "@/components/common/Header";
import NavigationTab from "@/components/common/NavigationTab";
import Popup from "@/components/common/Popup";
import locationIcon from "@/assets/images/amap-icon/location-icon.png";
import scenicIcon from "@/assets/images/amap-icon/scenic.png";
import scenicActiveIcon from "@/assets/images/amap-icon/scenicActive.png";
import inlocationIcon from "@/assets/images/amap-icon/inlocation-icon.png";

import { CheckByLocation } from "@/servers/api";
import { setTimeout } from "timers";

export default {
  name: "amap-page",
  data() {
    return {
      TitleObjData: {
        titleContent: "智慧导航",
        showLeftBack: true,
        showRightMore: true
      },
      tabList: [
        "全景图",
        "登山图",
        "寻花图",
        "戏水图",
        "访仙图",
        "问佛图",
        "探古图"
      ],
      scenicList: [
        {
          id: "22",
          name: "苍岩山",
          position: [114.145831, 37.831976]
        },
        {
          id: "23",
          name: "徽州古城",
          position: [118.434598, 29.867]
        },
        {
          id: "24",
          name: "蓬莱",
          position: [120.752564, 37.825461]
        },
        {
          id: "25",
          name: "少林",
          position: [112.941363,34.506982]
        },
        {
          id: "26",
          name: "神垕",
          position: [113.228142, 34.118356]
        },
        {
          id: "27",
          name: "云雾山",
          position: [114.214391, 31.12476]
        },
        {
          id: "35",
          name: "三孔",
          position: [116.989873, 35.590745]
        },
        {
          id: "66",
          name: "云冈石窟",
          position: [113.144103, 40.109236]
        }
      ],
      roadPath: [],
      mapCenter: [],
      path: [],
      SCENICSPOT: [],
      SCENICLINE: [],
      clickPosition:{}
    };
  },
  components: {
    Header,
    Popup,
    NavigationTab
  },
  methods: {
    importDataSync(id) {
      let dataObj = {};
      switch (id) {
        case "22":
          this.SCENICSPOT = SCENICSPOT_A;
          this.SCENICLINE = SCENICLINE_A;
          break;
        case "23":
          this.SCENICSPOT = SCENICSPOT_B;
          this.SCENICLINE = SCENICLINE_B;
          break;
        case "24":
          this.SCENICSPOT = SCENICSPOT_C;
          this.SCENICLINE = SCENICLINE_C;
          break;
        case "25":
          this.SCENICSPOT = SCENICSPOT_D;
          this.SCENICLINE = SCENICLINE_D;
          break;
        case "26":
          this.SCENICSPOT = SCENICSPOT_E;
          this.SCENICLINE = SCENICLINE_E;
          break;
        case "27":
          this.SCENICSPOT = SCENICSPOT_F;
          this.SCENICLINE = SCENICLINE_F;
          break;
        case "35":
          this.SCENICSPOT = SCENICSPOT_G;
          this.SCENICLINE = SCENICLINE_G;
          break;
        case "66":
          this.SCENICSPOT = SCENICSPOT_H;
          this.SCENICLINE = SCENICLINE_H;
          break;
      }
      return dataObj;
    },
    initLocalData() {
      let scenicId = sessionStorage.getItem("currentScenic");
      let data = this.importDataSync(scenicId);
      for (let i = 0; i < this.scenicList.length; i++) {
        if (this.scenicList[i].id == scenicId) {
          this.mapCenter = this.scenicList[i].position;
        }
      }
      this.path = this.SCENICSPOT;
      this.SCENICLINE = this.SCENICLINE;
      this.roadPath = this.SCENICLINE[0].path;
      this.init();
    },
    init() {
      map = new AMap.Map("container", {
        center: this.mapCenter,
        resizeEnable: true,
        zoom: 17,
        features: ["bg","road","building",'point'],
        pitch:60,
        viewMode:'3D',//开启3D视图,默认为关闭
        buildingAnimation:true,//楼块出现是否带动画
        showBuildingBlock:true,
      });
      let markers=[];
      map.clearMap();
      let setmarker = new AMap.Marker({
          icon: new AMap.Icon({            
            image: inlocationIcon,
            size: new AMap.Size(20,28),  //图标大小
            imageSize: new AMap.Size(20,28)
          }),
          position:this.mapCenter,
          offset: new AMap.Pixel(-13, -30)
      });
      setmarker.setMap(map);
      
      //定位点
      var options = {
        'showButton': true,//是否显示定位按钮
        'buttonPosition': 'LB',//定位按钮的位置
        'buttonDom':`<img src=${locationIcon} style="width:36px;height:36px"/>`,
        /* LT LB RT RB */
        'buttonOffset': new AMap.Pixel(10, 50),//定位按钮距离对应角落的距离
        'showMarker': true,//是否显示定位点
        'markerOptions':{//自定义定位点样式，同Marker的Options
          'offset': new AMap.Pixel(-18, -36),
           'content':'<img src="https://a.amap.com/jsapi_demos/static/resource/img/user.png" style="width:25px;height:25px"/>'
        },
      }
      AMap.plugin(["AMap.ToolBar", "AMap.Scale","AMap.Geolocation","AMap.ControlBar"], function() {
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
        //geolocation.getCurrentPosition()
      });  

      console.log(this.path[0])
      if (this.roadPath.length) {  
        let loadPath=[]
        this.roadPath.forEach((kpath,kindex)=>{
          let{lng,lat}=kpath
          loadPath.push(lng+'&'+lat)
        })
        this.path.forEach((item, index) => {
          let backpath=item.position[0]+'&'+item.position[1];
          if(loadPath.indexOf(backpath)>-1){
            var marker = new AMap.Marker({
              map: map,
              icon: new AMap.Icon({            
                image: scenicIcon,
                size: new AMap.Size(25,28),  //图标大小
                imageSize: new AMap.Size(25,28)
              }),
              size: new AMap.Size(25,28),
              position: [item.position[0], item.position[1]],
              offset: new AMap.Pixel(-13, -30)
            });
          }else{
            return
          }
          // if (item.label.indexOf("卡戳文化艺术馆") != -1) {
          //   //规划路线
          //   var marker = new AMap.Marker({
          //     map: map,
          //     icon: new AMap.Icon({            
          //       image: scenicIcon,
          //       size: new AMap.Size(25,28),  //图标大小
          //       imageSize: new AMap.Size(25,28)
          //     }),
          //     size: new AMap.Size(25,28),
          //     position: [item.position[0], item.position[1]],
          //     offset: new AMap.Pixel(-13, -30)
          //   });
          // } else {
          //   var marker = new AMap.Marker({
          //     map: map,
          //     icon: new AMap.Icon({            
          //       image: scenicIcon,
          //       size: new AMap.Size(25,28),  //图标大小
          //       imageSize: new AMap.Size(25,28),
          //       offset: new AMap.Pixel(-13, -30),
          //     }),
          //     position: [item.position[0], item.position[1]],
          //     offset: new AMap.Pixel(-13, -30)
          //     });
          // }
          markers.push(marker)
          marker.setLabel({
            offset: new AMap.Pixel(25, 28),
            content: item.label
          });
          marker.on("click", item => {
            for (var i = 0; i < markers.length; i++) {
                markers[i].setIcon(new AMap.Icon({            
                image: scenicIcon,
                size: new AMap.Size(25,28),  //图标大小
                imageSize: new AMap.Size(25,28),
              offset: new AMap.Pixel(-13, -30),
              }));
            }
            let con = item.target.Uh.label.content;
            marker.setIcon( new AMap.Icon({            
                image: scenicActiveIcon,
                size: new AMap.Size(25,28),  //图标大小
                imageSize: new AMap.Size(25,28),
              offset: new AMap.Pixel(-13, -30),
              }),)
            this.showModel(con,item.target.Uh.position);          
            this.drawMap(item.lnglat.lng,item.lnglat.lat)
          });
        });
        let bezierCurve = new AMap.BezierCurve({
          path: this.roadPath,
          isOutline: true,
          outlineColor: "#fff",
          borderWeight: 0,
          strokeColor: "#666",
          strokeOpacity: 1,
          strokeWeight: 2,
          strokeStyle: "dashed",
          strokeDasharray: [10, 10],
          lineJoin: "round",
          lineCap: "round",
          zIndex: 50
        });
        bezierCurve.setMap(map);
        map.setFitView([bezierCurve]);
      } else {
        this.$vux.toast.text("暂无推荐路线", "middle");
        setTimeout(() => {
          this.$vux.toast.hide();
        }, 1000);
      }
    },
    //绘制路线
    drawMap(Tlng,Tlat) { // 专车--画地图
         //构造路线导航类
        if(walking){
          //调用clear()函数清除上一次结果，可以清除地图上绘制的路线以及路径文本结果
            walking.clear();         
        }
        walking = new AMap.Walking({
          map: map,
          hideMarkers: false,
          isOutline: true,
          outlineColor: '#ffeeee',
          autoFitView: true
        });
        walking.search([this.mapCenter[0], this.mapCenter[1]], [Tlng, Tlat], function(status, result) {
           // result即是对应的步行路线数据信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_WalkingResult
            if (status === 'complete') {
                console.log('绘制路线完成')
            } else {
                console.log('获取数据失败：' + result)
            }
        });
    },
    showPath(index) {
      this.roadPath = [];
      this.roadPath = this.SCENICLINE[index].path;
      this.init(this.mapCenter, this.path);
    },
    showModel(name,position) {
      this.clickPosition = {
        name:name,
        lat:position.lat,
        lng:position.lng
      }
      this.$refs.videoWrap.getScenicDetails(this.clickPosition);
    },
    addMarker() {
      let marker = {
        position: []
      };
      this.markers.push(marker);
    }
  },
  computed: {
    setMapHeight() {
      return { height: document.documentElement.clientHeight - 90 + "px" };
    },
    showModelFlag: {
      get: function() {
        return this.$store.state.navigationDetails;
      },
      set: function() {}
    }
  },
  mounted() {
    this.initLocalData();
  }
};
</script>
<style lang="css" scoped>
.amap-demo {
  width: 100%;
  height: 300px;
  margin-top: 50px;
}

.amap-page-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.content-model {
  position: relative;
  z-index: 9999;
}
</style>
