<template>
  <div :class="$style.root">
    <CategoryTile v-for="category in categories"
                  :key="category.id"
                  :category="category"/>
  </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { Category } from '@app/types'
import { api } from '@app/api'
import CategoryTile from '@app/components/CategoryTile/CategoryTile.vue'

const categories = ref<Category[]>([])

watchEffect(async () => {
  categories.value = await api.getCategories()
})
</script>

<style module>
.root {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(auto, 300px));
  grid-gap: 24px;
  justify-content: center;
}
</style>
