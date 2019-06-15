import Vue from 'vue'
import VueRouter from 'vue-router'
import routesMap from './routesmap/index'
import hooks from './hooks/index'
Vue.use(VueRouter)

const router = new VueRouter({
  root: null,
  hashbang: true,//是否将路径格式化为#!开头
  mode: 'hash',//是否启用HTML5 history模式，可以使用pushState和replaceState来管理记录
  abstract: true,//是否使用一个不依赖于浏览器的浏览历史虚拟管理后端
  saveScrollPosition: true,//在启用html5 history模式的时候生效，用于后退操作的时候记住之前的滚动条位置
  transitionOnLoad: true,//初次加载是否启用场景切换
  linkActiveClass: 'active',//链接被点击时候需要添加到v-link元素上的class类,默认为router-link-active
  routes: routesMap,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
});

VueRouter.prototype.goBack = function () {
  this.isBack = true;
  window.history.go(-1);
}

hooks(router);

export default router;
