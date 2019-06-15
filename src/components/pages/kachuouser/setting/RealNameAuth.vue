<template>
  <div class="real-name-auth-wrap">
    <Header
      :titleContent="TitleObjData.titleContent"
      :showLeftBack="TitleObjData.showLeftBack"
      :showRightMore="TitleObjData.showRightMore"
    ></Header>
    <div class="real-name-auth-con" :style="conHei">
      <PopupPicker :dataOpion="dataOpA" v-on:givePickerVal="getPickValA"></PopupPicker>
      <PopupPicker :dataOpion="dataOpB" v-on:givePickerVal="getPickValB"></PopupPicker>
      <PopupPicker :dataOpion="dataOpC" v-on:givePickerVal="getPickValC"></PopupPicker>
      <PopupPicker :dataOpion="dataOpD" v-on:givePickerVal="getPickValD"></PopupPicker>
      <PopupPicker :dataOpion="dataOpE" v-on:givePickerVal="getPickValE"></PopupPicker>
      <p class="id-card-img">身份证正面照片</p>
      <img class="upload-img" v-if="imgUrl" :src="imgUrl" alt srcset>
      <UploadImgOne v-else-if="!imgUrl" v-on:getHeaderImgUrl="getImgVal"></UploadImgOne>
      <div class="btn-wrap">
        <x-button class="sub-btn" type="primary" @click.native="veriFormData">提交</x-button>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/common/Header";
import PopupPicker from "@/components/common/PopupPicker";
import UploadImgOne from "@/components/common/UploadImgOne";
import { XButton } from "vux";

import { getUserRule, AuthSubmit } from "@/servers/api";
import { formData } from "@/assets/js/tools";

export default {
  name: "",
  props: [""],
  data() {
    return {
      TitleObjData: {
        titleContent: "实名认证",
        showLeftBack: true,
        showRightMore: false
      },
      pickValA: [],
      pickValB: [],
      pickValC: [],
      pickValD: [],
      pickValE: [],
      imgUrl: "",
      dataOpA: {
        title: "学历",
        columns: 2,
        data: []
      },
      dataOpB: {
        title: "专业",
        columns: 2,
        data: []
      },
      dataOpC: {
        title: "爱好",
        columns: 2,
        data: []
      },
      dataOpD: {
        title: "信仰",
        columns: 2,
        data: []
      },
      dataOpE: {
        title: "师承",
        columns: 4,
        data: []
      },
      dataListArr: []
    };
  },

  components: {
    Header,
    PopupPicker,
    UploadImgOne,
    XButton
  },

  computed: {
    conHei() {
      return { height: document.documentElement.clientHeight - 45 + "px" };
    }
  },

  beforeMount() {},

  mounted() {
    this.getDataList();
  },

  methods: {
    getImgVal(val) {
      console.log(val);
      this.imgUrl = val;
    },
    getPickValA(val) {
      console.log(val);
      this.pickValA = val;
    },
    getPickValB(val) {
      console.log(val);
      this.pickValB = val;
    },
    getPickValC(val) {
      console.log(val);
      this.pickValC = val;
    },
    getPickValD(val) {
      console.log(val);
      this.pickValD = val;
    },
    getPickValE(val) {
      console.log(val);
      this.pickValE = val;
    },
    getDataList() {
      getUserRule({})
        .then(res => {
          console.log(res);
          if (res.result === 1) {
            let dataResult = formData(res.data.list);
            dataResult.forEach((item, index) => {
              switch (item.name) {
                case "学历":
                  this.dataOpA.data = item.data;
                  break;
                case "专业":
                  this.dataOpB.data = item.data;
                  break;
                case "爱好":
                  this.dataOpC.data = item.data;
                  break;
                case "信仰":
                  this.dataOpD.data = item.data;
                  break;
                case "师承":
                  this.dataOpE.data = item.data;
                  break;
                default:
                  return;
              }
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    showToast(conttentTip) {
      this.$vux.toast.text(conttentTip, "middle");
      setTimeout(() => {
        this.$vux.toast.hide();
      }, 1000);
    },
    veriFormData() {
      if (!this.pickValA.length) {
        this.showToast("请选择学历");
        return;
      } else if (!this.pickValB.length) {
        this.showToast("请选择专业");
        return;
      } else if (!this.pickValC.length) {
        this.showToast("请选择爱好");
        return;
      } else if (!this.pickValD.length) {
        this.showToast("请选择信仰");
        return;
      } else if (!this.pickValE.length) {
        this.showToast("请选择师承");
        return;
      } else if (!this.imgUrl) {
        this.showToast("请上传身份证照片");
        return;
      } else {
        this.submitVal();
      }
    },
    submitVal() {
      this.$vux.loading.show({
        text: "正在提交"
      });
      AuthSubmit({
        type: 3,
        profession_id: this.pickValA[this.pickValA.length - 1],
        education_id: this.pickValB[this.pickValB.length - 1],
        hobby_id: this.pickValC[this.pickValC.length - 1],
        faith_id: this.pickValD[this.pickValD.length - 1],
        teacher_id: this.pickValE[this.pickValE.length - 1],
        card_img: this.imgUrl
      })
        .then(res => {
          console.log(res);
          if(res){
            this.$vux.loading.hide();
            if(res.code === 200){
              
            }
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
.real-name-auth-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.real-name-auth-con {
  width: 100%;
  background: #f9f9f9;
  margin-top: 50px;
  overflow: hidden;
  overflow-y: scroll;
}
.btn-wrap {
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.sub-btn {
  width: 80%;
}
.upload-img {
  width: 94px;
  height: 94px;
  display: inline-block;
  object-fit: cover;
  margin: 0 0 0 20px;
}
.id-card-img {
  width: 100%;
  height: 30px;
  padding: 0 10px;
  box-sizing: border-box;
  line-height: 30px;
  margin-top: 10px;
}
</style>