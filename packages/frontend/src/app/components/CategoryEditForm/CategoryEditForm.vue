<template>
  <div v-if="editMode"
       :class="$style.root">
    <BaseInput v-model="currentForm.title"
               placeholder="Category title"/>

    <BaseInput v-model="currentForm.image"
               placeholder="Link to image"/>

    <BaseSaveRemoveButtons :isSaveShow="!isEqual(currentForm, initialForm)"
                           @save="saveCategory"
                           @remove="removeCategory(currentForm.id)"/>
  </div>
</template>

<script lang="ts" setup>
import { CategoryEditFormEmits, CategoryEditFormProps } from './CategoryEditForm.props'
import { ref, toRef, watch } from 'vue'
import { api } from '../../api'
import { user } from '../../store/user'
import { editMode } from '../../store/editmode'
import { UpdateCategoryInput } from '@learning-mono/shared'
import { BaseInput } from '../BaseInput'
import { BaseSaveRemoveButtons } from '../BaseSaveRemoveButtons'
import { useRouter } from 'vue-router'
import { isEqual } from 'lodash'

const router = useRouter()

const props = defineProps<CategoryEditFormProps>()
const emit = defineEmits<CategoryEditFormEmits>()

const currentForm = ref(createForm())
const initialForm = ref(createForm())

function createForm(): UpdateCategoryInput {
  return {
    title: props.category.title,
    image: props.category.image,
    id: props.category.id,
  }
}

async function saveCategory() {
  await api.category.update(currentForm.value)

  emit('changed')
}

async function removeCategory(id: number) {
  await api.category.remove(id)

  router.push({ name: 'home' })

  emit('changed')
}

watch(toRef(props, 'category'), () => {
  initialForm.value = createForm()
  currentForm.value = createForm()
}, { deep: true })

if (!initialForm.value.title && !initialForm.value.image && user.value?.isAdmin)
  editMode.value = true
</script>

<style module>
.root {
  justify-content: center;
  font-size: 24px;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  user-select: none;
  backdrop-filter: blur(3px);
  border-radius: 2px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  position: relative;
  min-height: 150px;
  margin-bottom: 20px;
}
.root:hover {
  box-shadow: 0px 1px 3px 1px rgba(0, 255, 0, 0.3);
  border: 2px solid rgba(33, 234, 94, 0.5);
}
</style>
