<template>
  <div v-if="category"
       :class="$style.root">
    <div v-if="!editMode"
         :class="$style.grid">
      <div :class="$style.explore">
        <ExploreBar :categoryTitle="category.title"/>
      </div>

      <div :class="$style.content">
        <CategoryThemes :themes="category.themes"/>
      </div>
    </div>

    <div v-else>
      <CategoryEditForm v-model:category="category"
                        @changed="fetchCategory"/>

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
  text-align: left;
  padding: 16px;
  align-items: start;
  justify-items: start;
  user-select: none;

  /* display: grid; */
  /* grid-template-columns: 5% 1fr; */
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
}

.grid {
  display: grid;
  /* grid-template-columns: 1fr 1fr; */
}

.explore {
  /* grid-column-start: 1; */
  /* margin-bottom: 16px; */
  /* grid-area: 1 / 1 / NaN / NaN; */
}

.content {
  grid-column-start: 2;
  /* grid-area: 1 / 2 / 2 / 3; */
}
.title {
  display: flex;
  padding: 16px 0;
  user-select: none;
  align-items: center;
}
</style>
