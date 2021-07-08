<template>
  <div class="cart-checked" :class="{ select: isChecked }">
    <img src="~assets/img/cart/tick.svg" alt="" />
  </div>
</template>

<script>
export default {
  name: "CheckBtn",
  props: {
    isChecked: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style>
.cart-checked {
  width: 16px;
  height: 16px;
  align-self: center;
  overflow: hidden;
  border: 1px solid #7a7a7a;
  border-radius: 50%;
}
.select {
  border-color: #fff;
  background-color: var(--color-tint);
}
</style>