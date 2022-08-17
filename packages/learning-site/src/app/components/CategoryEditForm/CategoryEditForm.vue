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
import { CategoryCreateForm, CategoryEditFormEmits, CategoryEditFormProps } from './CategoryEditForm.props'
import BaseInput from '@app/components/BaseInput/BaseInput.vue'
import BaseButton from '@app/components/BaseButton/BaseButton.vue'
import { ref } from 'vue'
import { api } from '@app/api'
import { editMode } from '@app/store/editmode'
import { isEqual } from 'lodash'
import { user } from '@app/store/user'

const props = defineProps<CategoryEditFormProps>()
const emit = defineEmits<CategoryEditFormEmits>()

const currentForm = ref(createForm())

const initialForm = createForm()

function createForm(): CategoryCreateForm {
  return {
    title: props.category.title,
    image: props.category.image,
    categoryId: props.category.id,
  }
}

async function saveCategory() {
  const updatedCategory = await api.category.update(currentForm.value)
  emit('update:category', updatedCategory)
}

if (!initialForm.title && !initialForm.image && user.value)
  editMode.value = true
</script>

<style>

</style>
