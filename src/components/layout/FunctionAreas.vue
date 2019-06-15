<!-- 
flex布局功能区域
-->
<template>
  <flexbox :gutter="0" wrap="wrap" class="function-areas-wrap">
    <flexbox-item :span="1/4" v-for="(item,index) in dataList" :key="index">
      <div class="flex-wrap-for" @click="getItem(item.link)">
        <span :class="item.class" style="font"></span>
        <p class="flex-wrap-name">{{item.name}}</p>
      </div>
    </flexbox-item>
  </flexbox>
</template>

<script>
import { Flexbox, FlexboxItem, Divider } from "vux";

export default {
  name: "",
  props: [""],
  data() {
    return {
      dataList: [
        {
          imgUrl:
            "http://f.hiphotos.baidu.com/image/pic/item/359b033b5bb5c9eab0b192c9db39b6003af3b35e.jpg",
          name: "打折门票",
          link: "/ticketsdiscount",
          class: "iconfont iconmenpiao btn1"
        },
        {
          imgUrl:
            "http://f.hiphotos.baidu.com/image/pic/item/359b033b5bb5c9eab0b192c9db39b6003af3b35e.jpg",
          name: "智慧导航",
          link: "/intelligentnavigation",
          class: "iconfont iconzhihuidaohang btn2"
        },
        {
          imgUrl:
            "http://f.hiphotos.baidu.com/image/pic/item/359b033b5bb5c9eab0b192c9db39b6003af3b35e.jpg",
          name: "景区发布",
          link: "/scencerelease",
          class: "iconfont iconjingqufabu"
        },
        {
          imgUrl:
            "http://f.hiphotos.baidu.com/image/pic/item/359b033b5bb5c9eab0b192c9db39b6003af3b35e.jpg",
          name: "景区服务",
          link: "/scenceservice?type=1",
          class: "iconfont iconjingqufuwu"
        },
        {
          imgUrl:
            "http://f.hiphotos.baidu.com/image/pic/item/359b033b5bb5c9eab0b192c9db39b6003af3b35e.jpg",
          name: "记住的",
          link: "/remember?type=5&branch=1",
          class: "iconfont iconjizhude"
        },
        {
          imgUrl:
            "http://f.hiphotos.baidu.com/image/pic/item/359b033b5bb5c9eab0b192c9db39b6003af3b35e.jpg",
          name: "了解的",
          link: "/understand?type=7&branch=2",
          class: "iconfont iconliaojiede"
        },
        {
          imgUrl:
            "http://f.hiphotos.baidu.com/image/pic/item/359b033b5bb5c9eab0b192c9db39b6003af3b35e.jpg",
          name: "带走的",
          link: "/takeaway?carousel=2",
          class: "iconfont icondaizoude"
        },
        {
          imgUrl:
            "http://f.hiphotos.baidu.com/image/pic/item/359b033b5bb5c9eab0b192c9db39b6003af3b35e.jpg",
          name: "周边服务",
          link: "/servicesurround?type=4",
          class: "iconfont iconzhoubianfuwu"
        }
      ]
    };
  },

  components: {
    Flexbox,
    FlexboxItem,
    Divider
  },

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {
    getItem(link) {
      this.$router.push(link);
    }
  },

  watch: {}
};
</script>
<style lang='css' scoped>
.function-areas-wrap{
  background: #fff;
  position: relative;
  z-index: 999;
}
.flex-wrap-for {
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.flex-wrap-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.flex-wrap-name {
  width: 100%;
  height: 20px;
  text-align: center;
  line-height: 20px;
  font-size: 16px;
}
.flex-wrap-for span {
  font-size: 36px;
}
</style>