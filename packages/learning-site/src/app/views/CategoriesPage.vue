<template>
  <div :class="$style.root">
    <CategoryTile v-for="category in categories"
                  :key="category.id"
                  :category="category"/>

    <CreateEmptyCategory/>
  </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { Category } from '@app/types'
import { api } from '@app/api'
import CategoryTile from '@app/components/CategoryTile/CategoryTile.vue'
import CreateEmptyCategory from '@app/components/CreateEmptyCategory/CreateEmptyCategory.vue'

const categories = ref<Category[]>([])

watchEffect(async () => {
  categories.value = await api.category.getAll()
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
