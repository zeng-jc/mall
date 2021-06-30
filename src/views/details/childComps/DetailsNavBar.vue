<template>
  <nav-bar>
    <div slot="left" class="details-return">
      <img src="~assets/img/navbar/arrow-left.svg" alt="" @click="returnBtn" />
    </div>
    <div slot="center" class="details-title">
      <span
        v-for="(item, index) in detailsTitles"
        :key="item.id"
        @click="titleItemClick(index)"
        :class="{ active: currentTitle == index }"
      >
        {{ item.title }}
      </span>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";

export default {
  name: "DetailsNavBar",
  components: {
    NavBar,
  },
  data() {
    return {
      detailsTitles: [
        { title: "商品", id: 1 },
        { title: "参数", id: 2 },
        { title: "评论", id: 3 },
        { title: "推介", id: 4 },
      ],
      currentTitle: 0,
    };
  },
  methods: {
    titleItemClick(i) {
      this.currentTitle = i;
      this.$emit("titleClick", i);
    },
    returnBtn() {
      this.$router.back();
    },
  },
};
</script>

<style>
.details-title {
  display: flex;
  justify-content: space-evenly;
}
.details-return img {
  width: 25px;
  height: 25px;
  vertical-align: middle;
}
.active {
  color: var(--color-tint);
}
</style>