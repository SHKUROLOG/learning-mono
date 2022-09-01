<template>
  <div v-if="editMode"
       :class="$style.create"
       @click="openForm = true">
    <div v-if="openForm">
      <BaseInput v-model="createCategoryForm.title"
                 placeholder="Category title"/>

      <BaseInput v-model="createCategoryForm.image"
                 placeholder="Link to image"/>

      <BaseButton v-if="createCategoryForm.title.trim()"
                  text="Create"
                  :buttonSize="ButtonSize.L"
                  @click.stop="createCategory"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { api } from '../../api'
import { editMode } from '../../store/editmode'
import { CreateCategoryInput } from '@learning-mono/shared'
import { BaseInput } from '../BaseInput'
import { BaseButton, ButtonSize } from '../BaseButton'
import { CreateCategoryEmits } from './CreateCategory.emits'

const emit = defineEmits<CreateCategoryEmits>()

const openForm = ref(false)

const createCategoryForm = ref(createForm())

async function createCategory() {
  await api.category.create(createCategoryForm.value)
  createCategoryForm.value = createForm()
  openForm.value = false

  emit('created')
}

function createForm(): CreateCategoryInput {
  return {
    title: '',
    image: '',
  }
}
</script>

<style module>
.create {
  display: grid;
  justify-content: center;
  font-family: "JetBrains Mono ExtraBold", monospace;
  font-size: 24px;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  user-select: none;
  backdrop-filter: blur(3px);
  border-radius: 2px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  min-height: 150px;
}
lox.{}
</style>
