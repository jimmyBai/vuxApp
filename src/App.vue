<!--
 * @Description: 
 * @Author: lpb
 * @Github: https://github.com/lpb273
 * @LastEditors: lpb
 * @Date: 2019-02-27 08:56:16
 * @LastEditTime: 2019-05-06 08:52:55
 -->
<template>
  <div id="#app-box" class="app-box">
    <transition :name="transitionName">
      <navigation>
        <router-view class="router-animate"/>
      </navigation>
    </transition>
    <loading v-model="isLoading"></loading>
    <confirm
      v-model="showModel"
      title="版本更新"
      :show-cancel-button="isForceUpdata"
      @on-cancel="onCancel"
      @on-confirm="onConfirm"
    >
      <p style="text-align:center;">{{modelContent}}</p>
    </confirm>
    <toast
      v-model="showToastFn.show"
      position="middle"
      is-show-mask
      :type="showToastFn.type"
      :text="showToastFn.text"
      :time="showToastFn.time"
    ></toast>
  </div>
</template>

<script>
import { vueCordovaFunction } from "@/assets/js/vuecordova";
import { Loading, Confirm, Toast } from "vux";
import { CheckByLocation } from "@/servers/api";
import { appVersion, updateAPPVersion } from "@/assets/js/common";
export default {
  name: "App",
  data() {
    return {
      transitionName: "slide-right"
    };
  },
  components: {
    Loading,
    Confirm,
    Toast
  },
  mounted() {
    vueCordovaFunction.getLocation();
    this.checkUserLocationInfo();
    appVersion();
    sessionStorage.setItem("closeFace", 0);
  },
  beforeRouteUpdate(to, from, next) {
    next(vm => {
      console.log(vm);
    });
  },
  computed: {
    showToastFn() {
      return this.$store.state.toastInfo;
    },
    isLoading() {
      return this.$store.state.isLoading;
    },
    showModel: {
      get: function() {
        return this.$store.state.showActionDialog;
      },
      set: function() {}
    },
    isForceUpdata: {
      get: function() {
        return this.$store.state.appUpdateInfo.isForce;
      }
    },
    modelContent: {
      get: function() {
        return this.$store.state.appUpdateInfo.content;
      }
    }
  },
  methods: {
    onCancel() {},
    onConfirm() {
      updateAPPVersion();
    },
    postLocation(dataObj) {
      let postDataObj = {
        latitude: dataObj ? dataObj.Latitude : "",
        longitude: dataObj ? dataObj.Longitude : ""
      };
      CheckByLocation(postDataObj)
        .then(res => {
          if (res.result === 1) {
            sessionStorage.setItem("currentScenic", res.data.scenic_id);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    checkUserLocationInfo() {
      let dataObj = sessionStorage.getItem("positionInfo")
        ? sessionStorage.getItem("positionInfo")
        : "";
      if (dataObj === "") {
        vueCordovaFunction.getLocation();
        return;
      } else {
        this.postLocation(JSON.parse(sessionStorage.getItem("positionInfo")));
      }
    }
  },
  watch: {
    $route(to, from) {
      let isBack = this.$router.isBack;
      if (isBack) {
        this.transitionName = "slide-right";
      } else {
        this.transitionName = "slide-left";
      }
      this.$router.isBack = false;
    }
  }
};
</script>

<style lang="less">
@import "~vux/src/styles/reset.less";
.app-box {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.router-animate {
  position: absolute;
  width: 100%;
  transition: all 0.4s ease;
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0.5;
  -webkit-transform: translate(-100%, 0);
  transform: translate(-100% 0);
}
</style>
