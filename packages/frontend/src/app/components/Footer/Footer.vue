// eslint-disable-next-line vue/multi-word-component-names
<template>
  <div :class="$style.root">
    <div/>
    <div :class="$style.social">
      <a href="https://github.com/syntax-dot/learning-mono"
         target="_blank"> <img src="./icons/github.svg"></a>

      <a href="https://t.me/SYNTAXNAME"
         target="_blank"> <img src="./icons/telegram.svg"></a>
    </div>
    <div/>
  </div>
</template>

<script lang="ts" setup>

</script>

<style module>
.root {
  display: grid;
  grid-template-columns: auto auto auto;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 60px;
  border-top: 1px solid rgba(37, 188, 80, 0.8);
}

.hr {
  color: #25bc50;
  size: 1px;
  margin-bottom: 18px;
  opacity: 0.8;
}

.root a {
  opacity: 0.8;
  margin: 8px;
}

.root img:hover {
  scale: 1.1;
}

/* .root a:hover {
  background-color: #25bc50;
  color: #000;
} */

.social {

}
</style>
