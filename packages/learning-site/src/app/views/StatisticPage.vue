<template>
  <div :class="$style.summary">
    Correct: {{ amountCorrectAnswers }} of {{ questions.length }} ({{ (percent * 100).toFixed(2) }}%)
  </div>

  <div :class="$style.stat">
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
import { themeData } from '@app/store/themeData'
import { computed } from 'vue'
import { Answer, Question } from '@app/types'

const questions = computed(() => themeData.value?.questions ?? [])

const isCorrectAnswers = computed(
  () => questions.value.map(isQuestionCorrect),
)

const amountCorrectAnswers = computed(() => isCorrectAnswers.value.filter(Boolean).length)

const percent = computed(() => amountCorrectAnswers.value / questions.value.length)

function isQuestionCorrect(question: Question) {
  return question.answers.some(a => a.isSelected && a.isCorrect)
}

function getAnswerSign(answer: Answer) {
  if (answer.isSelected && !answer.isCorrect)
    return 'x'

  if (answer.isCorrect)
    return '✓'

  return ''
}
</script>

<style module>
.stat {
  display: grid;
  text-align: left;
  padding: 16px;
  align-items: start;
  justify-items: start;
}

.answer {
  display: grid;
  grid-template-columns: 24px 1fr;
  transition: all 0.3s ease-in-out;
  user-select: none;
  cursor: pointer;
  padding: 8px;
}

.question {
  margin: 24px 0;
}

.correct {
  opacity: 0.6;
}

.summary {
  text-align: left;
  padding: 16px;
}
</style>
