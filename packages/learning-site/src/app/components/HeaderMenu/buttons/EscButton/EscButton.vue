<template>
  <router-link :class="$style.esc" to="/">
    Esc
  </router-link>
</template>

<style module>
.esc {
  padding: 8px 16px;
  font-size: 18px;
  opacity: 0.8;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  user-select: none;
}
.esc:hover {
  opacity: 1;
  background: rgba(255, 255, 255, 0.05);
}
</style>
