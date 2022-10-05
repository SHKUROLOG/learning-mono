<template>
  <div :class="$style.root"
       @click="openForm = true">
    <div v-if="!openForm"
         :class="$style.plus">
      +
    </div>
    <div v-if="openForm"
         :class="$style.create_form">
      <div>
        <BaseInput v-model="createCategoryForm.title"
                   placeholder="Category title"/>

        <BaseInput v-model="createCategoryForm.image"
                   placeholder="Link to image"/>
      </div>

      <BaseButton v-if="createCategoryForm.title.trim()"
                  :class="$style.create_btn"
                  text="Create"
                  :buttonSize="ButtonSize.M"
                  @click.stop="createCategory"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { api } from '../../api'
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
  box-sizing: border-box;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  user-select: none;
  backdrop-filter: blur(3px);
  border-radius: 2px;
  border: 2px solid rgba(37, 188, 80, 0.1);
  position: relative;
  min-height: 150px;
}

.plus {
  display: grid;
  align-items: center;
  text-align: center;
  line-height: 100%;
  height: 100%;
  font-weight: bold;
  font-size: 100px;
  opacity: 0.1;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
}

.create_form {
  display: grid;
  grid-template-rows: 1fr max-content;
  box-sizing: border-box;
  font-size: 16px;
  font-weight: bold;
  width: 100%;
  height: 100%;
}

.create_btn {
  font-size: 16px;
  font-weight: bold;
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
