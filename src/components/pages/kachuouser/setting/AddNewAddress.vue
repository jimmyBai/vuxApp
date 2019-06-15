<template>
  <div class="add-address-wrap">
    <Header
      :titleContent="TitleObjData.titleContent"
      :showLeftBack="TitleObjData.showLeftBack"
      :showRightMore="TitleObjData.showRightMore"
    ></Header>
    <div class="add-address-con" :style="conHei">
      <group title style="margin-top:10px">
        <x-input title="姓名" v-model="maskValueName" :max="10" is-type :show-clear="false"></x-input>
        <x-input title="手机号" v-model="maskValuePhone" :max="11" is-type :show-clear="false"></x-input>
        <Address
          style="height:44px;line-height:24px;font-size:17px"
          v-on:selectAddress="getSelAddress"
        ></Address>
        <x-input title="详细地址" v-model="maskValueDetails" :max="11" is-type :show-clear="false"></x-input>
      </group>
      <div class="add-btn-wrap">
        <x-button class="add-btn" type="primary" @click.native="formateData">添加</x-button>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/common/Header";
import Address from "@/components/common/Address";
import CheckList from "@/components/common/CheckList";
import { updateAddress } from "@/servers/api";
import { XButton, XInput, Group } from "vux";

export default {
  name: "",
  props: [""],
  data() {
    return {
      TitleObjData: {
        titleContent: "添加地址",
        showLeftBack: true,
        showRightMore: false
      },
      maskValueName: "",
      maskValuePhone: "",
      maskValueDetails: "",
      maskValueAddress: []
    };
  },

  components: {
    Header,
    CheckList,
    XButton,
    XInput,
    Group,
    Address
  },

  computed: {
    conHei() {
      return { height: document.documentElement.clientHeight - 45 + "px" };
    }
  },

  beforeMount() {},

  mounted() {},

  methods: {
    formateData() {
      if (!this.maskValueName) {
        this.showTip("请输入收货人姓名");
        return;
      } else if (!this.maskValuePhone) {
        this.showTip("请输入收货人手机号");
        return;
      } else if (!this.maskValueAddress.length) {
        this.showTip("请选择地区");
        return;
      } else if (!this.maskValueDetails) {
        this.showTip("请输入详细地址");
        return;
      } else {
        this.updateAddressData();
      }
    },
    updateAddressData() {
      updateAddress({
        tel: this.maskValuePhone,
        realname: this.maskValueName,
        mobile: this.maskValuePhone,
        province: this.maskValueAddress[0],
        city: this.maskValueAddress[1],
        area: this.maskValueAddress[2],
        address: this.maskValueDetails
      })
        .then(res => {
          console.log(res);
          if (res.result === 1) {
            this.$vux.toast.show({
              type: "success",
              text: "添加成功",
              time: 1000,
              isShowMask: true,
              onHide: () => {
                this.$router.goBack();
              }
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getSelAddress(val) {
      this.maskValueAddress = val;
    },
    showTip(conttentTip) {
      this.$vux.toast.text(conttentTip, "middle");
      setTimeout(() => {
        this.$vux.toast.hide();
      }, 1000);
    }
  },

  watch: {}
};
</script>
<style lang='css' scoped>
.add-address-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.add-address-con {
  width: 100%;
  background: #f9f9f9;
  margin-top: 50px;
  overflow: hidden;
  overflow-y: scroll;
}
.add-btn-wrap {
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 120px;
}
.add-btn {
  width: 80%;
}
</style>