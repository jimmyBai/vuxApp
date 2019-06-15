<template>
  <div class="search-button-wrap">
    <!-- <div class="search-button">中文/拼音/首字母</div> -->

  </div>
</template>

<script>

  export default {
    name:'',
    props:[''],
    data () {
      return {

      };
    },

    components: {},

    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {},

    watch: {}

  }

</script>
<style lang='css' scoped>
.search-button-wrap{
  width: 100%;
  height: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: #fff;
  margin-top: 45px;
}
.search-button{
  width: 80%;
  height: 26px;
  text-align: left;
  line-height: 26px;
  background: #eee;
  border-radius: 30px;
  color: #999;
  padding: 0 10px;
  font-size: 12px;
  box-sizing: border-box;
}
</style>