<template>
  <div v-if="category"
       :class="$style.root">
    <div v-if="!editMode">
      <div v-text="category.title"
           :class="$style.title"/>

      <CategoryThemes :themes="category.themes"/>
    </div>

    <div v-else>
      <CategoryEditForm v-model:category="category"
                        @changed="fetchCategory"
                        @removed="removeCategory"/>

      <ThemeEditMode v-for="theme in category.themes"
                     :key="theme.id"
                     :theme="theme"
                     @changed="fetchCategory"/>

      <CreateTheme :categoryId="parseInt(categoryId)"
                   @created="fetchCategory"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { editMode } from '../store/editmode'
import { CategoryDto } from '@learning-mono/shared'
import { api } from '../api'
import { CategoryThemes } from '../components/CategoryThemes'
import { CategoryEditForm } from '../components/CategoryEditForm'
import { useRouter } from 'vue-router'
import { CreateTheme } from '../components/CreateTheme'
import { ThemeEditMode } from '../components/ThemeEditMode'

const router = useRouter()

interface Props {
  categoryId: string
}

const props = defineProps<Props>()

const category = ref<CategoryDto | null>(null)

function removeCategory() {
  router.push({ name: 'home' })
}

watchEffect(fetchCategory)

async function fetchCategory() {
  category.value = await api.category.getById(props.categoryId)
}
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
