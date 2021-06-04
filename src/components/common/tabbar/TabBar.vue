<template>
  <section id="tab-bar">
    <slot/>
  </section>
</template>

<script>
export default {
  name: "TabBar",
};
</script>
<style>
#tab-bar {
  display: flex;
  height: 49px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #f6f6f6;
  box-shadow: 0px 5px 10px 1px rgba(100, 100, 100, 0.5);
}
</style>