<template>
  <BaseButton v-if="!openForm"
              text="Create theme"
              :buttonSize="ButtonSize.M"
              @click="openForm = true"/>
  <div v-if="openForm">
    <BaseInput v-model="createThemeForm.title"
               placeholder="Theme title"/>

    <BaseButton v-if="createThemeForm.title.trim()"
                text="Create"
                :buttonSize="ButtonSize.M"
                @click.stop="createCategory"/>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { api } from '../../api'
import { CreateThemeInput } from '@learning-mono/shared'
import { BaseInput } from '../BaseInput'
import { BaseButton, ButtonSize } from '../BaseButton'
import { CreateThemeEmits, CreateThemeProps } from './CreateTheme.props'

const props = defineProps<CreateThemeProps>()
const emit = defineEmits<CreateThemeEmits>()

const openForm = ref(false)

const createThemeForm = ref(createForm())

async function createCategory() {
  await api.theme.create(createThemeForm.value)
  createThemeForm.value = createForm()
  openForm.value = false

  emit('created')
}

function createForm():CreateThemeInput {
  return {
    title: '',
    categoryId: props.categoryId,
  }
}
</script>

<style module>

</style>
