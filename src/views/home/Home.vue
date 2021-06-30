<template>
  <div id="home" @scroll="loadMore" ref="home">
    <!-- 顶部导航栏 -->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <!-- 轮播图 -->
    <home-swiper :banners="banners"></home-swiper>
    <!-- 推介 -->
    <recommend-view :recommends="recommends"></recommend-view>
    <!-- 流行 -->
    <feature-view></feature-view>
    <!-- tab控制器 -->
    <tab-control
      :tabControlTitles="tabControlTitles"
      class="home-tab-control"
      @tabClick="tabClick"
    ></tab-control>
    <!-- 商品列表 -->
    <goods-list :goods="showCurGoods"></goods-list>
    <!-- 回到顶部 -->
    <main-back-top
      v-show="isShow"
      :main-back-top="{ el: '#home', move: 700 }"
    />
  </div>
</template>

<script>
// 公共组件
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import MainBackTop from "components/content/mainBackTop/MainBackTop";

// 子组件
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView.vue";
// 网络请求组件
import { getHomeMutildata, getHomeGoods } from "network/home";

export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
      tabControlTitles: [
        { id: 1, title: "流行" },
        { id: 2, title: "新款" },
        { id: 3, title: "精选" },
      ],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShow: false,
      homeY: 0,
    };
  },
  components: {
    // 公共组件
    NavBar,
    TabControl,
    GoodsList,
    MainBackTop,
    //子组件
    HomeSwiper,
    RecommendView,
    FeatureView,
  },
  created() {
    //1.请求多个数据
    this.getHomeMutildata();
    //2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  computed: {
    showCurGoods() {
      return this.goods[this.currentType].list;
    },
  },
  methods: {
    tabClick(i) {
      switch (i) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },
    loadMore() {
      const homeElem = this.$refs.home;
      //记录滚动的位置，切换到当前组件时为这里获取的位置
      this.homeY = homeElem.scrollTop;
      //上拉触底加载更多
      if (
        Math.ceil(homeElem.scrollTop + homeElem.clientHeight) >=
        homeElem.scrollHeight
      ) {
        this.getHomeGoods(this.currentType);
      }
      //通过滚动监听组件的显示和隐藏
      if (homeElem.scrollTop > 1200) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    },
    /**
     * 网络请求的方法
     */
    getHomeMutildata() {
      getHomeMutildata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        //重复调用加载更多，只需要向对象的属性中塞入数据即可
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
      });
    },
  },
  activated() {
    this.$refs.home.scrollTop = this.homeY;
  },
  // deactivated() { 
  //   console.log(this.$refs.home.scrollTop);//打印结果始终为 0
  // },
};
</script>

<style>
#home {
  height: 100vh;
  overflow: auto;
  box-sizing: border-box;
  border-top: 44px solid transparent;
  border-bottom: 49px solid transparent;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 99;
}
.home-tab-control {
  position: sticky;
  top: 0;
  background-color: #fff;
}
</style>