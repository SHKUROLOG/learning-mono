<template>
  <div v-if="answer" :class="$style.root">
    <BaseText :text="`> ${answer.title}`" />
  </div>
</template>

<script lang="ts" setup>
import { BaseText } from '../BaseText'
import type { AnswerRowProps } from './AnswerRow.props'

defineProps<AnswerRowProps>()
</script>

<style module>
.root {
  transition: all 0.3s ease-in-out;
  user-select: none;
  cursor: pointer;
  padding: 8px;
  color: #25bc50c0;
  transition: 0.3s ease-in-out;
}

.root:hover {
  transform: scale(1.05) translateX(4px);
  color: #25bc50;
  /* background: #25bc50; */
}
</style>
