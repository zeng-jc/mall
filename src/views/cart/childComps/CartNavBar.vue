<template>
  <nav-bar class="cart-nav-bar">
    <div slot="center">购物车({{ length }})</div>
  </nav-bar>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

//辅助函数，将store中的 getter 映射到局部的计算属性 computed
import { mapGetters } from "vuex";

export default {
  name: "CartNavBar",
  components: {
    NavBar,
  },
  computed: {
    //...mapGetters([cartList]) 传入数组不能自定义别名
    //通过展开语法将 getter 映射到 computed中。传入对象可以自定义别民
    ...mapGetters({
      length: "cartLength",
    }),
  },
};
</script>

<style>
.cart-nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
</style>