<template>
  <group>
    <popup-picker
      :title="dataOpion.title"
      :data="dataOpion.data"
      :columns="dataOpion.columns"
      v-model="value"
      show-name
      @on-change="onChange"
      @on-shadow-change="onShadowChange"
      @on-hide="onHide"
    ></popup-picker>
  </group>
</template>

<script>
import { PopupPicker, Group } from "vux";

export default {
  props: ["dataOpion"],
  components: {
    PopupPicker,
    Group
  },
  methods: {
    onHide(type) {
      // console.log("on hide", type);
    },
    onChange(val) {
      // console.log("val change", val);
      this.$emit("givePickerVal",val);
    },
    onShadowChange(Arrayids, Arraynames) {
      // console.log("val change", Arrayids, Arraynames);
    }
  },
  data() {
    return {
      value: []
    };
  }
};
</script>

<style scoped>
.picker-buttons {
  margin: 0 15px;
}
</style>