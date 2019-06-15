<template>
  <div class="setting-app-wrap">
    <Header
      :titleContent="TitleObjData.titleContent"
      :showLeftBack="TitleObjData.showLeftBack"
      :showRightMore="TitleObjData.showRightMore"
    ></Header>
    <div class="setting-app-content" :style="conHei">
      <CellNoIcon :cellList="cellListToolsA"></CellNoIcon>
      <!-- <CellNoIcon :cellList="cellLis tToolsB"></CellNoIcon> -->
      <CellNoIcon :cellList="cellListToolsC"></CellNoIcon>
      <CellNoIcon :cellList="cellListToolsD"></CellNoIcon>
      <div class="btn-wrap">
        <x-button class="btn-wrap-sub" type="primary" @click.native="quitAppLogin">退出登录</x-button>
      </div>
    </div>
  </div>
</template>

<script>
import { XButton } from "vux";
import Header from "@/components/common/Header";
import CellNoIcon from "@/components/common/CellNoIcon";
import { GetAuthState } from "@/servers/api";

export default {
  name: "",
  props: [""],
  data() {
    return {
      TitleObjData: {
        titleContent: "设置",
        showLeftBack: true,
        showRightMore: false
      },
      authState: -1,
      cellListToolsA: [
        {
          title: "实名认证",
          link: "/realnameauth",
          badge: true,
          text: "未认证"
        },
        {
          title: "人脸识别",
          link: "/face",
          badge: true,
          text: "未认证"
        },
        {
          title: "用户名",
          link: "",
          badge: false,
          text: "",
          setNickName:true
        }
      ],
      cellListToolsB: [
        {
          title: "二维码",
          link: "/tokenqrcode",
          badge: false,
          text: ""
        }
      ],
      cellListToolsC: [
        {
          title: "收货地址",
          link: "/address",
          badge: false,
          text: ""
        }
      ],
      cellListToolsD: [
        {
          title: "关于我们",
          link: "/aboutus",
          badge: false,
          text: ""
        },
        {
          title: "意见反馈",
          link: "/opinion",
          badge: false,
          text: ""
        }
      ]
    };
  },

  components: {
    Header,
    CellNoIcon,
    XButton
  },

  computed: {
    conHei() {
      return { height: document.documentElement.clientHeight - 45 + "px" };
    }
  },
  created() {},
  beforeMount() {},

  mounted() {
    this.getAuthState();
    this.setFaceState();
  },

  methods: {
    // 设置人脸识别状态
    setFaceState() {
      let flag = JSON.parse(sessionStorage.getItem("userLoginInfo")).discern;
      if (flag) {
        this.$set(this.cellListToolsA, 1, {
          title: "人脸识别",
          link: "",
          badge: true,
          text: "已认证"
        });
      } else {
        this.$set(this.cellListToolsA, 1, {
          title: "人脸识别",
          link: "/face",
          badge: true,
          text: "未认证"
        });
      }
    },
    quitAppLogin() {
      localStorage.removeItem("token");
      this.$store.commit("changeTabIndex", 0);
      this.$router.push("/");
    },
    // 查询实名认证状态
    getAuthState() {
      GetAuthState({})
        .then(res => {
          if (res) {
            console.log(res);
            this.authState = res.data.code;
            if (res.data.code === 0) {
              this.$set(this.cellListToolsA, 0, {
                title: "实名认证",
                link: "/realnameauthstate",
                badge: true,
                text: "审核中"
              });
            } else if (res.data.code === 1) {
              this.$set(this.cellListToolsA, 0, {
                title: "实名认证",
                link: "/realnameauthstate",
                badge: true,
                text: "审核通过"
              });
            } else if (res.data.code === 2) {
              this.$set(this.cellListToolsA, 0, {
                title: "实名认证",
                link: "/realnameauth",
                badge: true,
                text: "审核未通过"
              });
            } else {
              this.$set(this.cellListToolsA, 0, {
                title: "实名认证",
                link: "/realnameauth",
                badge: true,
                text: "未认证"
              });
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
.setting-app-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.setting-app-content {
  width: 100%;
  overflow: hidden;
  overflow-y: scroll;
  margin-top: 50px;
  background: #f9f9f9;
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
.btn-wrap-sub {
  width: 80%;
}
</style>