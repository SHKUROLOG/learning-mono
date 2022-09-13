<template>
  <div :class="$style.root">
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
  display: grid;
  padding: 16px;
  justify-self: end;
}

.input {
  background: transparent;
  color: #19e57c;
  border: none;
  width: 200px;
  border-bottom: 1px solid transparent;
  transition: all 0.3s ease-in-out;
  padding: 4px;
}

.input::placeholder {
  color: #0fc66c;
}

.input:focus {
  outline: none;
  border-bottom: 1px solid #19e57c;
}

.container {
  opacity: 0.8;
  transition: all 0.2s ease-in-out;
}

.container:hover {
  opacity: 1;
}
</style>
