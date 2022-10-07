// eslint-disable-next-line vue/multi-word-component-names
<template>
  <div :class="$style.root">
    <div :class="$style.social">
      <hr width="40%"
          color="#25bc50"
          size="2px"
          style="margin: auto; margin-bottom: 18px; opacity: 0.3;">

      <a href="https://github.com/SHKUROLOG/learning-mono"
         target="_blank"
         text="<GITHUB>"/>

      <a href="https://t.me/SYNTAXNAME"
         target="_blank"
         text="<TELEGRAM>"/>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style module>
.root {
  display: grid;
  box-sizing: border-box;
  grid-template-columns: auto;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 80px;
}

.root a {
  opacity: 0.8;
  margin: 8px;
}

.root a:hover {
  background-color: #25bc50;
  color: #000;
}

.social {
  padding: 8px;
  margin: auto;
  width: 100%;
}
</style>
