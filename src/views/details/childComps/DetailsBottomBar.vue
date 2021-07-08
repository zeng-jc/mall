<template>
  <div class="detail-bottom-bar">
    <div class="bar-service">
      <span class="detail-bar-icon"></span>
      <span>客服</span>
    </div>
    <div class="bar-shop">
      <span class="detail-bar-icon"></span>
      <span>店铺</span>
    </div>
    <div class="bar-collection">
      <span class="detail-bar-icon"></span>
      <span>收藏</span>
    </div>
    <div class="bar-shop-cart" @click="addCart">加入购物车</div>
    <div class="bar-buy">购买</div>
  </div>
</template>

<script>
export default {
  name: "DetailsBottomBar",
  methods: {
    addCart() {
      this.$emit("addCart");
    },
  },
};
</script>

<style>

.detail-bottom-bar {
  position: fixed;
  bottom: 0px;
  height: 59px;
  width: 100vw;
  background-color: #fff;
  box-shadow: 0px 0px 4px rgba(195, 195, 195, 0.5);
  z-index: 9999;
  display: flex;
  text-align: center;
  align-items: center;
  font-size: 12px;
}

.detail-bottom-bar .bar-service,
.detail-bottom-bar .bar-shop,
.detail-bottom-bar .bar-collection {
  width: 17%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.detail-bottom-bar .bar-service .detail-bar-icon, 
.detail-bottom-bar .bar-shop .detail-bar-icon,
.detail-bottom-bar .bar-collection .detail-bar-icon {
  margin-bottom: 2px;
  width: 26px;
  height: 26px;
  background: url(~assets/img/detail/detail_bottom.png) no-repeat;
  background-size: 26px;
}

.detail-bottom-bar .bar-service .detail-bar-icon {
  background-position: 0px -62px;
}
.detail-bottom-bar .bar-shop .detail-bar-icon {
  background-position: 1px -116px;
}

.detail-bottom-bar .bar-shop-cart {
  width: 26%;
  background-color: #ffdd10;
  line-height: 59px;
  height: 100%;
  font-size: 16px;
}


.detail-bottom-bar .bar-buy {
  width: 23%;
  background-color: var(--color-tint);
  color: #fff;
  font-size: 18px;
  line-height: 59px;
  height: 100%;
  font-size: 16px;
}

</style>