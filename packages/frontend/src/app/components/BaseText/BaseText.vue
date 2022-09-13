<template>
  <span v-text="view"
        :class="[$style.text, { [$style.cube]: printer?.isActive }]"/>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, ref, watch } from 'vue'
import { BaseTextProps } from './BaseText.props'
import { Printer } from './Printer'
import { printManager } from './PrintManager'

const props = defineProps<BaseTextProps>()

const view = ref('')
const printer = ref<Printer>()

// onMounted(() => printManager.add(printer.value))
onBeforeUnmount(() => printer.value && printManager.remove(printer.value))

function setView(value: string) {
  view.value = value
}

watch(() => props.text, (value) => {
  const oldPrinter = printer.value

  printer.value = new Printer(value, setView)
  printManager.add(printer.value)

  oldPrinter && printManager.remove(oldPrinter)
}, { immediate: true })
</script>

<style module>
.cube::after {
  content: "▋";
}
</style>
