<template>
  <div v-if="category"
       :class="$style.category">
    <div v-text="category.title"
         :class="$style.title"/>

    <div v-for="theme in category.themes"
         :key="theme.id"
         :class="$style.theme">
      <router-link v-text="`> ${theme.title}`"
                   :to="{ name: 'theme', params: { themeId: theme.id } }"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { Category } from '@app/types'

interface Props {
  categoryId: string
}

const props = defineProps<Props>()

const category = ref<Category | null>(null)

watchEffect(async () => {
  category.value = await fetch(`http://localhost:3030/categories/${props.categoryId}`)
    .then(v => v.json())
})
</script>

<style module>
.title {
  padding: 16px 0;
}
.category {
  display: grid;
  text-align: left;
  padding: 16px;
  align-items: start;
  justify-items: start;
}
.theme {
  transition: all 0.3s ease-in-out;
  user-select: none;
  cursor: pointer;
  padding: 8px;
}
.theme:hover {
  transform: scale(1.04) translateX(4px);
}
</style>
