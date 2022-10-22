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
import { ref, toRef, watch } from 'vue'
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

const initialForm = ref(createForm())

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

watch(toRef(props, 'question'), () => {
  initialForm.value = createForm()
  currentForm.value = createForm()
}, { deep: true })
</script>

<style module>
.root {
  display: grid;
  margin: 0 auto;
  max-width: 700px;
  border-left: 2px solid rgba(37, 188, 80, 0.3);
  grid-template-rows: max-content max-content;
  grid-template-columns: minmax(auto, 700px);
}

.question {
  display: grid;
  grid-template-columns: 1fr max-content;
  grid-auto-flow: column;
}

.answer {
  display: block;
}
</style>
