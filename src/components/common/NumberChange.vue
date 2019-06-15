<template>
  <div>
    <group title>
      <x-number title="$t('Quantity')" v-model="changeValue" :min="1" @on-change="change"></x-number>
    </group>
  </div>
</template>

<script>
import { Group, XNumber } from "vux";

export default {
  components: {
    XNumber,
    Group
  },
  data() {
    return {
      changeValue: 0
    };
  },
  methods: {
    change(val) {
      console.log("change", val);
    }
  }
};
</script>