<template>
  <div class="recommend">
    <div v-for="item in recommends" :key="item.sort" class="recommend-item">
      <img :src="item.image" alt="" />
      <span>{{ item.title }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style>
.recommend {
  display: flex;
  padding: 10px 0 20px;
  border-bottom: 10px solid #eee;
}
.recommend .recommend-item {
  flex: 1;
  text-align: center;
}
.recommend .recommend-item img {
  width: 74px;
  height: 74px;
}
.recommend .recommend-item span{
  display: block;
  font-size: 14px;
  color: #333;
  margin-top: 4px;
}
</style>