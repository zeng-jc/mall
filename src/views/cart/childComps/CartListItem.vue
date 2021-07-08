<template>
  <ul>
    <li :key="itemInfo.iid" class="cart-item">
      <check-btn @click.native="checkToogle" :isChecked="itemInfo.checked" />
      <img :src="itemInfo.img" alt="" />
      <div class="cart-item-info">
        <p>{{ itemInfo.title }}</p>
        <p>{{ itemInfo.desc }}</p>
        <p class="cart-item-Uprice">
          <span>{{ itemInfo.nowPrice }}</span>
          <span>x{{ itemInfo.count }}</span>
        </p>
      </div>
    </li>
  </ul>
</template>

<script>
import CheckBtn from "components/content/checkBtn/CheckBtn";

export default {
  name: "CartListItem",
  props: {
    itemInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  components: {
    CheckBtn,
  },
  methods: {
    checkToogle() {
      this.itemInfo.checked = !this.itemInfo.checked;
    }
  },
};
</script>

<style>
.cart-item > img {
  flex: 1;
  max-width: 25%;
  height: 100px;
  margin: 0 10px;
  object-fit: cover;
  border-radius: 5px;
}

.cart-item-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 65%;
}

.cart-item-info p:nth-child(1),
.cart-item-info p:nth-child(2) {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
}
.cart-item-info p:nth-child(2) {
  color: #5a5a5a;
  font-size: 13px;
}
.cart-item-info .cart-item-Uprice {
  display: flex;
  justify-content: space-between;
}
.cart-item-info .cart-item-Uprice span:nth-child(1) {
  color: #ff7b00;
  font-size: 18px;
}
</style>