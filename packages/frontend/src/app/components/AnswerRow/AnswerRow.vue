<template>
  <div :class="$style.root">
    <BaseText :text="'> ' + answer.title"/>
  </div>
</template>

<script lang="ts" setup>
import { AnswerRowProps } from './AnswerRow.props'
import { BaseText } from '../BaseText'

defineProps<AnswerRowProps>()
</script>

<style module>
.root {
  transition: all 0.3s ease-in-out;
  user-select: none;
  cursor: pointer;
  padding: 8px;
  margin-left: 40px;
}

.root:hover {
  transform: scale(1.04) translateX(4px);
  color: #000;
  background: linear-gradient(to right, #14d071, #19e57c);
}
</style>
