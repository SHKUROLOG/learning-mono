<template>
  <div :class="$style.root">
    <BaseInput v-model="currentForm.title"
               :class="$style.input"
               placeholder="Theme title"
               :border="true"/>

    <div :class="$style.buttons">
      <BaseSaveRemoveButtons :isSaveShow="!isEqual(currentForm, initialForm)"
                             @save="saveTheme"
                             @remove="removeTheme(currentForm.id)"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { BaseInput } from '../BaseInput'
import { isEqual } from 'lodash'
import { ThemeEditModeEmits, ThemeEditModeProps } from './ThemeEditMode.props'
import { ref } from 'vue'
import { UpdateThemeInput } from '@learning-mono/shared'
import { api } from '../../api'
import BaseSaveRemoveButtons from '../BaseSaveRemoveButtons/BaseSaveRemoveButtons.vue'

const props = defineProps<ThemeEditModeProps>()
const emit = defineEmits<ThemeEditModeEmits>()

const currentForm = ref(createForm())

const initialForm = createForm()

function createForm(): UpdateThemeInput {
  return {
    title: props.theme.title,
    id: props.theme.id,
  }
}

async function saveTheme() {
  await api.theme.update(currentForm.value)

  emit('changed')
}

async function removeTheme(themeId: number) {
  await api.theme.remove(themeId)

  emit('changed')
}
</script>

<style module>
.root {
  display: grid;
  grid-auto-flow: column;
  justify-content: start;
}

.buttons {
  transition: all 0.3s ease-in-out;
  opacity: 0.3;
  pointer-events: none;
}

.root:hover .buttons {
  opacity: 1;
  pointer-events: all;
}
</style>
