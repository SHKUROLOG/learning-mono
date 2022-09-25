<template>
  <div :class="$style.root">
    <BaseButton v-if="!openForm"
                text="Create question"
                :class="$style.create_question"
                :buttonSize="ButtonSize.M"
                @click="openForm = true"/>
    <div v-if="openForm"
         :class="$style.create_form">
      <BaseInput v-model="createQuestionForm.title"
                 placeholder="Question title"
                 :border="true"/>

      <BaseButton v-if="createQuestionForm.title.trim()"
                  text="Create"
                  :class="$style.create_btn"
                  :buttonSize="ButtonSize.M"
                  @click.stop="createCategory"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { api } from '../../api'
import { CreateQuestionInput } from '@learning-mono/shared'
import { BaseInput } from '../BaseInput'
import { BaseButton, ButtonSize } from '../BaseButton'
import { CreateQuestionEmits, CreateQuestionProps } from './CreateQuestion.props'

const props = defineProps<CreateQuestionProps>()
const emit = defineEmits<CreateQuestionEmits>()

const openForm = ref(false)

const createQuestionForm = ref(createForm())

async function createCategory() {
  await api.question.create(createQuestionForm.value)
  createQuestionForm.value = createForm()
  openForm.value = false

  emit('created')
}

function createForm():CreateQuestionInput {
  return {
    title: '',
    themeId: props.themeId,
  }
}
</script>

<style module>
.root {
  text-align: center;
}
.create_question {
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
