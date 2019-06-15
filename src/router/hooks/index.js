import store from "@/store/index";
export default (router) => {
  router.beforeEach(function (to, from, next) {
    // store.commit('updateLoadingStatus', {isLoading: true});
    next();
  })
  router.afterEach(function (router) {
    // store.commit('updateLoadingStatus', {isLoading: false});
  })
}