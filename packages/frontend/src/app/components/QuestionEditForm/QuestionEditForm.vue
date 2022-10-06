<template>
  <div v-if="question"
       :class="$style.root">
    <div :class="$style.question">
      <BaseInput v-model="currentForm.title"
                 placeholder="Question title"
                 :border="true"/>

      <BaseSaveRemoveButtons :isSaveShow="!isEqual(currentForm, initialForm)"
                             @save="saveQuestion"
                             @remove="removeQuestion(currentForm.id)"/>
    </div>

    <div :class="$style.answers">
      <AnswerEditForm v-for="answer in question.answers"
                      :key="answer.id"
                      :answer="answer"
                      @changed="$emit('changed')"
                      @correct:toggle="handleCorrectToggle(answer)"/>

      <CreateAnswer :questionId="question.id"
                    @created="$emit('changed')"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { api } from '../../api'
import { AnswerDto, UpdateQuestionInput } from '@learning-mono/shared'
import { BaseInput } from '../BaseInput'
import { QuestionEditFormEmits, QuestionEditFormProps } from './QuestionEditForm.props'
import { AnswerEditForm } from '../AnswerEditForm'
import { BaseSaveRemoveButtons } from '../BaseSaveRemoveButtons'
import { isEqual } from 'lodash'
import { CreateAnswer } from '../CreateAnswer'

const props = defineProps<QuestionEditFormProps>()
const emit = defineEmits<QuestionEditFormEmits>()

const initialForm = createForm()

const currentForm = ref(createForm())

function createForm(): UpdateQuestionInput {
  return {
    title: props.question.title,
    id: props.question.id,
  }
}

async function handleCorrectToggle(answer: AnswerDto) {
  const answers = props.question.answers.map(a => ({
    ...a,
    isCorrect: a === answer,
  }))

  await api.question.update({
    ...currentForm.value,
    answers,
  })

  emit('changed')
}

async function saveQuestion() {
  await api.question.update(currentForm.value)

  emit('changed')
}

async function removeQuestion(id: number) {
  await api.question.remove(id)

  emit('changed')
}
</script>

<style module>
.root {
  /* margin: 20px; */
  /* display: grid;
  justify-content: left;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr; */
}

.question {
  display: flex;
}

.answer {
  display: block;
}
</style>
