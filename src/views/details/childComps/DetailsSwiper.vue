<template>
  <swiper class="details-swiper">
    <swiper-item v-for="(item, index) in topImages" :key="index">
      <img :src="item" alt="图片展示失败" />
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper/index";

export default {
  name: "DetailsSwiper",
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    Swiper,
    SwiperItem,
  },
};
</script>

<style>
.details-swiper {
  height: 350px;
  overflow: hidden;
}
</style>