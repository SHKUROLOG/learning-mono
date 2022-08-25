<template>
  <div v-if="category"
       :class="$style.root">
    <div v-if="!editMode"
         v-text="category.title"
         :class="$style.title"/>
    <div v-else>
      <CategoryEditForm v-model:category="category"/>

      <CategoryRemove :category="category"/>
    </div>
    <div>
      <CategoryThemes :themes="category.themes"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { editMode } from '../store/editmode'
import { CategoryDto } from '@learning-mono/shared'
import { api } from '../api'
import { CategoryRemove } from '../components/CategoryRemove'
import { CategoryThemes } from '../components/CategoryThemes'
import { CategoryEditForm } from '../components/CategoryEditForm'

interface Props {
  categoryId: string
}

const props = defineProps<Props>()

const category = ref<CategoryDto | null>(null)

watchEffect(async () => {
  category.value = await api.category.getById(props.categoryId)
})
</script>

<style module>
.root {
  display: grid;
  text-align: left;
  padding: 16px;
  align-items: start;
  justify-items: start;
}
.title {
  padding: 16px 0;
}
</style>
