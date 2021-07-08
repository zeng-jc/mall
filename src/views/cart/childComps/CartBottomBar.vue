<template>
  <div class="cart-total">
    <check-btn
      class="totalChecked"
      @click.native="clickChecked"
      :isChecked="totalSelect"
    />全选
    <div class="cart-tPrice">合计:￥{{ totalPrice }}</div>
    <div class="cart-computed" @click="clickCalc">
      去计算({{ selectCount }})
    </div>
  </div>
</template>

<script>
import CheckBtn from "components/content/checkBtn/CheckBtn";
import { mapGetters } from "vuex";
export default {
  name: "CartBottomBar",
  components: {
    CheckBtn,
  },
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return this.cartList
        .filter((item) => item.checked)
        .reduce((prev, cur) => prev + cur.nowPrice * cur.count, 0)
        .toFixed(2);
    },
    selectCount() {
      return this.cartList.filter((item) => item.checked).length;
    },
    totalSelect() {
      if (this.cartList.length === 0) {
        return false;
      }
      //return this.cartList.every(item => item.checked) ? true : false;
      //高效方法。some是只要返回true就停止遍历
      return this.cartList.some((item) => !item.checked) ? false : true;
    },
  },
  methods: {
    clickChecked() {
      //点击时会切换状态，如果当时全部选中，点击后就是全都不选中
      //如果当时全选按钮状态为true，那么点击切换后状态就是全都补选中false
      if (this.totalSelect) {
        this.cartList.forEach((item) => (item.checked = false));
      } else {
        this.cartList.forEach((item) => (item.checked = true));
      }
    },
    clickCalc() {
      if (!this.totalSelect) {
        this.$toast.show("请选择商品");
      }
    },
  },
};
</script>

<style>
.cart-total {
  height: 35px;
  position: fixed;
  bottom: 49px;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  box-shadow: 0 0 4px rgba(192, 192, 192, 0.5);
}
.totalChecked {
  margin: 0 5px;
}
.cart-tPrice {
  margin-left: 5%;
}
.cart-computed {
  /* justify-self: end; 此样式在flex布局中无效*/
  margin-left: auto;
  height: 100%;
  line-height: 35px;
  padding: 0 10px;
  background-color: #ff5e00;
  color: #fff;
}
</style>