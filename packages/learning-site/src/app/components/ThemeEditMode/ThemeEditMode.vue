<template>
  <div :class="$style.root">
    <BaseInput v-model="currentForm.title"
               placeholder="Theme title"/>

    <div :class="$style.buttons">
      <BaseButton v-if="!isEqual(currentForm, initialForm)"
                  text="Save"
                  @click="saveTheme"/>

      <BaseButton text="Remove"
                  @click="removeTheme(currentForm.id)"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { BaseButton } from '../BaseButton'
import { BaseInput } from '../BaseInput'
import { isEqual } from 'lodash'
import { ThemeEditModeProps } from './ThemeEditMode.props'
import { ref } from 'vue'
import { UpdateThemeInput } from '@learning-mono/shared'
import { api } from '../../api'

const props = defineProps<ThemeEditModeProps>()

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
}

async function removeTheme(themeId: number) {
  await api.theme.remove(themeId)
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
  opacity: 0;
  pointer-events: none;
}

.root:hover .buttons {
  opacity: 1;
  pointer-events: all;
}
</style>
