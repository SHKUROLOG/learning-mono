<template>
  <BaseInput v-model="currentForm.title"
             placeholder="Theme title"/>

  <BaseButton v-if="!isEqual(currentForm, initialForm)"
              text="Save changes"
              @click="saveTheme"/>
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
</script>

<style>

</style>
