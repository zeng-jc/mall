<template>
  <div class="bottom-bar">
    <div class="bar-service">
      <span></span>
      <span>客服</span>
    </div>
    <div class="bar-shop">
      <span></span>
      <span>店铺</span>
    </div>
    <div class="bar-collection">
      <span></span>
      <span>收藏</span>
    </div>
    <div class="bar-shop-cart">
      <span>加入购物车</span>
    </div>
    <div class="bar-buy">
      <span>购买</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailsBottomBar",
};
</script>

<style>
.bottom-bar {
  position: fixed;
  bottom: 0px;
  height: 59px;
  width: 100vw;
  background-color: #fff;
  box-shadow: 0px 0px 4px rgba(195, 195, 195, 0.5);
  z-index: 9999;
  display: flex;
  text-align: center;
}

.bar-service,
.bar-shop,
.bar-collection {
  width: 17%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bar-service span:nth-child(1),
.bar-shop span:nth-child(1),
.bar-collection span:nth-child(1) {
  margin-top: 5px;
  width: 30px;
  height: 30px;
  background: url(~assets/img/detail/detail_bottom.png) no-repeat;
  background-size: 30px;
}

.bar-service span:nth-child(1){
  background-position: 0px -73px;
}
.bar-shop span:nth-child(1) {
  background-position: 1px -135px;
}

.bar-shop-cart {
  width: 26%;
  background-color: #ffdd10;
  line-height: 59px;
}
.bar-buy {
  width: 23%;
  background-color: var(--color-tint);
  color: #fff;
  font-size: 18px;
  line-height: 59px;
}
</style>