<template>
  <toast
    v-model="this.$store.state.toastInfo.show"
    :type="this.$store.state.toastInfo.type"
    :time="800"
    is-show-mask
    :text="this.$store.state.toastInfo.text"
    :position="position"
  ></toast>
</template>

<script>
import { Toast} from "vux";
export default {
  components: {
    Toast
  },
  methods: {

  },
  data() {
    return {
      position: "middle",
      showPositionValue:true
    };
  },
  mounted() {

  },
  beforeDestroy() {}
};
</script>