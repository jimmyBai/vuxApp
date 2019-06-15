<template>
  <div class="back-lease-sale-wrap">
    <Header
      :titleContent="TitleObjData.titleContent"
      :showLeftBack="TitleObjData.showLeftBack"
      :showRightMore="TitleObjData.showRightMore"
    ></Header>
    <div class="back-lease-sale-content-wrap" :style="scrollContentHeight">
      <div class="acvity-wrap">
        <p class="acvity-wrap-flex-title">活动商品</p>
        <div class="acvity-wrap-flex">
          <div v-for="(item,index) in goodsList" :key="index" class="goods-list-for">
            <img class="acvity-wrap-flex-img" :src="item.img" alt>
            <p class="font-size-12">{{item.name}}</p>
          </div>
        </div>
      </div>
      <div class="acvity-buy-wrap">
        <p class="acvity-wrap-flex-title">已购商品</p>
        <div class="acvity-wrap-flex">
          <div v-for="(item,index) in resultList" :key="index" class="goods-list-for">
            <img class="acvity-wrap-flex-img" :src="item.img" alt>
            <p class="font-size-12">{{item.name}}</p>
          </div>
        </div>
      </div>
      <p class="acvity-wrap-flex-title tip">提示：集齐{{goodsList.length}}件才可以申请回购哦～</p>
      <x-button class="sub-btn" type="primary" @click.native="submitData">立即申请</x-button>
    </div>
  </div>
</template>

<script>
import Header from "@/components/common/Header";
import { XButton } from "vux";
import { buyBackSubmit } from "@/servers/api";
export default {
  name: "",
  props: [""],
  data() {
    return {
      TitleObjData: {
        titleContent: "申请回购",
        showLeftBack: true,
        showRightMore: false
      },
      dataObj: {},
      goodsList: [],
      resultList: []
    };
  },

  components: {
    Header,
    XButton
  },

  computed: {
    scrollContentHeight() {
      return { height: document.documentElement.clientHeight - 45 + "px" };
    }
  },

  beforeMount() {},

  mounted() {
    this.getData();
  },

  methods: {
    submitData() {
      if (this.goodsList.length != this.resultList.length) {
        this.$vux.toast.show({
          type: "warn",
          text: "不能申请回购",
          time: 1000
        });
        return;
      } else {
        buyBackSubmit({
          id: this.dataObj.id
        })
          .then(res => {
            console.log(res);
            if (res.result === 1) {
              this.$vux.toast.show({
                type: "success",
                text: "申请已提交",
                time: 1000
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    getData() {
      this.dataObj = JSON.parse(sessionStorage.getItem("backbuydetailsitem"));
      if (this.dataObj.goods_arr.goods_id.length) {
        for (let i = 0; i < this.dataObj.goods_arr.goods_id.length; i++) {
          this.goodsList.push({
            id: this.dataObj.goods_arr.goods_id[i],
            name: this.dataObj.goods_arr.title[i],
            img: this.dataObj.goods_arr.thumb[i]
          });
        }
      }

      if (this.dataObj.order_result.goods_id) {
        for (let i = 0; i < this.dataObj.order_result.goods_id.length; i++) {
          this.resultList.push({
            id: this.dataObj.order_result.goods_id[i],
            name: this.dataObj.order_result.title[i],
            img: this.dataObj.order_result.thumb[i]
          });
        }
      }
    }
  },

  watch: {}
};
</script>
<style lang='css' scoped>
.back-lease-sale-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.back-lease-sale-content-wrap {
  width: 100%;
  margin-top: 50px;
  overflow-y: scroll;
}
.font-size-12 {
  font-size: 12px;
  width: 100%;
  text-align: center;
}
.scence-release-content {
  margin-top: 300px;
}
.acvity-wrap-flex {
  width: 100%;
  height: auto;
  padding: 0 15px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.acvity-wrap-flex-img {
  width: 50px;
  height: 50px;
  display: inline-block;
}
.acvity-wrap-flex-title {
  width: 100%;
  height: 40px;
  line-height: 40px;
  padding-left: 15px;
  border-bottom: 1px solid #eee;
}
.goods-list-for {
  width: 70px;
  height: 110px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #eee;
  margin: 6px;
  background: #f5f5f5;
}
.sub-btn {
  width: 80%;
  margin-top: 30px;
}
.tip {
  color: #ff9000;
}
</style>