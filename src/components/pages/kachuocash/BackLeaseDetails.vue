<template>
  <div class="back-lease-details-wrap">
    <Header
      :titleContent="TitleObjData.titleContent"
      :showLeftBack="TitleObjData.showLeftBack"
      :showRightMore="TitleObjData.showRightMore"
    ></Header>
    <div class="back-lease-details-content" :style="conHeight">
      <div class="back-lease-details-content-top">
        <img :src="goodsData.thumb" alt srcset>
        <p class="goods-name">{{goodsData.goods_name}}</p>
      </div>
      <div class="divider-area"></div>
      <div class="price-desc-wrap">
        <p class="price-title blod-font-size">价格说明</p>
        <p class="price-desc">{{goodsData.rent}}/天</p>
        <p class="price-desc">{{goodsData.m_rent}}/月</p>
        <p class="price-desc" style="border:none">{{goodsData.y_rent}}/年</p>
      </div>
      <div class="divider-area"></div>
      <div class="price-desc-wrap price-desc-wrap-date price-desc-wrap-spec">
        <p class="price-title blod-font-size">选择租赁时间</p>
        <group>
          <calendar
            :readonly="readonly"
            v-model="dataBegin"
            title="起始时间"
            disable-past
            show-popup-header
            placeholder
          ></calendar>
        </group>
        <group>
          <calendar
            :readonly="readonly"
            v-model="dataEnd"
            title="截止时间"
            disable-past
            show-popup-header
            placeholder
          ></calendar>
        </group>
      </div>
      <div class="divider-area"></div>
      <p class="goods-details-desc blod-font-size">商品详情</p>
      <div v-html="goodsData.content"></div>
    </div>
    <x-button class="btn-style" type="primary" @click.native="getLeaseTime">我要租赁</x-button>
  </div>
</template>

<script>
import { LeasetList } from "@/servers/api";
import Header from "@/components/common/Header";
import DividerArea from "@/components/common/DividedArea";
import { Calendar, Group, XButton } from "vux";
import { computedDataInterval } from "@/assets/js/tools";
export default {
  name: "",
  props: [""],
  data() {
    return {
      TitleObjData: {
        titleContent: "租赁",
        showLeftBack: true,
        showRightMore: false
      },
      goodsData: {},
      readonly: false,
      dataBegin: "",
      dataEnd: ""
    };
  },

  components: {
    Header,
    DividerArea,
    Calendar,
    Group,
    XButton
  },

  computed: {
    conHeight() {
      return { height: document.documentElement.clientHeight - 45 + "px" };
    }
  },

  beforeMount() {},

  mounted() {
    this.getGoodsDetails();
  },

  methods: {
    computedPrice(dateTime) {
      let yearPrice =
        parseInt(dateTime / 360, 10) * parseInt(this.goodsData.y_rent, 10);
      let monthPrice =
        parseInt((dateTime % 360) / 30, 10) *
        parseInt(this.goodsData.m_rent, 10);
      let dayPrice =
        parseInt((dateTime % 360) % 30, 10) * parseInt(this.goodsData.rent, 10);
      return yearPrice + monthPrice + dayPrice;
    },
    getGoodsDetails() {
      this.goodsData = JSON.parse(sessionStorage.getItem("backleasedetails"));
      console.log(this.goodsData);
    },
    getLeaseTime() {
      if (!this.dataBegin) {
        this.$vux.toast.show({
          type: "text",
          text: "选择起始时间",
          time: 1000
        });
      } else if (!this.dataEnd) {
        this.$vux.toast.show({
          type: "text",
          text: "选择截止时间",
          time: 1000
        });
      } else {
        let dateTime = computedDataInterval(this.dataBegin, this.dataEnd);
        let price = this.computedPrice(dateTime);
        let con = `您当前选择：${parseInt(dateTime / 360, 10)}年${parseInt(
          (dateTime % 360) / 30,
          10
        )}月${parseInt((dateTime % 360) % 30, 10)}天,共${price}元`;
        this.$vux.confirm.show({
          title: "提示",
          content: con,
          onCancel: () => {
          },
          onConfirm: () => {
            this.$router.push("/confirmorder?id=" + this.goodsData.goods + "&price="+price);
          }
        });
      }
    }
  },
  updated() {},
  watch: {}
};
</script>
<style lang='css' scoped>
.back-lease-details-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.blod-font-size {
  font-weight: bold;
  font-size: 16px;
}
.back-lease-details-content {
  width: 100%;
  margin-top: 45px;
  overflow: hidden;
  overflow-y: scroll;
  padding-bottom: 42px;
  box-sizing: border-box;
}
.back-lease-details-content-top {
  width: 100%;
  height: 200px;
  padding: 15px 50px 25px 50px;
  box-sizing: border-box;
}
.back-lease-details-content-top img {
  width: 100%;
  height: 150px;
  display: inline-block;
}
.goods-name {
  width: 100%;
  height: 30px;
  text-align: center;
  line-height: 30px;
}
.price-desc-wrap {
  width: 100%;
  height: 160px;
}
.price-desc {
  width: 100%;
  height: 40px;
  line-height: 40px;
  padding: 0 15px;
  box-sizing: border-box;
  border-bottom: 1px solid #eee;
}
.price-title {
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
}
.divider-area {
  width: 100%;
  height: 10px;
  background: #f5f5f5;
}
.price-desc-wrap-date {
  padding: 0;
}
.goods-details-desc {
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
}
.price-desc-wrap-spec {
  height: 126px;
}
.btn-style {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  border-radius: 0;
}
</style>