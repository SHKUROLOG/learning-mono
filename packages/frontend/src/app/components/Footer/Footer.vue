// eslint-disable-next-line vue/multi-word-component-names
<template>
  <div :class="$style.root">
    <a href="https://github.com/SHKUROLOG/learning-mono" target="_blank">* GitHub *</a>
  </div>
</template>

<script lang="ts" setup>

</script>

<style module>
a:hover {
  background-color: #25bc50;
  color: #000;
  padding: 8px;
}
.root {
  display: block;
  text-align: center;
  width: 100%;
  height: 80px;
}
</style>
