// eslint-disable-next-line vue/multi-word-component-names
<template>
  <div :class="$style.root">
    <!-- <span :class="$style.label">© 2022 syntax-dot </span> -->
    <div :class="$style.social">
      <a href="https://github.com/syntax-dot/learning-mono"
         target="_blank"> <img src="./icons/github.svg"></a>

      <a href="https://t.me/SYNTAXNAME"
         target="_blank"> <img src="./icons/telegram.svg"></a>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style module lang="scss">
.root {
  display: flex;
  height: 60px;
  align-items: center;
  justify-content: center;
}

.root > a {
  opacity: 0.8;
  margin: 8px;
}

.root img:hover {
  scale: 1.1;
}

.label {
  font-size: 0.8rem;
  opacity: 0.8;
}

.social {
  margin: 0 16px;
}
</style>
