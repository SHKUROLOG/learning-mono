<template>
  <div v-if="category">
    <div :class="$style.root">
      <template v-if="!editMode">
        <div :class="$style.explore">
          <ExploreBar :categoryTitle="category.title"/>
        </div>

        <div :class="$style.content">
          <CategoryThemes :themes="category.themes"/>
        </div>
      </template>
    </div>

    <template v-if="editMode">
      <div :class="$style.root_edit">
        <CategoryEditForm v-model:category="category"
                          @changed="fetchCategory"/>

        <ThemeEditMode v-for="theme in category?.themes"
                       :key="theme.id"
                       :theme="theme"
                       @changed="fetchCategory"/>

        <CreateTheme :categoryId="parseInt(categoryId)"
                     @created="fetchCategory"/>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { editMode } from '../store/editmode'
import { CategoryDto } from '@learning-mono/shared'
import { api } from '../api'
import { CategoryThemes } from '../components/CategoryThemes'
import { CategoryEditForm } from '../components/CategoryEditForm'
import { CreateTheme } from '../components/CreateTheme'
import { ThemeEditMode } from '../components/ThemeEditMode'
import { ExploreBar } from '../components/ExploreBar'

interface Props {
  categoryId: string;
}

const props = defineProps<Props>()

const category = ref<CategoryDto | null>(null)

watchEffect(fetchCategory)

async function fetchCategory() {
  category.value = await api.category.getById(props.categoryId)
}
</script>

<style module>
.root {
  display: grid;
  grid-template-columns: max-content 1fr;
  justify-items: start;
  user-select: none;
}

.root_edit {
  display: grid;
  grid-template-columns: 1fr;
  max-width: 700px;
  margin: 0 auto;
}

.explore {
  height: 100%;
}

.content {

}
.title {
  display: block;
  padding: 16px 0;
  user-select: none;
  align-items: center;
}
</style>
