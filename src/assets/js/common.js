import { AdvertiseLoop, getUpdateInfo } from "@/servers/api";
import store from "@/store/index";
import { checkMobileSystem } from "@/assets/js/tools";
import { SCENICLIST } from "@/assets/data/scenic";

let localVersion = "";
let serverVersion = "";
let isFroceUpdate = null;

// 获取url中的参数
export const getUrlParam = (obj) => {
  return obj.$route.query.id;
}
// 获取广告位轮播图
export const getBannerImg = (type, height) => {
  let imgArr = [];
  AdvertiseLoop({
    type: type
  })
    .then(res => {
      if (res.result === 1) {
        for (let i = 0; i < res.data.data.carousel.length; i++) {
          imgArr.push({
            img: res.data.data.carousel[i]
          })
        }
        store.commit("setCarousel", imgArr);
        sessionStorage.removeItem("carouselTip");
        sessionStorage.setItem("carouselTip", JSON.stringify(res.data.advert));
      }
    })
    .catch(err => {
      console.log(err);
    })
}
// 获取服务器app版本信息
export const serverAPPVersion = () => {
  getUpdateInfo().then(res => {
    if (res.result === 1) {
      console.log(res);
      if(res.data.status === "0"){
        return;
      }
      // android更新版本
      let serverAndroidVersion = Number(res.data.androidUp_edition.replace(/\./mgi,''));
      // ios更新版本
      let serverIosVersion = Number(res.data.iosUp_edition.replace(/\./mgi,''));
      // 是否强制更新
      let isFroceUpdate = parseInt(res.data.up_type, 10) === 1 ? false : true;
      // 如果版本不一致
      if (localVersion < serverAndroidVersion) {
        // 更新android
        store.commit("updateshowActionDialogStatus", true);
        store.commit("getAPPUpdateInfo", { isForce: isFroceUpdate, content: res.data.up_content });
      } else if (localVersion < serverIosVersion) {
        // 更新ios
        store.commit("updateshowActionDialogStatus", true);
        store.commit("getAPPUpdateInfo", { isForce: isFroceUpdate, content: res.data.up_content });
      } else {
        // 不更新
        return;
      }
    }
  })
    .catch(err => {
      console.log(err);
    })
}

// 获取本地app版本更新信息
export const appVersion = () => {
  document.addEventListener("deviceready", onDeviceReady, false);
  function onDeviceReady() {
    cordova.getAppVersion.getVersionNumber().then(function (version) {
      // 存储本地版本
      localVersion = Number(version.replace(/\./mgi,''));
      // 获取服务器版本
      serverAPPVersion();
    });
  }
}

// 强制更新app提示
export const forceUpdateAPPConfirm = (desc, type) => {
  this.$vux.confirm.show({
    title: '提示',
    content: desc,
    showCancelButton: false,
    onConfirm() {
      if (type === 'ios') {
        window.open("https://itunes.apple.com/cn/app/id1437706521?mt=8");
      } else {
        window.open("http://www.kachuo.com/wap/");
      }
    }
  })
}

// 不强制更新app提示
export const updateAPPConfirm = (desc, type) => {
  this.$vux.confirm.show({
    title: '提示',
    content: desc,
    onCancel: () => {
      return;
    },
    onConfirm: () => {
      if (type === 'ios') {
        window.open("https://itunes.apple.com/cn/app/id1437706521?mt=8");
      } else {
        window.open("http://www.kachuo.com/wap/");
      }
    }
  })
}

// 更新app
export const updateAPPVersion = (con, type) => {
  let systemInfo = checkMobileSystem();
  if (systemInfo === 'ios') {
    window.open("https://itunes.apple.com/cn/app/id1437706521?mt=8");
  } else {
    window.open("http://www.kachuo.com/wap/");
  }
}

// 根据景区id返回景区名称
export const getScenicNameByScenicId = (id) => {
  switch (id) {
    case "22":
      return "苍岩山";
      break;
    case "23":
      return "徽州";
      break;
    case "24":
      return "蓬莱阁";
      break;
    case "25":
      return "少林寺";
      break;
    case "26":
      return "神垕";
      break;
    case "27":
      return "云雾山";
      break;
    case "35":
      return "三孔";
      break;
    case "66":
      return "云冈";
      break;
    default:
      return "蓬莱阁";
      break;
  }
}

// 根据景区id返回景区管理处电话
export const getScenicPhoneByScenicId = (id) => {
  for (let i = 0; i < SCENICLIST.length; i++) {
    if (SCENICLIST[i].id === id) {
      return SCENICLIST[i].tel;
    }
  }
}