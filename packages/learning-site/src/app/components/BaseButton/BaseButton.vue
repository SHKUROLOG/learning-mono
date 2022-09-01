<template>
  <button :class="[$style.btn, $style[`btn_${buttonSize}`]]">
    {{ text }}
  </button>
</template>

<script lang="ts" setup>
import { BaseButtonProps, ButtonSize } from './BaseButton.props'

withDefaults(defineProps<BaseButtonProps>(), {
  buttonSize: 'm' as ButtonSize,
})
</script>

<style module>
.btn {
  opacity: 0.8;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  user-select: none;
  background-color: transparent;
  border: none;
  color: aliceblue;
}

.btn_s {
  padding: 4px 8px;
  font-size: 10px;
}

.btn_m {
  padding: 6px 12px;
  font-size: 14px;
}

.btn_l {
  padding: 8px 16px;
  font-size: 18px;
}

.btn:hover {
  opacity: 1;
  background: rgba(255, 255, 255, 0.05);
}
</style>
