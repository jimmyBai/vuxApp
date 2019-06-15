<template>
  <div>
    <search
      @result-click="resultClick"
      @on-change="getResult"
      :results="results"
      v-model="value"
      position="absolute"
      @on-focus="onFocus"
      @on-cancel="onCancel"
      @on-submit="onSubmit"
      ref="search"
      :placeholder="placeHolder"
      auto-scroll-to-top
    ></search>
  </div>
</template>

<script>
import { Search, Group, Cell, XButton } from "vux";
import { SearchGoodsList } from "@/servers/api";
export default {
  props: ["placeHolder"],
  components: {
    Search,
    Group,
    Cell,
    XButton
  },
  data() {
    return {
      results: [],
      value: ""
    };
  },
  methods: {
    searchPost(name) {
      let arrList = [];
      SearchGoodsList({
        name: name
      })
        .then(res => {
          if (res.result === 1) {
            if (res.data.list.length) {
              res.data.list.forEach(element => {
                arrList.push({
                  title:element.title,
                  otherData:element.subtitle,
                  id:element.id
                });
              });
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
      this.results = arrList;
    },
    setFocus() {
      this.$refs.search.setFocus();
    },
    resultClick(item) {
      this.$router.push("/goodsdetails?id="+item.id);
    },
    getResult(val) {
      if (val) {
        let searchHistory = [];
        searchHistory.push(val);
        localStorage.setItem("searchHistory",JSON.stringify(searchHistory));
        this.searchPost(val);
      }
    },
    onSubmit() {
      this.$refs.search.setBlur();
    },
    onFocus() {
      console.log("on focus");
    },
    onCancel() {
      this.$router.goBack();
    }
  },
  mounted() {
    this.setFocus();
  }
};

function getResult(val) {
  let rs = [];
  for (let i = 0; i < 20; i++) {
    rs.push({
      title: `${val} result: ${i + 1} `,
      other: i
    });
  }
  return rs;
}
</script>