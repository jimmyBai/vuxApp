<template>
  <div>
    <group>
      <x-switch title="$t('Array menu')" v-model="show"></x-switch>
    </group>
    <actionsheet v-model="show" :menus="menus" show-cancel @on-click-menu="click"></actionsheet>
  </div>
</template>

<script>
import { Actionsheet, Group, XSwitch } from 'vux'

export default {
  components: {
    Actionsheet,
    Group,
    XSwitch
  },
  data () {
    return {
      show: true,
      menus: [{
        label: 'Share to friends',
        type: 'info'
      }, {
        label: 'Primary',
        type: 'primary',
        value: 'primary',
        otherProp: 'hey'
      }, {
        label: 'Warn',
        type: 'warn'
      }, {
        label: 'Disabled',
        type: 'disabled'
      }, {
        label: 'Default'
      }]
    }
  },
  methods: {
    click (key, item) {
      console.log(key, item)
    }
  }
}
</script>

<style>
.popup0 {
  padding-bottom:15px;
  height:200px;
}
.popup1 {
  width:100%;
  height:100%;
}
</style>