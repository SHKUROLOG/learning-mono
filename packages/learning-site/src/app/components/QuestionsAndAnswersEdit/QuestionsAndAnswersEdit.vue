<template/>

<script lang="ts" setup>
import { QuestionsAndAnswersEditProps } from './QuestionsAndAnswersEdit.props'
import { UpdateQuestionInput } from '@learning-mono/shared'
import { ref } from 'vue'
import { api } from '../../api'
import AnswerEditForm from '../AnswerEditForm/AnswerEditForm.vue'
import QuestionEditForm from '../QuestionEditForm/QuestionEditForm.vue'

const props = defineProps<QuestionsAndAnswersEditProps>()

// const initialForm = createForm()
//
// const currentForm = ref(createForm())
//
// // function createForm(): UpdateQuestionInput {
// //   return {
// //     title: props.questions.title,
// //     id: props.questions.id,
// //   }
// // }
//
// async function saveQuestion() {
//   await api.question.update(currentForm.value)
// }
//
// async function removeQuestion(id: number) {
//   await api.question.remove(id)
// }
</script>

<style module>

</style>
