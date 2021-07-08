<template>
  <div class="toast" v-show="isShow">{{ msg }}</div>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      msg: "",
      isShow: false,
    };
  },
  methods: {
    show(msg = "消息", duration = 1500) {
      this.msg = msg;
      this.isShow = true;
      setTimeout(() => {
        this.msg = "";
        this.isShow = false;
      }, duration);
    },
  },
};
</script>

<style>
.toast {
  color: #fff;
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  padding: 3px 10px;
}
</style>