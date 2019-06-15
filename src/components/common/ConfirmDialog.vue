<template>
  <div>
    <div style="padding:15px;">
      <x-button @click.native="showPlugin" type="primary">Show</x-button>
    </div>
  </div>
</template>

<script>
import { Confirm, Group, XSwitch, XButton,ConfirmPlugin, TransferDomDirective as TransferDom } from 'vux'
export default {
  directives: {
    TransferDom
  },
  components: {
    Confirm,
    XButton
  },
  data () {
    return {
      show: true,
      show2: false,
      show3: false,
      show4: false,
      show5: false,
      show6: false
    }
  },
  methods: {
    showPlugin () {
      this.$vux.confirm.show({
        title: '提示',
        content: '内容',
        onShow () {
          console.log('plugin show')
        },
        onHide () {
          console.log('plugin hide')
        },
        onCancel () {
          console.log('plugin cancel')
        },
        onConfirm () {
          console.log('plugin confirm')
        }
      })
    }
  },
  mounted () {
  },
  beforeDestroy () {
  }
}
</script>