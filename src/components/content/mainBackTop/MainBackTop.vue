<template>
  <back-top class="back-top" :backTop="mainBackTop">
    <img src="~assets/img/home/arrow.svg" alt="" />
  </back-top>
</template>

<script>
import BackTop from "components/common/backTop/BackTop";

export default {
  name: "MainBackTop",
  props: {
    mainBackTop: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  components: {
    BackTop,
  },
};
</script>

<style>
.back-top {
  width: 40px;
  height: 40px;
  position: fixed;
  bottom: 60px;
  right: 8px;
  z-index: 100;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.8);
}
.back-top img {
  height: 40px;
  width: 28px;
  margin: 0 auto;
  display: block;
}
</style>