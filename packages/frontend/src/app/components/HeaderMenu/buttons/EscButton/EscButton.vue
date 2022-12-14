<template>
  <router-link :class="$style.esc" to="/">
    [Esc]
  </router-link>
</template>

<style module>
.esc {
  padding: 8px 16px;
  font-family: 'VT323', monospace;
  /* font-family: 'DotGothic16', sans-serif; */
  font-size: 1.4rem;
  opacity: 1;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  user-select: none;
  border: 1px solid #25bc50;
  border-radius: 2px;
  height: 40px;
  box-sizing: border-box;
}
.esc:hover {
  opacity: 1;
  background: #25bc50;
  color: #000;
}
</style>
