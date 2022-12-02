<template>
  <button :class="$style.button"
          @click="$router.go(-2)">
    <span> &lt; &lt; &lt; </span> GO TO THEMES
  </button>
</template>

<script lang="ts" setup>

</script>

<style module lang="scss">
.button {
  position: absolute;
  top: 19px;
  left: 130px;
  font-family: 'VT323', monospace;
  height: 40px;
  font-size: 1.6rem;
  border: none;
  background-color: transparent;
  border: 1px solid #25bc50;
  border-radius: 2px;
  color: #25bc50;
  padding: 0 8px;
  cursor: pointer;
  transition: 0.4s ease-in-out;

  /* display: flex; */
  /* justify-content: center; */

  &:hover {
    color: #000000;
    background-color: #25bc50;
    animation: bounceright;
  }
}

@keyframes bounceright {
  from { transform: translateX(0); }
  to   { transform: translateX(3px); }
}
</style>
