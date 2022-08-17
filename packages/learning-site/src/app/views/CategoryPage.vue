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

    <CategoryThemes :themes="category.themes"/>
  </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { Category } from '@app/types'
import { api } from '@app/api'
import CategoryThemes from '@app/components/CategoryThemes/CategoryThemes.vue'
import CategoryEditForm from '@app/components/CategoryEditForm/CategoryEditForm.vue'
import CategoryRemove from '@app/components/CategoryRemove/CategoryRemove.vue'
import { editMode } from '@app/store/editmode'

interface Props {
  categoryId: string
}

const props = defineProps<Props>()

const category = ref<Category | null>(null)

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
