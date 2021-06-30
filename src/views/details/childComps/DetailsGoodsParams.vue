<template>
  <div class="item-params" v-if="Object.keys(itemParams).length !== 0">
    <!-- 商品尺码 -->
    <table class="goods-size">
      <thead>
        <td>{{ itemParams.ruleKey }}</td>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in itemParams.tables"
          :key="index"
        >
          <td v-for="(inerItem, i) in item" :key="i">{{ inerItem }}</td>
        </tr>
      </tbody>
    </table>
    <!-- 参数信息 -->
    <table class="params-info">
      <thead>
        <td>{{ itemParams.infoKey }}</td>
      </thead>
      <tbody>
        <tr v-for="(item, index) in itemParams.set" :key="index">
          <td>{{ item.key }}</td>
          <td>{{ item.value }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "DetailsGoodsParams",
  props: {
    itemParams: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style>
.goods-size,
.params-info {
  width: 100vw;
  /* 注意！！此样式只在边框分离时(collapse-spacing:separate)有效  */
  border-spacing: 0;
  color: #444;
  padding: 10px;
  border-bottom: 5px solid #f2f5f8;
  padding-bottom: 30px;
}

.goods-size thead td,
.params-info thead td{
  font-weight: bold;
  width: 28%;
}

.goods-size tr,
.params-info tr {
  height: 40px;
}
.goods-size tr td {
  /* 给表格设置边框只在td中有效 */
  border-bottom: 2px solid #f0f0f0;
}

.params-info tr td {
  border-bottom: 1px solid #f0f0f0;
}

.params-info tr td:first-child {
  width: 28%;
}
.params-info tr td:first-child + td{
  color: var(--color-tint);
}
</style>