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
import BaseButton from '@app/components/BaseButton/BaseButton.vue'
import { api, SaveAnswerInput, SaveQuestionInput } from '@app/api'
import { ref } from 'vue'
import { editMode } from '@app/store/editmode'

interface Props {
  themeId: string
}

const props = defineProps<Props>()

const addState = ref(false)

const addForm = ref<SaveQuestionInput>({
  title: '',
  themeId: parseInt(props.themeId),
  answers: [],
})

function removeAnswerForm(removeAnswer: SaveAnswerInput) {
  addForm.value.answers = addForm.value.answers.filter(answer => answer !== removeAnswer)
}

function addAnswerForm() {
  addForm.value.answers.push({
    title: '',
  })
}

async function saveQuestionAndAnswers() {
  await api.question.create(addForm.value)
}
</script>

<style module>

</style>
