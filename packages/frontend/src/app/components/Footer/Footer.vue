// eslint-disable-next-line vue/multi-word-component-names
<template>
  <div :class="$style.root">
    <a href="https://github.com/SHKUROLOG/learning-mono" target="_blank">
      <!-- <span class="material-icons">code</span> -->
      <!-- <img :class="$style.github_img" src="./github.svg"> -->
      <!-- <svg :class="$style.github_img">
        <use href="./github.svg"/>
      </svg> -->
    </a>
  </div>
</template>

<script lang="ts" setup>

</script>

<style module>
.root a:hover {
  background-color: #25bc50;
  color: #000;
  padding: 8px;
  line-height: 24px;
}
.root {
  display: block;
  text-align: center;
  width: 100%;
  height: 80px;
}

.github_img {
  width: 32px;
  height: 32px;
  fill: #25bc50;
}

/* .root a:hover .github_img path {
  fill: #000;
} */
</style>
