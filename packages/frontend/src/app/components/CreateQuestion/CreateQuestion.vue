<template>
  <div :class="$style.root"
       @click="openForm = true">
    <div v-if="!openForm"
         :class="$style.plus">
      +
    </div>
    <div v-if="openForm"
         :class="$style.create_question">
      <textarea v-model="createQuestionForm.title"
                :class="$style.textarea"
                placeholder="Question title"/>

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
  box-sizing: border-box;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  user-select: none;
  backdrop-filter: blur(3px);
  border-radius: 2px;
  border: 2px solid rgba(37, 188, 80, 0.1);
  position: relative;
  min-height: 150px;
}
.plus {
  display: grid;
  align-items: center;
  text-align: center;
  line-height: 100%;
  height: 100%;
  font-weight: bold;
  font-size: 100px;
  opacity: 0.1;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
}
.create_question {
  display: grid;
  grid-template-rows: 1fr max-content;
  box-sizing: border-box;
  font-size: 16px;
  font-weight: bold;
  width: 100%;
  height: 100%;
}

.textarea {
  box-sizing: border-box;
  resize: none;
  padding: 8px;
  font-size: 18px;
  font-weight: bold;
  color: #25bc50;
  background: transparent;
  outline: none;
  border: none;
  width: 100%;
  height: 100%;
}

.textarea::placeholder {
  color: #25bc50;
  opacity: 0.3;
}

.textarea:focus {
  outline: none;
}

.root:hover {
  border: 2px solid #25bc50;
  box-shadow: 0px 1px 3px 1px rgba(0, 255, 0, 0.3);
}

.create_btn {
  font-size: 16px;
  font-weight: bold;
  width: 100%;
}
</style>
