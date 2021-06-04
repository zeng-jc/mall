<template>
  <tab-bar>
      <tab-bar-item path="/home">
        <img src="~assets/img/tabbar/home.svg" alt="" slot="item-icon"/>
        <img src="~assets/img/tabbar/home(1).svg" alt="" slot="item-icon-active"/>
        <p slot="item-text">首页</p>
      </tab-bar-item>
      <tab-bar-item path="/category">
        <img src="~assets/img/tabbar/category.svg" alt=""  slot="item-icon"/>
        <img src="~assets/img/tabbar/category(1).svg" alt="" slot="item-icon-active"/>
        <p slot="item-text">分类</p>
      </tab-bar-item>
      <tab-bar-item path="/cart">
        <img src="~assets/img/tabbar/cart.svg" alt=""  slot="item-icon"/>
        <img src="~assets/img/tabbar/cart(1).svg" alt="" slot="item-icon-active"/>
        <p slot="item-text">购物车</p>
      </tab-bar-item>
      <tab-bar-item path="/profile">
        <img src="~assets/img/tabbar/user.svg" alt=""  slot="item-icon"/>
        <img src="~assets/img/tabbar/user(1).svg" alt="" slot="item-icon-active"/>
        <p slot="item-text">我的</p>
      </tab-bar-item>
    </tab-bar>
</template>

<script>
import TabBar from "components/common/tabbar/TabBar";
import TabBarItem from 'components/common/tabbar/TabBarItem';
export default {
  name:'MainTabBar',
   components: {
    TabBar,
    TabBarItem,
  },
}
</script>

<style>

</style>