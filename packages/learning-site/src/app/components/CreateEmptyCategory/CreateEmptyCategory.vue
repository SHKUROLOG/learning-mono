<template>
  <div v-if="editMode"
       :class="$style.create"
       @click="createEmptyCategory">
    +
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { api } from '../../api'
import { editMode } from '../../store/editmode'
import { CreateCategoryInput } from '@learning-mono/shared'

const emptyCategoryForm = ref<CreateCategoryInput>({
  title: '',
  image: '',
})

async function createEmptyCategory() {
  await api.category.create(emptyCategoryForm.value)
}
</script>

<style module>
.create {
  justify-content: center;
  font-family: "JetBrains Mono ExtraBold", monospace;
  font-size: 24px;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  user-select: none;
  backdrop-filter: blur(3px);
  border-radius: 2px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  min-height: 150px;
}
</style>
