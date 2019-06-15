<template>
  <div class="real-name-auth-state-wrap">
    <Header
      :titleContent="TitleObjData.titleContent"
      :showLeftBack="TitleObjData.showLeftBack"
      :showRightMore="TitleObjData.showRightMore"
    ></Header>
    <div class="real-name-auth-content" :style="realCon">
      <group>
        <cell title="当前状态" :value="authState"></cell>
        <cell-form-preview :list="list"></cell-form-preview>
      </group>
    </div>
  </div>
</template>

<script>
import Header from "@/components/common/Header";
import { CellFormPreview, Group, Cell } from "vux";
import { GetAuthState } from "@/servers/api";

export default {
  name: "",
  props: [""],
  data() {
    return {
      TitleObjData: {
        titleContent: "认证状态",
        showLeftBack: true,
        showRightMore: false
      },
      authState: "",
      list: []
    };
  },

  components: {
    Header,
    CellFormPreview,
    Group,
    Cell
  },

  computed: {
    realCon() {
      return { height: document.documentElement.clientHeight - 45 + "px" };
    }
  },

  beforeMount() {},

  mounted() {
    this.getAuthState();
  },

  methods: {
    // 设置通过状态
    checkStateTextfn(code) {
      if (code === 0) {
        return "审核中";
      } else if (code === 1) {
        return "审核通过";
      } else if (code === 2) {
        return "审核未通过";
      } else {
        return "";
      }
    },
    // 查询实名认证状态
    getAuthState() {
      GetAuthState({})
        .then(res => {
          if (res) {
            this.authState = this.checkStateTextfn(res.data.code);
            this.list.push({
              label: "姓名",
              value: res.data.data.name
            });
            this.list.push({
              label: "性别",
              value: res.data.data.gender
            });
            this.list.push({
              label: "民族",
              value: res.data.data.nation
            });
            this.list.push({
              label: "所在地",
              value: res.data.data.address
            });
            this.list.push({
              label: "出生日期",
              value: res.data.data.birthday
            });
            this.list.push({
              label: "学历",
              value: res.data.data.education
            });
            this.list.push({
              label: "专业",
              value: res.data.data.profession
            });
            this.list.push({
              label: "爱好",
              value: res.data.data.hobby
            });
            this.list.push({
              label: "师承",
              value: res.data.data.teacher
            });
            this.list.push({
              label: "信仰",
              value: res.data.data.faith
            });
            this.list.push({
              label: "手机号",
              value: res.data.data.mobile
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
.real-name-auth-state-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.real-name-auth-content {
  width: 100%;
  background: #f9f9f9;
  margin-top: 50px;
  overflow: hidden;
  overflow-y: scroll;
}
</style>