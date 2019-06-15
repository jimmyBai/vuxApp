import Vue from 'vue';
import VueRouter from 'vue-router';

import axios from 'axios';
import qs from 'qs';

import store from '@/store/index';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const baseUrlHeader = "ewei_shopv2_app.php?i=5&c=site&a=entry&m=ewei_shopv2&do=mobile&r=";

const createMarkModel = () => {
  let rootElem = document.getElementById('#app-box');
  let markElem = document.createElement('div');
  markElem.id = 'markSty';
  markElem.style.width = '100%';
  markElem.style.height = '100%';
  markElem.style.background = 'red';
  markElem.style.position = 'absolute';
  markElem.style.top = 0;
  markElem.style.left = 0;
  markElem.style.zIndex = 9999;
  markElem.style.opacity = 0;
  rootElem.appendChild(markElem);
}

const removeMarkModel = () => {
  let idObject = document.getElementById('markSty');
  if (idObject != null) {
    idObject.parentNode.removeChild(idObject);
  }
}
const showTip = (conttentTip, callback) => {
  store.commit("showToastInfo", {
    type: "text",
    text: conttentTip,
    show: true,
    time: 1000
  })
  setTimeout(() => {
    callback ? callback() : ""
  }, 1000)
}
const errTip = (conttentTip) => {
  store.commit("showToastInfo", {
    type: "cancel",
    text: conttentTip,
    show: true
  })
}
const successTip = (conttentTip) => {
  store.commit("showToastInfo", {
    type: "success",
    text: conttentTip,
    show: true
  })
}
// 正式
axios.defaults.baseURL = 'https://core.kachuo.com/app/';
// axios.defaults.baseURL = 'http://39.104.161.131/app';

// 测试
// axios.defaults.baseURL = 'http://www.kcapp.com/app/';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8;text/html;application/json;text/plain';
axios.defaults.headers.post['Authorization'] = localStorage.getItem("token");
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.timeout = 10000;

const http = {
  post: "",
  get: ""
}

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  if (localStorage.getItem("token")) {
    config.headers.Authorization = localStorage.getItem("token");
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // 不同设备登录,刷新token
  if (response.status === 200) {
    if (response.data.code !== 200) {
      if (response.data.code === 10001) {
        localStorage.removeItem("token");
        showTip("请登录", () => {
          window.location.href = ("/");
        })
      } else if (response.data.code === -3) {
        showTip("请重新登录", () => {
          window.location.href = ("/");
        })
      } else {
        // showTip('网络慢，请检查手机网络', () => {
        // });
        return response;
      }
    }
  } else {
    errTip('网络错误，点击屏幕重试');
    document.getElementById('#app-box').onclick = function () {
      window.location.reload();
    }
  }
  return response;
}, function (error) {
  return Promise.reject(error);
  errTip('网络错误，点击屏幕重试');
  document.getElementById('#app-box').onclick = function () {
    window.location.reload();
  }
});

http.post = (url, data) => {
  let params = qs.stringify(data);
  return new Promise((resolve, reject) => {
    // if (window.location.href.indexOf('/mobile') === -1) {
    //   NProgress.start();
    //   createMarkModel();
    // }
    axios({
      headers: {
        Authorization: localStorage.getItem("token")
      },
      method: 'post',
      url: baseUrlHeader + url,
      data: params
    })
      .then((res) => {
        if (res) {
          if (res.data.integral) {
            showTip('奖励' + res.data.integral + '积分');
          }
          removeMarkModel();
          resolve(res.data);
        }
        return res;
      })
      .catch((err) => {
        removeMarkModel();
        reject(err);
        errTip('网络错误，点击屏幕重试');
        document.getElementById('#app-box').onclick = function () {
          window.location.reload();
        }
        return err;
      })
  })
}

http.get = function (url, data) {
  let params = qs.stringify(data);
  return new Promise((resolve, reject) => {
    axios.get(url, params)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      })
  })
}

export default http;
