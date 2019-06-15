<template>
  <div class="vux-1px-t">
    <swipeout>
      <swipeout-item
        @on-close="handleEvents('on-close')"
        @on-open="handleEvents('on-open')"
        transition-mode="follow"
        v-for="(item,index) in dataListCon"
        :key="index"
        style="margin-top:10px"
      >
        <div slot="right-menu">
          <swipeout-button @click.native="onButtonClickCol(item.id)" type="primary">取消</swipeout-button>
          <swipeout-button @click.native="onButtonClickDel(item.id,index)" type="warn">删除</swipeout-button>
        </div>
        <div slot="content" class="demo-content vux-1px-t content-wrap">
          <div class="content-left">
            <check-icon :value.sync="checkFlagArr[index]" type="plain"></check-icon>
            <img :src="item.goods_sx.thumb" alt srcset>
          </div>
          <div class="content-mid">
            <p>{{item.goods_sx.title}}</p>
            <p style="font-size:12px;color:#999">{{item.specifications}}</p>
            <p class="inline-number-wrap" style="margin-top:4px">
              <x-number width="40px" style="margin-left:4px" :min="1" :max="99" v-model="countArr[index]"></x-number>
            </p>
          </div>
          <div class="content-right">
            <span>{{item.goods_sx.marketprice}}</span>
          </div>
        </div>
      </swipeout-item>
    </swipeout>
  </div>
</template>

<script>
import {
  GroupTitle,
  Swipeout,
  SwipeoutItem,
  SwipeoutButton,
  XButton,
  XNumber,
  CheckIcon
} from "vux";
import { goodsBucketDelete } from "@/servers/api";
import InLineXNumber from "@/components/common/InLineXNumber";

export default {
  props: ["dataListCon", "countArr","checkFlagArr"],
  components: {
    GroupTitle,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton,
    XButton,
    InLineXNumber,
    XNumber,
    CheckIcon
  },
  mounted() {},
  methods: {
    delGoods(id, index) {
      goodsBucketDelete({
        sid: id
      })
        .then(res => {
          console.log(res);
          if (res.result === 1) {
            this.$vux.toast.show({
              type: "success",
              text: "删除成功",
              time: 1000,
              onHide: () => {
                this.$emit("changeList", index);
              }
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    change(val) {
      console.log("change", val);
    },
    onButtonClickCol(id, type) {
      // this.delGoods(id);
    },
    onButtonClickDel(id, index) {
      this.delGoods(id, index);
    },
    handleEvents(type) {
      // console.log("event: ", type);
    }
  },
  data() {
    return {
      disabled: false,
      changeValue: 1
    };
  },
  updated() {}
};
</script>

<style lang="less">
.demo-content {
  padding: 10px 10px;
}
.content-wrap {
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: row;
}
.content-left {
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.content-left img {
  width: 60px;
  height: 60px;
  display: inline-block;
  object-fit: cover;
}
.content-mid {
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  font-size: 14px;
  padding-left: 10px;
  box-sizing: border-box;
}
.content-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>