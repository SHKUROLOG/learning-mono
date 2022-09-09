<template>
  <span v-text="view" :class="[$style.text, { [$style.cube]: isRunning }]"/>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { BaseTextProps } from './BaseText.props'
import { textManager } from './TextManager'

const props = defineProps<BaseTextProps>()

const view = ref('')
const index = ref(0)
const isRunning = ref(false)

onMounted(() => textManager.add(run))

function * run() {
  isRunning.value = true

  while (index.value < props.text.length)
    yield writeNextChar()

  isRunning.value = false
}

function writeNextChar() {
  view.value += props.text[index.value]
  index.value++
}
</script>

<style module>
.cube::after {
  content: "▋";
}
</style>
