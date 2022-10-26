<template>
  <div v-if="themeData"
       :class="$style.root">
    <template v-if="!editMode">
      <div :class="$style.content">
        <ExploreBar :themeTitle="themeData.title"/>

        <div v-if="!editMode && currentQuestion">
          <ProgressBar :ammount="shuffledQuestions.length"
                       :class="$style.progress_bar"
                       :current="index"
                       :correctItems="correctItems"/>

          <div :class="$style.title">
            <h1 :key="currentQuestion.id">
              <BaseText :text="currentQuestion.title"/>
            </h1>

            <hr width="90%"
                color="#25bc50"
                size="2px"
                style="margin: auto; margin-bottom: 18px; opacity: 0.3;">

            ({{ index +1 }} OF {{ shuffledQuestions.length }})
          </div>

          <div :key="currentQuestion.id">
            <AnswerRow v-for="answer in shuffledAnswers"
                       :key="answer.id"
                       :answer="answer"
                       @click="handleAnswerClick(answer)"/>
          </div>

          <BaseButton :buttonSize="ButtonSize.L"
                      text=">>>"
                      :class="$style.next"
                      @click="moveToNext"/>
        </div>
      </div>
    </template>

    <div v-if="editMode"
         :class="$style.question_edit">
      <QuestionEditForm v-for="question in shuffledQuestions"
                        :key="question.id"
                        :question="question"
                        @changed="fetchTheme"/>

      <CreateQuestion :class="$style.create_btn"
                      :themeId="parseInt(themeId)"
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
import { AnswerDto, QuestionDto } from '@learning-mono/shared'
import { BaseButton, ButtonSize } from '../components/BaseButton'
import { AnswerRow } from '../components/AnswerRow'
import { QuestionEditForm } from '../components/QuestionEditForm'
import { editMode } from '../store/editmode'
import { ProgressBar } from '../components/ProgressBar'
import { CreateQuestion } from '../components/CreateQuestion'
import { BaseText } from '../components/BaseText'
import { ExploreBar } from '../components/ExploreBar'

interface Props {
  themeId: string
}

const props = defineProps<Props>()

const router = useRouter()

const index = ref(0)

function moveToNext() {
  if (shuffledQuestions.value.length > index.value)
    ++index.value
}

function isQuestionCorrect(question: QuestionDto) {
  return question.answers.some(answer => answer.isSelected && answer.isCorrect)
}

function handleAnswerClick(answer: AnswerDto) {
  answer.isSelected = true

  moveToNext()
}

const currentQuestion = computed(() => shuffledQuestions.value[index.value])

const shuffledQuestions = computed(() => {
  if (editMode.value)
    return (themeData.value?.questions ?? [])

  return shuffle(themeData.value?.questions ?? [])
})

const shuffledAnswers = computed(() => {
  if (editMode.value)
    return (currentQuestion.value.answers ?? [])

  return shuffle(currentQuestion.value.answers ?? [])
})

const correctItems = computed(() => shuffledQuestions.value.map(isQuestionCorrect))

watchEffect(fetchTheme)

async function fetchTheme() {
  themeData.value = await api.theme.getById(props.themeId)
}

watch(
  () => index.value === shuffledQuestions.value.length && index.value,
  value => value && router.push({ name: 'statistic' }),
)

// whenever(
//   () => index.value === shuffledQuestions.value.length,
//   () => router.push({
//     name: 'statistic',
//   }),
// )

//
</script>

<style module>
.root {

}

.content {
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-auto-flow: column;
  text-align: left;
  padding: 16px;
  align-items: start;
  justify-items: start;
  user-select: none;
  width: 700px;
}

.explore {
  height: 320px;
}

.next {
  background: transparent;
  color: #25bc50;
  margin-left: 40px;
  margin-top: 40px;
  font-size: 18px;
  opacity: 0.4;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  user-select: none;
}

.next:hover {
  opacity: 1;
  background: #25bc50;
  color: #000;
}

.progress_bar {
  margin-left: 36px;
}
.title {
  margin: 40px 0 40px 40px;
}

.question_edit {
  display: grid;
  margin: 10px;
  /* grid-template-columns: repeat(auto-fill, 350px); */
  grid-template-columns: 1fr;
  grid-gap: 10px;
}

.create_btn {
  display: block;
  width: 100%;
}
</style>
