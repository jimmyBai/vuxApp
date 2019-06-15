<template>
  <div>
    <div style="padding:15px;">
      <x-table full-bordered class="full-table-wrap">
        <thead>
          <tr>
            <th colspan="3">积分获取途径</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>项目</td>
            <td>积分</td>
          </tr>
          <tr>
            <td>注册</td>
            <td>30积分</td>
          </tr>
          <tr>
            <td>实名认证</td>
            <td>30积分</td>
          </tr>
          <tr>
            <td>购票</td>
            <td>30积分</td>
          </tr>
          <tr>
            <td>购物</td>
            <td>每10元获1积分</td>
          </tr>
          <tr>
            <td>注册</td>
            <td>30积分</td>
          </tr>
          <tr>
            <td>注册</td>
            <td>30积分</td>
          </tr>
          <tr>
            <td>注册</td>
            <td>30积分</td>
          </tr>
        </tbody>
      </x-table>
    </div>
  </div>
</template>

<script>
import { XTable, LoadMore } from "vux";

export default {
  components: {
    XTable,
    LoadMore
  }
};
</script>
<style lang="css" scoped>
.full-table-wrap {
  width: 100%;
  height: auto;
  background: #fff;
}
</style>
