<template>
  <div style="text-align:center;margin-top:15px;">
    <qrcode :value="QRvalue" :size="size"></qrcode>
    <br>
  </div>
</template>

<script>
import { Qrcode } from 'vux'

export default {
  props:["QRvalue"],
  mounted () {

  },
  components: {
    Qrcode
  },
  data () {
    return {
      value: '',
      fgColor: '#000000',
      size:200
    }
  }
}
</script>