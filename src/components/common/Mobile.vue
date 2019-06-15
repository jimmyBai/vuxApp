<template>
  <div>

    <group title>
      <x-input
        title="手机号"
        mask="999 9999 9999"
        placeholder
        novalidate
        :icon-type="iconType"
        :show-clear="false"
        @on-blur="onBlur"
        placeholder-align="right"
        :min="11"
        :max="11"
        class="weui-vcode"
      >
        <x-button slot="right" type="primary" mini>发送验证码</x-button>
      </x-input>
      <x-input title="验证码"></x-input>
    </group>
  </div>
</template>

<script>
import { XInput, Group, XButton, Cell } from "vux";

export default {
  components: {
    XInput,
    XButton,
    Group,
    Cell
  },
  data() {
    return {
      password: "123465",
      password2: "",
      enterText: "",
      valid1: false,
      valid2: false,
      iconType: "",
      be2333: function(value) {
        return {
          valid: value === "2333",
          msg: "Must be 2333"
        };
      },
      style: "",
      disabledValue: "hello",
      debounceValue: "",
      maxValue: "",
      maskValue: "13545678910",
      maskValue2: ""
    };
  },
  methods: {
    getValid1() {
      this.valid1 = this.$refs.input01.valid;
    },
    getValid2() {
      this.valid2 = this.$refs.input02.valid;
    },
    change(val) {
      console.log("on change", val);
    },
    onBlur(val) {
      console.log("on blur", val);
    },
    onFocus(val, $event) {
      console.log("on focus", val, $event);
    },
    onEnter(val) {
      console.log("click enter!", val);
    }
  }
};
</script>
<style scoped>
.red {
  color: red;
}
.green {
  color: green;
}
</style>