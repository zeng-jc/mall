<template>
  <div class="goods-item" @click="clickItem">
    <img v-lazy="showImg" alt="图片加载失败" />
    <div class="goods-descriptor">
      <p>{{ goodsItem.title }}</p>
      <span class="price">￥{{ goodsItem.price }}</span>
      <span class="star">{{ goodsItem.cfav }}人付款</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return null;
      },
    },
  },
  computed: {
    showImg() {
      return this.goodsItem.image || this.goodsItem.show.img;
    },
  },
  methods: {
    clickItem() {
      this.$router.push("/details/" + this.goodsItem.iid);
    },
  },
};
</script>

<style>
.goods-item {
  width: 47%;
  background-color: white;
  margin-bottom: 10px;
  border-radius: 8px;
  overflow: hidden;
}
.goods-item img {
  width: 100%;
  border-radius: 8px;
  margin-bottom: 5px;
}
.goods-item .goods-descriptor {
  padding: 0 2px;
}
.goods-item .goods-descriptor p {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: var(--text-color);
  font-size: var(--font-size);
}
.goods-item .goods-descriptor .price {
  color: red;
}
.goods-item .goods-descriptor .star {
  color: #5a5a5a;
  font-size: 13px;
  margin-top: 1px;
  margin-left: 8px;
}
</style>