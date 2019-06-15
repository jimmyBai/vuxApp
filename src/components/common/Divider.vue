<template>
  <div class="divider-wrap">
    <span class="divider-line"></span>
    <span class="divider-content">{{content}}</span>
    <span class="divider-line"></span>
  </div>
</template>

<script>
import { Divider } from "vux";

export default {
  props: {
    content: {
      type: String,
      required: false
    }
  },
  components: {
    Divider
  }
};
</script>

<style lang="css" scoped>
.divider-wrap {
  width: 100%;
  height: 50px;
  padding: 0 30px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: #fff;
  position: relative;
  z-index: 99;

}
.divider-line {
  width: 30px;
  height: 1px;
  background: #000;
  display: inline-block;
}
.divider-content {
  font-weight: bold;
  margin: 0 10px;
}
</style>
