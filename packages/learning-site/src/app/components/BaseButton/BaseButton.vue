<template>
  <button :class="$style.btn">
    {{ text }}
  </button>
</template>

<script lang="ts" setup>
interface Props {
  text: string
}

defineProps<Props>()
</script>

<style module>
.btn {
  padding: 8px 16px;
  font-size: 18px;
  opacity: 0.8;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  user-select: none;
  background-color: transparent;
  border: none;
  color: aliceblue;
}
.btn:hover {
  opacity: 1;
  background: rgba(255, 255, 255, 0.05);
}
</style>
