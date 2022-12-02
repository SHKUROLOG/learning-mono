<template>
  <div :class="$style.summary">
    [ Correct: {{ amountCorrectAnswers }} of {{ questions.length }} ({{ (percent * 100).toFixed(2) }}%) ]
    <!-- <hr width="100%" color="#19e57c"> -->
  </div>

  <BackButton/>

  <div :class="$style.root">
    <div v-for="(question, index) in questions"
         :key="question.id"
         :class="[$style.question, isCorrectAnswers[index] && $style.correct]">
      {{ question.title }}

      <div v-for="answer in question.answers"
           :key="answer.id"
           :class="$style.answer">
        <div v-text="getAnswerSign(answer)"
             :class="$style.sign"/>

        <div v-text="answer.title"
             :class="$style.title"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { themeData } from '../store/themeData'
import { AnswerDto, QuestionDto } from '@learning-mono/shared'
import { BackButton } from '../components/BackButton'

const questions = computed(() => themeData.value?.questions ?? [])

const isCorrectAnswers = computed(
  () => questions.value.map(isQuestionCorrect),
)

const amountCorrectAnswers = computed(() => isCorrectAnswers.value.filter(Boolean).length)

const percent = computed(() => amountCorrectAnswers.value / questions.value.length)

function isQuestionCorrect(question: QuestionDto) {
  return question.answers.some(a => a.isSelected && a.isCorrect)
}

function getAnswerSign(answer: AnswerDto) {
  if (answer.isSelected && !answer.isCorrect)
    return 'x'

  if (answer.isCorrect)
    return '✓'

  return ''
}
</script>

<style module>
.root {
  display: grid;
  text-align: left;
  margin-left: 16px;
  align-items: start;
  justify-items: start;
}

.answer {
  display: grid;
  grid-template-columns: 24px 1fr;
  transition: all 0.3s ease-in-out;
  cursor: default;
  padding: 8px;
}

.question {
  padding-left: 16px;
  border-left: 3px solid #ff0000;
  margin: 24px 0;
}

.correct {
  border-left: 3px solid #19e57c;
}

.summary {
  text-align: center;
  padding: 16px;
}
</style>
