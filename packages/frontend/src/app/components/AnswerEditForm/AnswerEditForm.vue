<template>
  <div :class="$style.root">
    <BaseInput v-model="currentForm.title"
               placeholder="Answer title"/>

    <input v-model="currentForm.isCorrect"
           :class="$style.checkbox"
           type="checkbox">

    <BaseSaveRemoveButtons :isSaveShow="!isEqual(currentForm, initialForm)"
                           @save="saveAnswer"
                           @remove="removeAnswer(currentForm.id)"/>
  </div>
</template>

<script lang="ts" setup>
import { BaseInput } from '../BaseInput'
import { AnswersEditFormEmits, AnswersEditFormProps } from './AnswersEditFormProps'
import { api } from '../../api'
import { UpdateAnswerInput } from '@learning-mono/shared'
import { ref } from 'vue'
import { BaseSaveRemoveButtons } from '../BaseSaveRemoveButtons'
import { isEqual } from 'lodash'

const props = defineProps<AnswersEditFormProps>()

const emit = defineEmits<AnswersEditFormEmits>()

const initialForm = createForm()

const currentForm = ref(createForm())

function createForm(): UpdateAnswerInput {
  return {
    title: props.answer.title,
    id: props.answer.id,
    isCorrect: props.answer.isCorrect,
  }
}

async function saveAnswer() {
  await api.answer.update(currentForm.value)
  emit('changed')
}

async function removeAnswer(id: number) {
  await api.answer.remove(id)
  emit('changed')
}
</script>

<style module>
.root {
  display: grid;
  grid-auto-flow: column;
}
.checkbox {
  width: 10px;
}
</style>
