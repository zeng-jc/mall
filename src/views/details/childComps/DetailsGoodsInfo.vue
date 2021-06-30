<template>
  <div>
    <div class="detail-baby">———— 宝贝详情 ————</div>
    <div class="detail-img">
      <img
        :src="item"
        alt=""
        v-for="(item, index) in detailInfo"
        :key="index"
        @load="imgLoad"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailsGoodsInfo",
  props: {
    detailInfo: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    imgLoad() {
      this.$emit("imgLoad");
    },
  },
};
</script>

<style>
.detail-baby {
  color: #888;
  text-align: center;
  font-size: 14px;
  margin: 10px 0;
}
.detail-img img {
  width: 100vw;
}
</style>