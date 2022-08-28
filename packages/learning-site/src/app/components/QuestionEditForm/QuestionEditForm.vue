<template>
  <div :class="$style.root">
    <BaseInput v-model="currentForm.title"
               placeholder="Question title"/>

    <BaseSaveRemoveButtons :initialForm="initialForm"
                           :currentForm="currentForm"
                           @save="saveQuestion"
                           @remove="removeQuestion(currentForm.id)"/>
  </div>

  <AnswerEditForm v-for="answer in question.answers"
                  :key="answer.id"
                  :answer="answer"/>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { api } from '../../api'
import { UpdateQuestionInput } from '@learning-mono/shared'
import BaseInput from '../BaseInput/BaseInput.vue'
import { QuestionEditFormEmits, QuestionEditFormProps } from './QuestionEditForm.props'
import { AnswerEditForm } from '../AnswerEditForm'
import BaseSaveRemoveButtons from '../BaseSaveRemoveButtons/BaseSaveRemoveButtons.vue'

const props = defineProps<QuestionEditFormProps>()

const emits = defineEmits<QuestionEditFormEmits>()

const initialForm = createForm()

const currentForm = ref(createForm())

function createForm(): UpdateQuestionInput {
  return {
    title: props.question.title,
    id: props.question.id,
  }
}

async function saveQuestion() {
  await api.question.update(currentForm.value)
}

async function removeQuestion(id: number) {
  await api.question.remove(id)
}
</script>

<style module>
.root {
  display: grid;
  justify-content: left;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr;
}
</style>
