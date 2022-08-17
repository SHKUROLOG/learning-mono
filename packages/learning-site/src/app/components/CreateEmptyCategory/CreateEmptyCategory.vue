<template>
  <div v-if="editMode"
       :class="$style.create"
       @click="createEmptyCategory">
    +
  </div>
</template>

<script lang="ts" setup>
import { api } from '@app/api'
import { editMode } from '@app/store/editmode'
import { ref } from 'vue'

interface CreateCategoryForm {
  title: string
  image: string
}

const emptyCategoryForm = ref<CreateCategoryForm>({
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
