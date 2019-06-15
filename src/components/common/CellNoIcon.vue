<template>
  <group>
    <cell
      v-for="(item,index) in cellList"
      :key="index"
      :title="item.title"
      is-link
      :link="item.link"
      @click.native="onClick(item.setNickName)"
    >
      <Badge v-show="item.badge" :text="item.text"></Badge>
    </cell>
  </group>
</template>

<script>
import { Cell, Group, Badge } from "vux";
import { setNickName } from "@/servers/api";
export default {
  props: ["cellList"],
  mounted() {
    setTimeout(() => {
      this.money = -1024;
    }, 2000);
  },
  components: {
    Group,
    Cell,
    Badge
  },
  methods: {
    updateNickName(name) {
      let userinfo = JSON.parse(sessionStorage.getItem("userLoginInfo"));
      userinfo.nickname = name;
      this.$store.commit("updateUserNickName", name);
      sessionStorage.removeItem("userLoginInfo");
      sessionStorage.setItem("userLoginInfo", JSON.stringify(userinfo));
      this.$router.goBack();
    },
    setNickNameFn(val) {
      setNickName({
        nickname: val
      })
        .then(res => {
          if (res.result === 1) {
            this.$vux.toast.show({
              type: "success",
              text: "设置成功",
              time: 1000,
              onHide: () => {
                this.updateNickName(val);
              }
            });
          } else {
            this.$vux.toast.show({
              type: "warn",
              text: "失败请重试",
              time: 1000
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    onClick(flag) {
      if (flag) {
        this.$vux.confirm.prompt("", {
          title: "设置用户名",
          showInput: true,
          onConfirm: val => {
            if (val) {
              this.setNickNameFn(val);
            }
          },
          onCancel: () => {}
        });
      }
    }
  },
  data() {
    return {
      list: [
        {
          label: "Apple",
          value: "3.29"
        },
        {
          label: "Banana",
          value: "1.04"
        },
        {
          label: "Fish",
          value: "8.00"
        }
      ],
      money: null,
      showContent001: false,
      showContent002: false,
      showContent003: false,
      showContent004: false
    };
  }
};
</script>

<style scoped>
.sub-item {
  color: #888;
}
.slide {
  padding: 0 20px;
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.5s cubic-bezier(0, 1, 0, 1) -0.1s;
}
.animate {
  max-height: 9999px;
  transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
  transition-delay: 0s;
}
</style>