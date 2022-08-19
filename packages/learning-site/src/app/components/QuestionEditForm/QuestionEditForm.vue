<template>
  <div v-if="editMode">
    <BaseButton text="Edit form" @click="addState = !addState"/>

    <div v-if="addState">
      <input v-model="addForm.title"
             type="text"
             placeholder="Text question">

      <div v-for="(answer, index) in addForm.answers"
           :key="index">
        <input v-model="answer.title"
               type="text"
               placeholder="answers">

        <input v-model="answer.isCorrect"
               type="checkbox">

        <BaseButton text="Remove answer"
                    @click="removeAnswerForm(answer)"/>
      </div>

      <BaseButton text="Add Answer"
                  @click="addAnswerForm"/>

      <BaseButton text="Add Changes"
                  @click="saveQuestionAndAnswers"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { api } from '../../api'
import { editMode } from '../../store/editmode'
import { CreateAnswerInput, CreateQuestionInput } from '@learning-mono/shared'
import { BaseButton } from '../BaseButton'

interface Props {
  themeId: string
}

const props = defineProps<Props>()

const addState = ref(false)

const addForm = ref<CreateQuestionInput>({
  title: '',
  themeId: parseInt(props.themeId),
  answers: [],
})

function removeAnswerForm(removeAnswer: CreateAnswerInput) {
  addForm.value.answers = addForm.value.answers?.filter(answer => answer !== removeAnswer)
}

function addAnswerForm() {
  addForm.value.answers?.push({
    title: '',
    isCorrect: false,
  })
}

async function saveQuestionAndAnswers() {
  await api.question.create(addForm.value)
}
</script>

<style module>

</style>
