<template>
  <section id="tab-bar">
    <slot />
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
  box-shadow: 0px 0px 4px rgba(195, 195, 195, 0.5);
}
</style>