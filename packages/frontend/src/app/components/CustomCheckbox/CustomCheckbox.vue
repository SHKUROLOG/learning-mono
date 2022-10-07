<template>
  <section v-if="group">
    <input type="radio"
           :checked="isChecked"
           :class="$style.radio"
           :value="value"
           :name="group"
           @input="emit('click')">
  </section>
</template>

<script lang="ts" setup>
import { CustomCheckboxProps, CustomCheckboxEmits } from './CustomCheckbox.props'

defineProps<CustomCheckboxProps>()
const emit = defineEmits<CustomCheckboxEmits>()
</script>

<style module>
.radio {
  cursor: pointer;
  margin-left: 10px;
  accent-color: #25bc50;
  outline: 2px solid rgba(37, 188, 80, 0.3);
  appearance: none;
  border: 8px solid transparent;
  border-radius: 50%;
}

.radio:focus-visible {
  outline-offset: 0;
}

.radio:hover {
  scale: 1.1;
  outline: 2px solid rgba(37, 188, 80, 1);
}

.radio:checked {
  outline-color: rgba(37, 188, 80, 0.3);
  background-color: rgba(37, 188, 80, 1);

  animation: outline-checked;
  animation-duration: 0.1s;
  animation-iteration-count: 4;
  animation-direction: alternate;
  animation-timing-function: linear;
}

@keyframes outline-checked {
  0% {
      outline-offset: 0;
  }

  100% {
      outline-offset: -0.2rem;
  }
}
</style>
