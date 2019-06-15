<template>
  <div class="block-chain-info-wrap">
    <Header
      :titleContent="TitleObjData.titleContent"
      :showLeftBack="TitleObjData.showLeftBack"
      :showRightMore="TitleObjData.showRightMore"
    ></Header>
    <div class="block-chain-info-content" :style="scenceConsumHeight">
      <div class="img-info">
        <p>{{goodInfo.title}}</p>
        <p class="img-wrap">
          <img class="good-img" v-lazy="goodInfo.thumb" :alt="goodInfo.title" srcset>
        </p>
      </div>
      <!-- 文链信息 -->
      <div class="info-list" @click="getChainInfoFn('文链信息',blockChainList)">
        <div>
          <p class="info-list-p blod-sty">文链信息</p>
          <p class="info-list-p">
            <span class="dot"></span>
            <span>公钥：{{blockChainList.name}}</span>
          </p>
        </div>
        <div>
          <span class="iconfont iconyoujiantou"></span>
        </div>
      </div>
      <!-- 景区授权 -->
      <div class="info-list" @click="getChainInfoFn('景区授权',blockChainList)">
        <div>
          <p class="info-list-p blod-sty">景区授权</p>
          <p class="info-list-p">
            <span class="dot"></span>
            <span>景区：{{blockChainList.wc.jq_name}}</span>
          </p>
          <p class="info-list-p">
            <span class="dot"></span>
            <span>{{blockChainList.wc.grant_created_time | formTime}}</span>
          </p>
        </div>
        <div>
          <span class="iconfont iconyoujiantou"></span>
        </div>
      </div>
      <!-- 文创 -->
      <div class="info-list" @click="getChainInfoFn('文化梳理',blockChainList)">
        <div>
          <p class="info-list-p blod-sty">文化梳理</p>
          <p class="info-list-p">
            <span class="dot"></span>
            <span>作者：{{blockChainList.wc.realname ? blockChainList.wc.realname : ''}}</span>
          </p>
          <p class="info-list-p">
            <span class="dot"></span>
            <span>时间：{{blockChainList.wc.created_time | formTime}}</span>
          </p>
        </div>
        <div>
          <span class="iconfont iconyoujiantou"></span>
        </div>
      </div>
      <!-- 艺创 -->
      <div class="info-list" @click="getChainInfoFn('艺品创作',blockChainList)">
        <div>
          <p class="info-list-p blod-sty">艺品创作</p>
          <p class="info-list-p">
            <span class="dot"></span>
            <span>作者：{{blockChainList.yc.memberInfo ? blockChainList.yc.memberInfo.realname : ''}}</span>
          </p>
          <p class="info-list-p">
            <span class="dot"></span>
            <span>时间：{{blockChainList.sy.create_time | formTime}}</span>
          </p>
        </div>
        <div>
          <span class="iconfont iconyoujiantou"></span>
        </div>
      </div>
      <!-- 溯源 -->
      <div class="info-list" @click="getChainInfoFn('艺品溯源',blockChainList)">
        <div>
          <p class="info-list-p blod-sty">艺品溯源</p>
          <p class="info-list-p">
            <span class="dot"></span>
            <span>作者：{{blockChainList.sy.name}}</span>
          </p>
          <p class="info-list-p">
            <span class="dot"></span>
            <span>时间：{{blockChainList.sy.create_time | formTime}}</span>
          </p>
        </div>
        <div>
          <span class="iconfont iconyoujiantou"></span>
        </div>
      </div>
      <!-- 防伪 -->
      <div class="info-list" @click="getChainInfoFn('艺品防伪',blockChainList)">
        <div>
          <p class="info-list-p blod-sty">艺品防伪</p>
          <p class="info-list-p">
            <span class="dot"></span>
            <span>作者：{{blockChainList.yc.artcreation_orde ? blockChainList.yc.artcreation_orde.anti_user : ''}}</span>
          </p>
          <p class="info-list-p">
            <span class="dot"></span>
            <span>时间：{{blockChainList.artcreation_orde ? blockChainList.artcreation_orde.anti_date : '' | formTime}}</span>
          </p>
        </div>
        <div>
          <span class="iconfont iconyoujiantou"></span>
        </div>
      </div>
      <!-- 交易 -->
      <div class="info-list" @click="getChainInfoFn('交易信息',blockChainList)">
        <div>
          <p class="info-list-p blod-sty">交易信息</p>
          <p class="info-list-p">
            <span class="dot"></span>
            <span>买方：{{blockChainList.jy.buyer_info ? blockChainList.jy.buyer_info.realname : ''}}</span>
          </p>
          <p class="info-list-p">
            <span class="dot"></span>
            <span>价格：{{blockChainList.jy.order ? blockChainList.jy.order.price : ''}}</span>
          </p>
          <p class="info-list-p">
            <span class="dot"></span>
            <span>时间：{{blockChainList.jy.order ? blockChainList.jy.order.createtime : '' | formTime}}</span>
          </p>
        </div>
        <div>
          <span class="iconfont iconyoujiantou"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/common/Header";
import { verifyGoodsDetalis } from "@/servers/api";
import { timeTodate } from "@/assets/js/tools";

export default {
  name: "",
  props: [""],
  data() {
    return {
      title: "文链信息",
      TitleObjData: {
        titleContent: "文链信息",
        showLeftBack: true,
        showRightMore: false
      },
      blockChainList: {
        name: "",
        wc: "",
        yc: {},
        sy: "",
        jy: "",
        sm: "",
        rh: ""
      },
      goodInfo: {}
    };
  },

  components: {
    Header
  },
  filters: {
    formTime(val) {
      return val ? timeTodate(val) : "";
    }
  },
  computed: {
    scenceConsumHeight() {
      return { height: document.documentElement.clientHeight - 45 + "px" };
    }
  },

  beforeMount() {},
  beforeCreate() {},
  beforeMount() {
    this.initData();
  },
  mounted() {},

  methods: {
    // 查看详情
    getChainInfoFn(title, content) {
      content.rule = this.$route.query.rule;
      let con = JSON.stringify(content);
      this.$store.commit("setBlockChainInfo", con);
      this.$router.push("/blockchaininfodetails?title=" + title);
    },
    // 初始化
    initData() {
      let dataArr = [];
      verifyGoodsDetalis({
        goods_id: this.$route.query.id
      })
        .then(res => {
          if (res.result === 1) {
            this.goodInfo = res.data.goods;
            let objData = res.data.blockCurlData.data;
            if (objData) {
              for (let i = 0; i < objData.rows.length; i++) {
                dataArr.push({
                  owner: objData.rows[i].owner,
                  strData: JSON.parse(objData.rows[i].strData),
                  strType: objData.rows[i].strType
                });
              }
              console.log(dataArr);
              for (let i = 0; i < dataArr.length; i++) {
                if (dataArr[i].strType === "yc") {
                  this.blockChainList.name = dataArr[i].owner;
                  this.blockChainList.wc = dataArr[i].strData.writing_order;
                  this.blockChainList.yc = dataArr[i].strData;
                } else if (dataArr[i].strType === "sy") {
                  this.blockChainList.sy = dataArr[i].strData;
                } else if (dataArr[i].strType === "jy") {
                  this.blockChainList.jy = dataArr[i].strData;
                } else if (dataArr[i].strType === "sm") {
                  this.blockChainList.sm = dataArr[i].strData;
                } else if (dataArr[i].strType === "rh") {
                  this.blockChainList.rh = dataArr[i].strData;
                }
              }
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  beforeDestroy() {},

  watch: {}
};
</script>
<style lang='css' scoped>
.block-chain-info-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.block-chain-info-content {
  width: 100%;
  overflow: hidden;
  overflow-y: scroll;
  margin-top: 45px;
  background: #f5f5f5;
  padding: 15px;
  box-sizing: border-box;
}
.img-info {
  width: 100%;
  height: 160px;
  background: #000;
  padding: 15px;
  box-sizing: border-box;
  color: #fff;
  border-radius: 2px;
}
.img-wrap {
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.good-img {
  width: 100px;
  height: 100px;
  object-fit: contain;
}
.info-list {
  width: 100%;
  min-height: 80px;
  height: auto;
  background: #fff;
  border-radius: 2px;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
}
.dot {
  width: 5px;
  height: 5px;
  display: inline-block;
  background: #000;
  border-radius: 50%;
  margin-right: 4px;
}
.info-list-p {
  width: 100%;
  height: 22px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.blod-sty {
  font-weight: bold;
}
</style>