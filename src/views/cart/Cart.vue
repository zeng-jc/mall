<template>
  <div id="cart">
    <!-- 顶部导航栏 -->
    <cart-nav-bar />
    <!-- 商品列表 -->
    <cart-list />
    <!-- 商品总和 -->
    <cart-bottom-bar />
  </div>
</template>

<script>
import CartNavBar from "./childComps/CartNavBar";
import CartList from "./childComps/CartList";
import CartBottomBar from "./childComps/CartBottomBar";

export default {
  name: "Cart",
  data() {
    return {
      cartList: [],
    };
  },
  components: {
    CartNavBar,
    CartList,
    CartBottomBar
  }
};
</script>

<style>
#cart {
  height: 100vh;
  overflow: auto;
  box-sizing: border-box;
  border-top: 44px solid transparent;
  border-bottom: 84px solid transparent;
}
</style>