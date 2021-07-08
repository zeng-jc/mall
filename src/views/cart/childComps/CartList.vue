<template>
  <ul class="cart-list">
    <cart-list-item v-for="item in cartList" :key="item.iid" :itemInfo="item" />
  </ul>
</template>

<script>
import { mapGetters } from "vuex";
import CartListItem from "./CartListItem";

export default {
  name: "CartList",
  components: {
    CartListItem,
  },
  computed: {
    ...mapGetters(["cartList"]),
  },
};
</script>

<style>
.cart-item {
  display: flex;
  padding: 10px 5px;
  border-bottom: 1px solid #ddd;
  box-sizing: border-box;
}
</style>