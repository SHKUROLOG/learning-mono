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
  opacity: 1;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  user-select: none;
  background-color: transparent;
  border: none;
  color: #25bc50;
  font-family: 'JetBrains Mono', monospace;
  font-weight: bold;
  font-size: 18px;
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
  background: #25bc50;
  color: #000;
}
</style>
