<template>
  <div class="tab-bar-wrap">
    <div
      v-for="(item,index) in tabItem"
      :key="index"
      class="tab-bar-item"
      @click="changeTabIndex(index)"
    >
      <span
        :class="item.class"
        style="width:22px;height:22px;display:inline-block;font-size:20px;margin-bottom:2px"
      ></span>
      <span :class="{normal:!item.isActive,active:item.isActive}">{{item.title}}</span>
    </div>
  </div>
</template>

<script>
import { Tabbar, TabbarItem, Group, Cell } from "vux";
import { getUserInfo } from "@/servers/api";
export default {
  name: "",
  props: [""],
  data() {
    return {
      tabItem: [
        {
          title: "游园",
          isActive: true,
          normal: "iconfont iconyouyuan-weixuan",
          class: "iconfont iconyouyuan-yixuan",
          classActive: "iconfont iconyouyuan-yixuan"
        },
        {
          title: "商城",
          isActive: false,
          normal: "iconfont iconshangcheng-weixuan",
          class: "iconfont iconshangcheng-weixuan",
          classActive: "iconfont iconshangcheng-yixuan"
        },
        {
          title: "变现",
          isActive: false,
          normal: "iconfont iconbianxian-weixuan",
          class: "iconfont iconbianxian-weixuan",
          classActive: "iconfont iconbianxian-yixuan"
        },
        {
          title: "创收",
          isActive: false,
          normal: "iconfont iconchuangshou-weixuan",
          class: "iconfont iconchuangshou-weixuan",
          classActive: "iconfont iconchuangshou-yixuan"
        },
        {
          title: "我的",
          isActive: false,
          normal: "iconfont iconwode-weixuan",
          class: "iconfont iconwode-weixuan",
          classActive: "iconfont iconwode-yixuan"
        }
      ],
      tabIndex: 0
    };
  },

  components: {
    Tabbar,
    TabbarItem
  },

  computed: {
    getCurrentTabIndex() {
      return this.$store.state.tabIndex;
    },
    setTabBarClass() {
      return this.$store.state.tabIndex === this.tabIndex
        ? "tab-bar-item-title-normal"
        : "tab-bar-item-title-active";
    }
  },

  beforeMount() {},

  mounted() {
    this.setStoreStateTabIndex();
  },

  methods: {
    // 获取用户信息
    getUserLoginInfo() {
      getUserInfo({})
        .then(res => {
          if (res.result === 1) {
            this.$store.commit("setUserLoginInfo", res.data);
            this.GLOBAL.setSession("userLoginInfo", res.data);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    setStoreStateTabIndex() {
      let indexFlag = this.$store.state.tabIndex;
      for (let i = 0; i < this.tabItem.length; i++) {
        this.tabItem[i].isActive = false;
        this.tabItem[i].class = this.tabItem[i].normal;
      }
      this.tabItem[indexFlag].isActive = true;
      this.tabItem[indexFlag].class = this.tabItem[indexFlag].classActive;
    },
    changeTabIndex(index) {
      this.getUserLoginInfo();
      this.$store.commit("changeTabIndex", index);
      for (let i = 0; i < this.tabItem.length; i++) {
        this.tabItem[i].isActive = false;
        this.tabItem[i].class = this.tabItem[i].normal;
      }
      this.tabItem[index].isActive = true;
      this.tabItem[index].class = this.tabItem[index].classActive;
    }
  },
  computed: {
    stateTabIndex() {
      return this.$store.state.tabIndex;
    }
  },

  watch: {
    stateTabIndex: function(val, oldval){
      this.changeTabIndex(val);
    }
  }
};
</script>
<style lang='css' scoped>
.tab-bar-wrap {
  width: 100%;
  height: 46px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  overflow: hidden;
  padding-top: 2px;
  background: #fff;
  border-top: 1px solid #eee;
  box-sizing: border-box;
  position: relative;
  z-index: 9999;
}
.tab-bar-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.tab-bar-item-img {
  width: 22px;
  height: 22px;
  display: block;
}
.normal {
  font-size: 12px;
  margin-top: 2px;
  color: #999;
}
.active {
  font-size: 12px;
  margin-top: 2px;
  color: #ff2020;
}
</style>