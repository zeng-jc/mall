<template>
  <div @click="backTopBtn(backTop.el, backTop.move)">
    <slot />
  </div>
</template>

<script>
export default {
  name: "BackTop",
  data() {
    return {
      //根元素内容的垂直移动距离
      elemt: 0,
    };
  },
  props: {
    backTop: {
      type: Object,
      default() {
        return {
          //需要滚动内容的元素
          el: "#home",
          //每一帧移动的距离
          move: 300,
        };
      },
    },
  },
  methods: {
    backTopBtn(el, move) {
      //1.防止重复点击
      clearTimeout(this.timer); //兼容性处理
      cancelAnimationFrame(this.timer);
      this.elemt = document.querySelector(el);
      //3.回调函数
      const fn = () => {
        //4.条件满足递归动画
        if (this.elemt.scrollTop > 0) {
          this.elemt.scrollTop = this.elemt.scrollTop - move;
          requestAnimationFrame(fn) || setTimeout(fn, 1000 / 60);
        } else {
          //5.清除动画
          cancelAnimationFrame(this.timer) || clearTimeout(this.timer);
        }
      };
      //2.开始执行动画
      this.timer = requestAnimationFrame(fn) || setTimeout(fn, 1000 / 60);
    },
  },
};
</script>

<style>
</style>