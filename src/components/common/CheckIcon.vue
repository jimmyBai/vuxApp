<template>
  <check-icon :value.sync="checkFlag" type="plain"></check-icon>
</template>

<script>
import { CheckIcon } from 'vux'

export default {
  props:["checkFlag"],
  components: {
    CheckIcon
  },
  data () {
    return {
      check:false
    }
  }
}
</script>