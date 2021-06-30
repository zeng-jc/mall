<template>
  <div id="details" @scroll="detailsScroll" ref="details">
    <!-- 顶部导航栏组件 -->
    <details-nav-bar
      class="details-nav-bar"
      @titleClick="titleClick"
      ref="detailsTitle"
    />
    <!-- 顶部轮播图组件 -->
    <details-swiper :top-images="topImages" />
    <!-- 商品基本信息组件 -->
    <details-basic-info :basic-info="basicInfo" />
    <!-- 店铺信息组件 -->
    <details-shop-info :shop="shop" />
    <!-- 商品详细信息组件 -->
    <details-goods-info :detail-info="detailInfo" @imgLoad="imgLoad" />
    <!-- 商品参数信息组件 -->
    <details-goods-params :item-params="itemParams" ref="params" />
    <!-- 评论组件 -->
    <details-comment :comment-info="commentInfo" ref="comment" />
    <!-- 推介商品 -->
    <goods-list :goods="recommends" ref="recommend" />
    <!-- 回到顶部组件 -->
    <main-back-top
      :main-back-top="{ el: '#details', move: 700 }"
      v-show="isShow"
    />
    <details-bottom-bar/>
  </div>
</template>

<script>
/**
 * 公共组件
 */
import MainBackTop from "components/content/mainBackTop/MainBackTop.vue";
import GoodsList from "components/content/goods/GoodsList.vue";
//顶部导航栏组件
import DetailsNavBar from "./childComps/DetailsNavBar.vue";
// 顶部轮播图组件
import DetailsSwiper from "./childComps/DetailsSwiper.vue";
// 商品基本信息组件
import DetailsBasicInfo from "./childComps/DetailsBasicInfo.vue";
// 店铺信息组件
import DetailsShopInfo from "./childComps/DetailsShopInfo.vue";
// 商品详细信息组件
import DetailsGoodsInfo from "./childComps/DetailsGoodsInfo.vue";
// 商品参数信息组件
import DetailsGoodsParams from "./childComps/DetailsGoodsParams.vue";
// 评论组件
import DetailsComment from "./childComps/DetailsComment.vue";
//底部导航栏
import DetailsBottomBar from './childComps/DetailsBottomBar.vue'
/**
 * 网络请求
 */
import {
  getDetails,
  getRecommend,
  DetailsBasic,
  DetailsShop,
  ItemParams,
} from "network/details.js";
/**
 * 工具方法
 */
import { debounce } from "common/utils.js";

export default {
  name: "Details",
  components: {
    /**
     * 公共组件
     */
    MainBackTop,
    GoodsList,
    /**
     * 子组件
     */
    DetailsNavBar,
    DetailsSwiper,
    DetailsBasicInfo,
    DetailsShopInfo,
    DetailsGoodsInfo,
    DetailsGoodsParams,
    DetailsComment,
    DetailsBottomBar
  },
  data() {
    return {
      iid: null,
      topImages: [],
      basicInfo: {},
      shop: {},
      detailInfo: [],
      itemParams: {},
      isShow: false,
      commentInfo: {},
      recommends: [],
      moduleLocation: [],
      setDebounce: null,
      currentIndex: -1,
    };
  },
  created() {
    //1.获取 iid
    this.iid = this.$route.params.iid;
    //2.请求详情数据
    getDetails(this.iid).then((res) => {
      //2.1 获取数据
      const result = res.result;

      //2.2 获取顶部轮播图
      this.topImages = result.itemInfo.topImages;

      //2.3 获取商品基本信息，并整合到一个对象中
      this.basicInfo = new DetailsBasic(
        result.itemInfo,
        result.columns,
        result.shopInfo.services
      );

      //2.4 获取店铺信息，并整合到一个对象中
      this.shop = new DetailsShop(result.shopInfo);

      //2.5 获取店铺详情信息
      this.detailInfo = result.detailInfo.detailImage[0].list;

      //2.6 获取商品参数信息
      this.itemParams = new ItemParams(
        result.itemParams.info,
        result.itemParams.rule
      );

      //2.7 获取评论数据
      if (result.rate.cRate > 0) {
        this.commentInfo = result.rate.list[0];
      }

      // this.$nextTick(() => {
      //   //这个函数是一个回调函数，他会根据最新的数据，更新DOM之后立即执行
      //   //但是这个回调函数是不会等待图片的加载，虽然可以获取到位置offsetTop但是结果并不准确
      //   //为什么等图片加载完后在界面中刷新一下可以获取到准确位置？
      //   //因为图片回缓存，当请求相同数据的时候缓存数据可以瞬间加载完成
      //   this.moduleLocation.push(0);
      //   this.moduleLocation.push(this.$refs.params.$el.offsetTop);
      //   this.moduleLocation.push(this.$refs.comment.$el.offsetTop);
      //   this.moduleLocation.push(this.$refs.recommend.$el.offsetTop);
      //   console.log(this.moduleLocation);
      // });
    });
    //3.请求推介数据
    getRecommend().then((res) => {
      this.recommends = res.data.list;
    });

    this.setDebounce = debounce(() => {
      this.moduleLocation.push(0);
      this.moduleLocation.push(this.$refs.params.$el.offsetTop);
      this.moduleLocation.push(this.$refs.comment.$el.offsetTop);
      this.moduleLocation.push(this.$refs.recommend.$el.offsetTop);
      this.moduleLocation.push(Number.MAX_VALUE);
    });
  },
  updated() {
    // console.log(this.$refs.params.$el);
  },
  methods: {
    detailsScroll() {
      //获取dom元素
      const detailsTopY = this.$refs.details.scrollTop;
      if (detailsTopY > 1200) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }

      for (let i = 0; i < this.moduleLocation.length; i++) {
        if (
          this.currentIndex != i &&
          detailsTopY >= this.moduleLocation[i] &&
          detailsTopY < this.moduleLocation[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.detailsTitle.currentTitle = this.currentIndex;
          break;
        }
      }
    },
    titleClick(i) {
      this.$refs.details.scrollTo({
        top: this.moduleLocation[i],
        behavior: "smooth",
      });
    },
    imgLoad() {
      this.setDebounce();
    },
  },
};
</script>

<style>
#details {
  height: 100vh;
  overflow-y: auto;
  box-sizing: border-box;
  border-top: 44px solid transparent;
  border-bottom: 59px solid transparent;
  position: relative;
  z-index: 15;
  background-color: white;
}
.details-nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 20;
  background-color: white;
}
</style>