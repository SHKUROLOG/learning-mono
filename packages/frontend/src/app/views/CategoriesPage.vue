<template>
  <div :class="$style.root">
    <CategoryTile v-for="category in categories"
                  :key="category.id"
                  :category="category"/>

    <CreateCategory @created="fetchCategories"/>
  </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { CategoryDto } from '@learning-mono/shared'
import { api } from '../api'
import { CreateCategory } from '../components/CreateCategory'
import { CategoryTile } from '../components/CategoryTile'

const categories = ref<CategoryDto[]>([])

watchEffect(fetchCategories)

async function fetchCategories() {
  categories.value = await api.category.getAll()
}
</script>

<style module>
.root {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(auto, 300px));
  grid-gap: 24px;
  justify-content: center;
  text-align: center;
}
</style>
