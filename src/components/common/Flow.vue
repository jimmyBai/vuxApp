<template>
  <ul class="express-info-wrap">
    <li
      v-for="(item,index) in expressData"
      :key="index"
      :state="index"
      :title="item.context"
      is-done
    >
      <p class="express-info-for">
        <span>
          <span class="express-info-dot"></span>
          {{item.context}}/{{item.time}}
        </span>
      </p>
    </li>
  </ul>
</template>

<script>
import { getUrlParam } from "@/assets/js/common";
import { orderExpressInfo } from "@/servers/api";

export default {
  components: {},
  data() {
    return {
      expressData: []
    };
  },
  mounted() {
    this.getExpressInfo();
  },
  methods: {
    getExpressInfo() {
      orderExpressInfo({
        // g_order: getUrlParam(this),
        g_order: "SH2018110814292951118"
      })
        .then(res => {
          console.log(res.data.data.data);
          if (res.result === 1) {
            this.expressData = res.data.data.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getParmas() {
      getUrlParam();
    }
  }
};
</script>
<style lang="css" scoped>
.express-info-wrap {
  padding: 15px;
  box-sizing: border-box;
}
.express-info-dot {
  width: 6px;
  height: 6px;
  display: inline-block;
  background: #222;
  border-radius: 50%;
  margin-right: 4px;
}
.express-info-for {
  width: 100%;
  height: 50px;
  word-break: break-all;
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
