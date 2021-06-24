<template>
  <div class="tab-control">
    <div
      class="tab-control-item"
      v-for="(item, index) in tabControlTitles"
      :key="item.id"
      @click="itemClick(index)"
    >
      <span :class="{ active: index === currentIndex }">{{ item.title }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  data() {
    return {
      currentIndex: 0,
    };
  },
  props: {
    tabControlTitles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit("tabClick", index);//子传父
    },
  },
};
</script>

<style>
.tab-control {
  display: flex;
}
.tab-control .tab-control-item {
  flex: 1;
  text-align: center;
  height: 40px;
  line-height: 40px;
}
.tab-control .tab-control-item span {
  border-bottom: 3px solid transparent;
  padding: 3px;
}
.active {
  border-bottom-color: var(--color-tint) !important;
  color: var(--color-tint) !important;
}
</style>