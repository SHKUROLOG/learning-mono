<template>
  <div v-if="editMode">
    <BaseInput v-model="currentForm.title"
               placeholder="Category title"/>

    <BaseInput v-model="currentForm.image"
               placeholder="Link to image"/>

    <BaseButton v-if="!isEqual(currentForm, initialForm)"
                text="Save"
                @click="saveCategory"/>
  </div>
</template>

<script lang="ts" setup>
import { CategoryEditFormEmits, CategoryEditFormProps } from './CategoryEditForm.props'
import { ref } from 'vue'
import { isEqual } from 'lodash'
import { api } from '../../api'
import { user } from '../../store/user'
import { editMode } from '../../store/editmode'
import { UpdateCategoryInput } from '@learning-mono/shared'
import { BaseInput } from '../BaseInput'
import { BaseButton } from '../BaseButton'

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

if (!initialForm.title && !initialForm.image && user.value?.isAdmin)
  editMode.value = true
</script>

<style>

</style>
