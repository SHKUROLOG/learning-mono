<template>
  <div :class="[$style.root, {
    [$style.root_border] : border,
  }]">
    <div :class="$style.container">
      <!-- <input :class="$style.input"
             v-bind="$attrs"
             type="textarea"
             :placeholder="placeholder"
             :value="modelValue"
             @input.stop="$emit('update:modelValue', $event.target.value)"> -->

      <textarea v-bind="$attrs"
                ref="el"
                v-model="modelValue"
                :class="$style.input"
                :placeholder="placeholder"
                @input.stop="handleInput"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { BaseInputEmits, BaseInputProps } from './BaseInput.props'

const props = defineProps<BaseInputProps>()
const emit = defineEmits<BaseInputEmits>()

const el = ref<HTMLTextAreaElement>()

function handleInput(event: Event): void {
  if (!(event.target instanceof HTMLInputElement))
    return

  emit('update:modelValue', event.target.value)
}

watch([el, () => props.modelValue], ([el]) => {
  if (!el)
    return

  el.style.height = `${el.scrollHeight}px`
})
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<style module>
.root {
  box-sizing: border-box;
  /* display: grid; */
  padding: 10px;
}

.root_border {
  border-left: 3px solid rgba(37, 190, 80, 0.3);
}

.root_border:hover {
  border-left: 3px solid rgba(37, 190, 80, 1);
}

.input {
  background: transparent;
  resize : none;
  outline: none;
  border: none;
  overflow-y: auto;
  overflow: hidden;
  word-wrap: break-word;
  font-size: 18px;
  font-weight: 700;
  color: #25bc50;
  width: 100%;
  border-bottom: 1px solid transparent;
  transition: all 0.3s ease-in-out;
}

.input::placeholder {
  color: #25bc50;
}

.input:focus {
  outline: none;
  border-bottom: 1px solid #25bc50;
}

.container {
  opacity: 0.8;
  transition: all 0.2s ease-in-out;
}

.container:hover {
  opacity: 1;
}
</style>
