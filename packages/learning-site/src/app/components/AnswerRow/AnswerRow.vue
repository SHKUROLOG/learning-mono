<template>
  <div :class="$style.root">
    > {{ answer.title }}
  </div>
</template>

<script lang="ts" setup>
import { AnswerRowProps } from './AnswerRow.props'

defineProps<AnswerRowProps>()
</script>

<style module>
.root {
  transition: all 0.3s ease-in-out;
  user-select: none;
  cursor: pointer;
  padding: 8px;
}

.root:hover {
  transform: scale(1.04) translateX(4px);
}
</style>
