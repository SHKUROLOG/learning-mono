<template>
  <div v-if="editMode"
       :class="$style.root"
       @click="openForm = true">
    <div v-if="!openForm"
         :class="$style.plus">
      +
    </div>
    <div v-if="openForm">
      <BaseInput v-model="createCategoryForm.title"
                 placeholder="Category title"/>

      <BaseInput v-model="createCategoryForm.image"
                 placeholder="Link to image"/>

      <BaseButton v-if="createCategoryForm.title.trim()"
                  :class="$style.create_btn"
                  text="Create"
                  :buttonSize="ButtonSize.L"
                  @click.stop="createCategory"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { api } from '../../api'
import { editMode } from '../../store/editmode'
import { CreateCategoryInput } from '@learning-mono/shared'
import { BaseInput } from '../BaseInput'
import { BaseButton, ButtonSize } from '../BaseButton'
import { CreateCategoryEmits } from './CreateCategory.emits'

const emit = defineEmits<CreateCategoryEmits>()

const openForm = ref(false)

const createCategoryForm = ref(createForm())

async function createCategory() {
  await api.category.create(createCategoryForm.value)
  createCategoryForm.value = createForm()
  openForm.value = false

  emit('created')
}

function createForm(): CreateCategoryInput {
  return {
    title: '',
    image: '',
  }
}
</script>

<style module>
.root {
  /* display: grid; */
  text-align: center;
  justify-content: center;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  user-select: none;
  backdrop-filter: blur(3px);
  border-radius: 2px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  position: relative;
  min-height: 150px;
}

.plus {
  font-weight: bold;
  font-size: 100px;
  opacity: 0.1;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
}

.create_btn {
  width: 100%;
}

.root:hover {
  box-shadow: 0px 1px 3px 1px rgba(0, 255, 0, 0.3);
  border: 2px solid rgba(33, 234, 94, 0.5);
}

.root:hover .plus {
  opacity: 1;
}
</style>
