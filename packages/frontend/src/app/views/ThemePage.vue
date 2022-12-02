<template>
  <div v-if="themeData">
    <template v-if="!editMode">
      <div :class="$style.root">
        <ExploreBar :themeTitle="themeData.title"/>

        <div v-if="!editMode && currentQuestion"
             :class="$style.right_content">
          <ProgressBar :ammount="shuffledQuestions.length"
                       :current="index"
                       :correctItems="correctItems"/>

          <div :class="$style.question_answers">
            <div :class="$style.question_title">
              <h1 :key="currentQuestion.id">
                <BaseText :text="currentQuestion.title"/>
              </h1>

              <hr width="100%"
                  color="#25bc50"
                  size="2px"
                  style="margin: auto; margin-bottom: 8px; opacity: 0.3;">

              ({{ index +1 }} OF {{ shuffledQuestions.length }})
            </div>

            <div :key="currentQuestion.id">
              <AnswerRow v-for="answer in shuffledAnswers"
                         :key="answer.id"
                         :answer="answer"
                         @click="handleAnswerClick(answer)"/>
            </div>
          </div>

          <SkipButton :class="$style.next"
                      @click="moveToNext"/>
        </div>
      </div>
    </template>

    <div v-show="editMode"
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
import { AnswerRow } from '../components/AnswerRow'
import { QuestionEditForm } from '../components/QuestionEditForm'
import { editMode } from '../store/editmode'
import { ProgressBar } from '../components/ProgressBar'
import { CreateQuestion } from '../components/CreateQuestion'
import { BaseText } from '../components/BaseText'
import { ExploreBar } from '../components/ExploreBar'
import { SkipButton } from '../components/SkipButton'

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
  display: grid;
  grid-template-columns: max-content 1fr;
  box-sizing: border-box;
  justify-items: start;
  user-select: none;
  height: 79vh;
  width: 90%;
}

.right_content {
  display: grid;
  grid-template-rows: max-content 1fr max-content;
  height: 100%;
  margin-left: 40px;
}

.explore {
  max-height: 320px;
}

.question_title {
  box-sizing: border-box;
  margin: 30px 0;
}

.next {
  opacity: 0.4;
}

.next:hover {
  opacity: 1;
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
