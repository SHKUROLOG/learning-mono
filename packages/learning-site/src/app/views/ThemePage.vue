<template>
  <div v-if="themeData" :class="$style.themes">
    <h1>{{ themeData.title }}</h1>
    <div :class="$style.title">
      {{ currentQuestion.title }}
      ({{ index + 1 }} OF {{ shuffledQuestions.length }})
    </div>
    <div v-for="answer in currentQuestion.answers"
         :key="answer.id"
         :class="$style.answer"
         @click="handleAnswerClick(answer)">
      > {{ answer.title }}
    </div>
    <button :class="$style.next" @click="moveToNext">
      SKIP
    </button>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch, watchEffect } from 'vue'
import { Answer } from '@app/types'
import { shuffle } from 'lodash'
import { themeData } from '@app/store/themeData'
import { useRouter } from 'vue-router'
import { api } from '@app/api'

interface Props {
  themeId: string
}

const router = useRouter()

const props = defineProps<Props>()

const index = ref(0)

function moveToNext() {
  if (shuffledQuestions.value.length - 1 > index.value)
    ++index.value
}

function handleAnswerClick(answer: Answer) {
  answer.isSelected = true
  moveToNext()
}

const currentQuestion = computed(() => shuffledQuestions.value[index.value])

const shuffledQuestions = computed(() => shuffle(themeData.value?.questions ?? []))

watchEffect(async () => {
  themeData.value = await api.getTheme(props.themeId)
})

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
}
.answer {
  transition: all 0.3s ease-in-out;
  user-select: none;
  cursor: pointer;
  padding: 8px;
}

.answer:hover {
  transform: scale(1.04) translateX(4px);
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
