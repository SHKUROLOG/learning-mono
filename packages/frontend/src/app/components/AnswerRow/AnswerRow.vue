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
  /* color: #25bc50c0; */
  color: #25bc50;
  opacity: 0.8;
  transition: opacity 0.3s;
  border-left: 2px solid #25bc50c0;
}

.root:hover {
  transform: scale(1.05) translateX(4px);
  /* color: #25bc50; */
  opacity: 0.8;
  border-left: 2px solid #25bc50;
  /* background: #25bc50; */
}
</style>
