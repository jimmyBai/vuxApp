<template>
    <group class="cell-no-border" style="border:none;">
      <cell class="cell-sty" :title="item.title" is-link :link="item.link" v-for="(item,index) in cellList" :key="index">
        <span slot="icon" class="img-sty" :class="item.icon" ></span>
        <badge :text="item.badgeText" v-show="item.showBadge"></badge>      
      </cell>
    </group>
</template>

<script>
import { Cell, Group,Badge } from "vux";

export default {
  props: {
    cellList: {
      type: Array,
      required: true
    }
  },
  mounted() {},
  components: {
    Group,
    Cell,
    Badge
  },
  methods: {
    onClick() {
      console.log("on click");
    }
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
.img-sty {
  width: 30px;
  height: 30px;
  display: inline-block;
  margin-right: 6px;
  font-size: 24px;
}
</style>