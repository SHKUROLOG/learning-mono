<template>
  <div :class="$style.BoxCategories">
    <div v-for="cat in categories"
         :key="cat.id"
         :class="$style.categoriesContent"
         class="app">
      <router-link :to="{ name: 'category', params: { categoryId: cat.id } }">
        {{ cat.title }}
      </router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { Category } from '@app/types'

const categories = ref<Category[]>([])

watchEffect(async () => {
  categories.value = await fetch('http://localhost:3030/categories')
    .then(v => v.json())
})
</script>

<style module>
.BoxCategories {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-gap: 10px;
  grid-auto-rows: minmax(100px, auto);
  justify-content: center;
}
.categoriesContent {
  justify-content: center;
  font-family: "JetBrains Mono ExtraBold", monospace;
  font-size: 24px;
  background: rgba( 240, 240, 240, 0.25 );
  box-shadow: 0 8px 32px 0 rgba(218, 219, 231, 0.37);
  backdrop-filter: blur( 7px );
  -webkit-backdrop-filter: blur( 7px );
  border-radius: 10px;
  border: 1px solid rgba( 255, 255, 255, 0.25 );
}
.categoriesContent:hover {
  transform: scale(1.05);

}
</style>
