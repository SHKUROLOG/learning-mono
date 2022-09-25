<template>
  <div :class="[$style.root, {
    [$style.root_border] : border,
  }]">
    <div :class="$style.container">
      <input :class="$style.input"
             v-bind="$attrs"
             type="text"
             :placeholder="placeholder"
             :value="modelValue"
             @input.stop="$emit('update:modelValue', $event.target.value)">
    </div>
  </div>
</template>

<script lang="ts" setup>
import { BaseInputEmits, BaseInputProps } from './BaseInput.props'

defineProps<BaseInputProps>()
defineEmits<BaseInputEmits>()
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<style module>
.root {
  box-sizing: border-box;
  display: grid;
  padding: 10px;
  justify-self: end;
}

.root_border {
  border-left: 3px solid rgba(37, 190, 80, 0.3);
}

.root_border:hover {
  border-left: 3px solid rgba(37, 190, 80, 1);
}

.input {
  background: transparent;
  font-size: 16px;
  font-weight: 700;
  color: #25bc50;
  border: none;
  width: 200px;
  border-bottom: 2px solid transparent;
  transition: all 0.3s ease-in-out;
  padding: 4px;
}

.input::placeholder {
  color: #25bc50;
}

.input:focus {
  outline: none;
  border-bottom: 2px solid #25bc50;
}

.container {
  opacity: 0.8;
  transition: all 0.2s ease-in-out;
}

.container:hover {
  opacity: 1;
}
</style>
