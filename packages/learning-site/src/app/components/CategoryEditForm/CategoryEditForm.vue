<template>
  <div v-if="editMode"
       :class="$style.category_edit">
    <BaseInput v-model="currentForm.title"
               placeholder="Category title"/>

    <BaseSaveRemoveButtons :currentForm="currentForm"
                           :initialForm="initialForm"
                           @save="saveCategory"
                           @remove="removeCategory(currentForm.id)"/>

    <BaseInput v-model="currentForm.image"
               placeholder="Link to image"/>
  </div>
</template>

<script lang="ts" setup>
import { CategoryEditFormEmits, CategoryEditFormProps } from './CategoryEditForm.props'
import { ref } from 'vue'
import { api } from '../../api'
import { user } from '../../store/user'
import { editMode } from '../../store/editmode'
import { UpdateCategoryInput } from '@learning-mono/shared'
import { BaseInput } from '../BaseInput'
import BaseSaveRemoveButtons from '../BaseSaveRemoveButtons/BaseSaveRemoveButtons.vue'

const props = defineProps<CategoryEditFormProps>()
const emit = defineEmits<CategoryEditFormEmits>()

const currentForm = ref(createForm())

const initialForm = createForm()

function createForm(): UpdateCategoryInput {
  return {
    title: props.category.title,
    image: props.category.image,
    id: props.category.id,
  }
}

async function saveCategory() {
  const updatedCategory = await api.category.update(currentForm.value)
  emit('update:category', updatedCategory)
}

async function removeCategory(id: number) {
  const removedCategory = await api.category.remove(id)
  emit('remove:category', removedCategory)
}

if (!initialForm.title && !initialForm.image && user.value?.isAdmin)
  editMode.value = true
</script>

<style module>
.category_edit {
  display: grid;
  /*grid-template-rows: 1fr 1fr;*/
  grid-template-columns: 1fr 1fr;
}
</style>
