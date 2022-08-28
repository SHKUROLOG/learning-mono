<template>
  <div :class="$style.root">
    <BaseInput v-model="answer.title"
               placeholder="Answer title"/>

    <input v-model="currentForm.isCorrect"
           :class="$style.checkbox"
           type="checkbox">

    <BaseSaveRemoveButtons :currentForm="currentForm"
                           :initialForm="initialForm"
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

const props = defineProps<AnswersEditFormProps>()

const emits = defineEmits<AnswersEditFormEmits>()

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
  await api.question.update(currentForm.value)
}

async function removeAnswer(id: number) {
  await api.question.remove(id)
}
</script>

<style module>
.root {
  display: grid;
  grid-auto-flow: column;
  /*align-items: start;*/
  /*padding-left: 16px;*/
  /*grid-template-columns: 1fr;*/
  /*grid-column: 2;*/
}
.checkbox {
  width: 10px;
}
</style>
