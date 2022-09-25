<template>
  <div :class="$style.root">
    <BaseButton v-if="!openForm"
                text="Create theme"
                :class="$style.create_theme"
                :buttonSize="ButtonSize.M"
                @click="openForm = true"/>

    <div v-if="openForm"
         :class="$style.create_form">
      <BaseInput v-model="createThemeForm.title"
                 placeholder="Theme title"
                 :border="true"/>

      <BaseButton v-if="createThemeForm.title.trim()"
                  text="Create"
                  :class="$style.create_btn"
                  :buttonSize="ButtonSize.M"
                  @click.stop="createTheme"/>
    </div>
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

async function createTheme() {
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
.root {
  text-align: center;
}
.create_theme {
  font-size: 16px;
  font-weight: bold;
  width: 100%;
}

.create_form {
  display: flex;

}

.create_btn {
  font-size: 16px;
  font-weight: bold;
}
</style>
