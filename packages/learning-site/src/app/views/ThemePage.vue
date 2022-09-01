<template>
  <div v-if="themeData"
       :class="$style.themes">
    <h1>{{ themeData.title }}</h1>

    <div v-if="!editMode">
      <div :class="$style.title">
        {{ currentQuestion.title }}
        ({{ index + 1 }} OF {{ shuffledQuestions.length }})
      </div>

      <AnswerRow v-for="answer in currentQuestion.answers"
                 :key="answer.id"
                 :answer="answer"
                 @click="handleAnswerClick(answer)"/>

      <BaseButton :buttonSize="ButtonSize.L"
                  text=">>>"
                  :class="$style.next"
                  @click="moveToNext"/>
    </div>

    <div v-if="editMode">
      <QuestionEditForm v-for="question in shuffledQuestions"
                        :key="question.id"
                        :question="question"
                        @changed="fetchTheme"/>

      <CreateQuestion :themeId="parseInt(themeId)"
                      @created="fetchTheme"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch, watchEffect } from 'vue'
import { shuffle } from 'lodash'
import { useRouter } from 'vue-router'
import { api } from '../api'
import { themeData } from '../store/themeData'
import { AnswerDto } from '@learning-mono/shared'
import { BaseButton, ButtonSize } from '../components/BaseButton'
import { AnswerRow } from '../components/AnswerRow'
import { QuestionEditForm } from '../components/QuestionEditForm'
import { editMode } from '../store/editmode'
import CreateQuestion from '../components/CreateQuestion/CreateQuestion.vue'

interface Props {
  themeId: string
}

const props = defineProps<Props>()

const router = useRouter()

const index = ref(0)

function moveToNext() {
  if (shuffledQuestions.value.length - 1 > index.value)
    ++index.value
}

function handleAnswerClick(answer: AnswerDto) {
  answer.isSelected = true
  moveToNext()
}

const currentQuestion = computed(() => shuffledQuestions.value[index.value])

const shuffledQuestions = computed(() => shuffle(themeData.value?.questions ?? []))

watchEffect(fetchTheme)

async function fetchTheme() {
  themeData.value = await api.theme.getById(props.themeId)
}

watch(
  () => index.value + 1 === shuffledQuestions.value.length,
  value => value && router.push({
    name: 'statistic',
  }),
)
</script>

<style module>
.themes {
  display: grid;
  text-align: left;
  padding: 16px;
  align-items: start;
  justify-items: start;
  user-select: none;
}

.next {
  background: transparent;
  color: aliceblue;
  border: 0;
  padding: 8px;
  font-size: 18px;
  opacity: 0.4;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  user-select: none;
}
.next:hover {
  opacity: 1;
  background: rgba(255, 255, 255, 0.05);
}

.title {
  padding: 8px 0;
}
</style>
