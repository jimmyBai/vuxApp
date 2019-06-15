<template>
  <div class="inline-number-wrap">
    <x-number width="50px" :min="1" :max="999" v-model="changeValue" @on-change="change"></x-number>
  </div>
</template>

<script>
import { Group, Cell, XNumber } from "vux";

export default {
  props:["num"],
  data(){
    return{
      changeValue:1
    }
  },
  components: {
    Group,
    Cell,
    XNumber
  },
  methods:{
        change (val) {
      console.log('change', val)
    }
  }
};
</script>
<style lang="css" scoped>
</style>
