<template>
  <!-- 判断basicInfo是否为空 -->
  <div v-if="Object.keys(basicInfo).length !== 0" class="goods-info">
    <div>{{ basicInfo.title }}</div>

    <div class="goods-price">
      <span class="now-price">￥{{ basicInfo.nowPrice }}</span>
      <span class="old-price">{{ basicInfo.oldPrice }}</span>
      <span
        class="discountDesc"
        v-if="Object.keys(basicInfo.discountDesc).length !== 0"
        >{{ basicInfo.discountDesc }}</span
      >
    </div>

    <div class="goods-columns">
      <div v-for="(item, index) in basicInfo.columns" :key="index">
        {{ item }}
      </div>
    </div>

    <div class="goods-services">
      <div
        class="service-item"
        v-for="index in basicInfo.services.length - 2"
        :key="index"
      >
        <img :src="basicInfo.services[index].icon" alt="" />
        {{ basicInfo.services[index].name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailsBasicInfo",
  props: {
    basicInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style>
.goods-info {
  padding: 10px 10px;
}
.goods-price {
  margin: 10px 0;
}
.now-price {
  font-size: 20px;
  color: var(--color-tint);
}
.old-price {
  text-decoration: line-through;
  color: rgb(122, 120, 120);
  margin: 0 8px;
  font-size: 14px;
}
.discountDesc {
  background-color: var(--color-tint);
  border-radius: 6px;
  color: white;
  padding: 0 10px;
}
.goods-columns {
  display: flex;
  justify-content: space-between;
  color: rgb(122, 120, 120);
  font-size: 14px;
  border-bottom: 1px solid #efefef;
  padding-bottom: 10px;
}

.goods-services {
  height: 50px;
  line-height: 50px;
  border-bottom: 4px solid #f9f9f9;
}
.goods-services {
  font-size: 14px;
  display: flex;
  justify-content: space-between;
}
.goods-services .service-item img {
  width: 14px;
  vertical-align: middle;
}
</style>