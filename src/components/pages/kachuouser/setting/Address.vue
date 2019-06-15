<template>
  <div class="address-wrap">
    <Header
      :titleContent="TitleObjData.titleContent"
      :showLeftBack="TitleObjData.showLeftBack"
      :showRightMore="TitleObjData.showRightMore"
    ></Header>
    <div class="address-con" :style="conHei">
      <CheckList v-on:getSetVal="setDefAdd"></CheckList>
      <div class="btn-wrap">
        <x-button class="btn" type="primary" @click.native="addNewAddress">添加新地址</x-button>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/common/Header";
import CheckList from "@/components/common/CheckList";
import { setDefaultAddr } from "@/servers/api";
import { XButton } from "vux";

export default {
  name: "",
  props: [""],
  data() {
    return {
      TitleObjData: {
        titleContent: "收获地址",
        showLeftBack: true,
        showRightMore: false
      }
    };
  },

  components: {
    Header,
    CheckList,
    XButton
  },

  computed: {
    conHei() {
      return { height: document.documentElement.clientHeight - 45 + "px" };
    }
  },

  beforeMount() {},

  mounted() {},

  methods: {
    addNewAddress() {
      this.$router.push("/addnewaddress");
    },
    setDefAdd(val) {
      this.setDefaultAddress(val);
    },
    setDefaultAddress(val) {
      setDefaultAddr({
        id: val[0]
      })
        .then(res => {
          if (res.result === 1) {
            this.$vux.toast.show({
              type: "success",
              text: "设置成功",
              time: 1000,
              isShowMask: true
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },

  watch: {}
};
</script>
<style lang='css' scoped>
.address-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.address-con {
  width: 100%;
  background: #f9f9f9;
  margin-top: 50px;
  overflow: hidden;
  overflow-y: scroll;
  padding-bottom: 50px;
  box-sizing: border-box;
}
.btn-wrap {
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
}
.btn {
  width: 80%;
}
</style>