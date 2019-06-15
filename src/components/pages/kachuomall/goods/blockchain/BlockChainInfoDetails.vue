<template>
  <div class="block-chain-wrap">
    <Header
      :titleContent="TitleObjData.titleContent"
      :showLeftBack="TitleObjData.showLeftBack"
      :showRightMore="TitleObjData.showRightMore"
    ></Header>
    <div class="block-chain-content" :style="scenceGiftsContent">
      <!-- 文链信息 -->
      <div
        class="block-chain-info"
        v-if="TitleObjData.titleContent === '文链信息'"
        :style="chainCertificate"
      >
        <p>作品名称：{{conObj.yc.artcreation_orde ? conObj.yc.artcreation_orde.name : ''}}</p>
        <p>作者：{{conObj.yc.memberInfo.realname}}</p>
        <p>作品编码：{{conObj.rule}}</p>
      </div>
      <!-- 景区授权 -->
      <div class="block-chain-info-otber" v-if="TitleObjData.titleContent === '景区授权'">
        <p>景区名称：{{conObj.wc.jq_name}}</p>
        <p>授权时间：{{conObj.wc.grant_created_time | formateDate}}</p>
        <p>
          授权证书：
          <img :src="conObj.wc.grant_img" alt srcset>
        </p>
      </div>
      <!-- 文化梳理 -->
      <div class="block-chain-info-otber" v-if="TitleObjData.titleContent === '文化梳理'">
        <p>标签：{{conObj.wc.label}}</p>
        <p>释义：{{conObj.wc.explains}}</p>
        <p>元素：{{conObj.wc.element}}</p>
        <p>解读：{{conObj.wc.unscramble}}</p>
      </div>
      <!-- 艺品创作 -->
      <div class="block-chain-info-otber" v-if="TitleObjData.titleContent === '艺品创作'">
        <p>作品名称：{{conObj.yc.artcreation_orde ? conObj.yc.artcreation_orde.name :''}}</p>
        <p>所属景区：{{conObj.yc.artcreation_orde ? conObj.yc.category.name : ''}}</p>
        <p>作品品类：{{ conObj.yc.artcreation_orde ? conObj.yc.artcreation_orde.category : ''}}</p>
        <p>作品材质：{{conObj.yc.artcreation_orde ? conObj.yc.artcreation_orde.material : ''}}</p>
        <p>作品形制：{{conObj.yc.artcreation_orde ? conObj.yc.artcreation_orde.shape : ''}}</p>
        <p>作品颜色：{{conObj.yc.artcreation_orde ? conObj.yc.artcreation_orde.colour : ''}}</p>
        <p>作品纹饰：{{conObj.yc.artcreation_orde ? conObj.yc.artcreation_orde.lines : ''}}</p>
        <p>作品用途：{{conObj.yc.artcreation_orde ? conObj.yc.artcreation_orde.purpose : ''}}</p>
        <p>作品技法：{{conObj.yc.artcreation_orde ? conObj.yc.artcreation_orde.technique : ''}}</p>
        <p>作品规格：{{conObj.yc.artcreation_orde ? conObj.yc.artcreation_orde.gauge : ''}}</p>
        <p>作品工时：{{conObj.yc.artcreation_orde ? conObj.yc.artcreation_orde.work_time : ''}}</p>
        <p>价值取向：{{conObj.yc.artcreation_orde ? conObj.yc.artcreation_orde.orientation : ''}}</p>
        <p>开始时间：{{conObj.sy.create_time}}</p>
        <p>结束时间：{{conObj.sy.end_time}}</p>
        <p>创作地点：{{conObj.yc.artcreation_orde ? conObj.yc.artcreation_orde.address : ''}}</p>
      </div>
      <!-- 艺品溯源 -->
      <div class="block-chain-info-otber" v-if="TitleObjData.titleContent === '艺品溯源'">
        <p>溯源人员：{{conObj.sy.name}}</p>
        <p>开始时间：{{conObj.sy.create_time}}</p>
        <p>结束时间：{{conObj.sy.end_time}}</p>
        <p>溯源设备：{{conObj.sy.equipment}}</p>
        <p>溯源地点：{{conObj.sy.address}}</p>
      </div>
      <!-- 艺品防伪 -->
      <div class="block-chain-info-otber" v-if="TitleObjData.titleContent === '艺品防伪'">
        <p>防伪人员：{{ conObj.yc.artcreation_orde?conObj.yc.artcreation_orde.anti_user : ''}}</p>
        <p>防伪时间：{{conObj.yc.artcreation_orde ? conObj.yc.artcreation_orde.anti_date:'' | formateDate}}</p>
      </div>
      <!-- 艺品交易 -->
      <div class="block-chain-info-otber" v-if="TitleObjData.titleContent === '艺品交易'">
        <p>买&emsp;&emsp; 方：{{conObj.jy ? conObj.jy.buyer_info.realname : ''}}</p>
        <p>交易时间：{{conObj.jy.order.createtime | formateDate}}</p>
        <p>付款时间：{{conObj.jy.order.createtime | formateDate}}</p>
        <p>交易价格：{{conObj.jy.order.price}}</p>
        <p>交易方式：{{conObj.jy.order.paytype=== '21' ? '微信' : '支付宝'}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/common/Header";
import img from "@/assets/images/block-chain-img.png";
import { timeTodate } from "@/assets/js/tools";
import { Group, Radio } from 'vux';
export default {
  name: "",
  props: [""],
  data() {
    return {
      TitleObjData: {
        titleContent: "",
        showLeftBack: true,
        showRightMore: false
      },
      conObj: {},
      chainCertificate: {
        backgroundImage: "url(" + img + ")"
      }
    };
  },

  components: {
    Header
  },
  filters: {
    formateDate(val) {
      return timeTodate(val);
    }
  },
  computed: {
    scenceGiftsContent() {
      return {
        height: document.documentElement.clientHeight - 45 + "px"
      };
    }
  },

  beforeMount() {},

  mounted() {
    this.setTitle();
  },

  methods: {
    setTitle() {
      this.TitleObjData.titleContent = this.$route.query.title;
      this.conObj = JSON.parse(this.$store.state.blockChainInfo);
    }
  },

  watch: {}
};
</script>
<style lang='css' scoped>
.block-chain-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.block-chain-content {
  width: 100%;
  height: 100%;
  overflow: hidden;
  overflow-y: scroll;
  margin-top: 50px;
  padding: 15px;
  box-sizing: border-box;
}
.block-chain-info {
  width: 100%;
  height: 100%;
  background-position: top;
  background-size: 100%;
  background-repeat: no-repeat;
  font-size: 12px;
  padding: 160px 40px 10px 40px;
  box-sizing: border-box;
  word-break: break-all;
  overflow: hidden;
}
.block-chain-info-otber {
  width: 100%;
  height: 100%;
  font-size: 14px;
  word-break: break-all;
  overflow: hidden;
}
</style>