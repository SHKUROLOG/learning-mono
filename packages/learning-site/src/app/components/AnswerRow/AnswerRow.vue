<template>
  <div :class="$style.root">
    > {{ answer.title }}

    <BaseButton v-if="editMode"
                text="Remove answer"
                @click.stop="removeAnswer(answer.id)"/>
  </div>
</template>

<script lang="ts" setup>
import { AnswerRowProps } from './AnswerRow.props'
import { BaseButton } from '@app/components/BaseButton'
import { api } from '@app/api'
import { editMode } from '@app/store/editmode'

async function removeAnswer(answerId: number) {
  await api.answer.remove(answerId)
}

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
