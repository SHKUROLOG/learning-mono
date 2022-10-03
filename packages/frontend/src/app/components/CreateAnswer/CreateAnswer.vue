<template>
  <div v-if="questionId"
       :class="$style.root">
    <BaseButton v-if="!openForm"
                text="Create answer"
                :class="$style.create_answer"
                :buttonSize="ButtonSize.M"
                @click="openForm = true"/>

    <div v-if="openForm"
         :class="$style.create_form">
      <BaseInput v-model="createAnswerForm.title"
                 placeholder="Answer title"
                 :border="true"/>

      <input v-model="createAnswerForm.isCorrect"
             type="radio"
             @click="createAnswerForm.isCorrect = !createAnswerForm.isCorrect">

      <BaseButton v-if="createAnswerForm.title.trim()"
                  text="Create"
                  :class="$style.create_btn"
                  :buttonSize="ButtonSize.M"
                  @click.stop="createAnswer"/>
    </div>
  </div>
  <h1 v-else>NO PROPS</h1>
</template>

<script lang="ts" setup>
import { CreateAnswerInput } from '@learning-mono/shared'
import { ref } from 'vue'
import { api } from '../../api'
import { ButtonSize, BaseButton } from '../BaseButton'
import { BaseInput } from '../BaseInput'
import { CreateAnswerEmits, CreateAnswerProps } from './CreateAnswer.props'

const props = defineProps<CreateAnswerProps>()
const emit = defineEmits<CreateAnswerEmits>()

// const showw = ref(false)

// setTimeout(() => showw.value = !showw.value, 3000)

const openForm = ref(false)

const createAnswerForm = ref(createForm())

function createForm(): CreateAnswerInput {
  return {
    title: '',
    questionId: props.questionId,
    isCorrect: false,
  }
}

async function createAnswer() {
  await api.answer.create(createAnswerForm.value)
  createAnswerForm.value = createForm()
  openForm.value = false

  emit('created')
}
</script>

<style module>
.root {
  text-align: center;
}
.create_answer {
  font-size: 16px;
  font-weight: bold;
  width: 100%;
}

.create_form {
  display: flex;

}

.create_btn {
  font-size: 16px;
  font-weight: bold;
}
</style>
