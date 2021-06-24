<template>
  <div class="tab-bar-item" @click="clickActive">
    <div v-if="isActive"><slot name="item-icon-active" /></div>
    <div v-else><slot name="item-icon" /></div>
    <div :style="isActive ? { color: activeColor } : ''">
      <slot name="item-text" />
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: {
      type: String,
    },
    activeColor: {
      type: String,
      default: "#fe5262",
    },
  },
  methods: {
    clickActive() {
      this.$router.replace(this.path).catch((error) => error);
    },
  },
  computed: {
    isActive() {
      return this.$route.path.includes(this.path);
    },
  },
};
</script>

<style>
#tab-bar .tab-bar-item {
  flex: 1;
  text-align: center;
  font-size: 15px;
}
#tab-bar .tab-bar-item img {
  width: 24px;
  height: 24px;
  vertical-align: middle;
  margin: 2px 0;
}
</style>