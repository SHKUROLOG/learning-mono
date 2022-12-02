<template>
  <button :class="$style.button">
    SKIP <span> >>> </span>
  </button>
</template>

<script lang="ts" setup>

</script>

<style module lang="scss">
.button {
  font-family: 'VT323', monospace;
  font-size: 1.6rem;
  border: none;
  background-color: transparent;
  border: 1px solid #25bc50;
  border-radius: 2px;
  color: #25bc50;
  padding: 8px;
  cursor: pointer;
  transition: 0.4s ease-in-out;
  max-width: 140px;
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
