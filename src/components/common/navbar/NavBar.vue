<template>
  <section class="nav-bar">
    <div class="left"><slot name="left" /></div>
    <div class="center"><slot name="center" /></div>
    <div class="right"><slot name="right" /></div>
  </section>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style>
.nav-bar {
  display: flex;
  height: 44px;
  line-height: 44px;
  text-align: center;
  box-shadow: 0px 0px 4px rgba(195, 195, 195, 0.5);
  font-size: 14px;
}
.nav-bar .center{
  flex: 1;
}
.nav-bar .left{
  width: 12%;
}
.nav-bar .right{
  width: 12%;
}
</style>