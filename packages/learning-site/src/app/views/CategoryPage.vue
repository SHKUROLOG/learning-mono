<template>
  <div v-if="category"
       :class="$style.root">
    <div v-text="category.title"
         :class="$style.title"/>

    <CategoryThemes :themes="category.themes"/>
  </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { Category } from '@app/types'
import { api } from '@app/api'
import CategoryThemes from '@app/components/CategoryThemes/CategoryThemes.vue'

interface Props {
  categoryId: string
}

const props = defineProps<Props>()

const category = ref<Category | null>(null)

watchEffect(async () => {
  category.value = await api.getCategory(props.categoryId)
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
