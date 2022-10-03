<template>
  <div :class="$style.root"
       @click="openForm = true">
    <div v-if="!openForm"
         :class="$style.plus">
      +
    </div>
    <div v-if="openForm"
         :class="$style.edit_form">
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
  display: grid;
  /* justify-content: stretch; */
  text-align: center;
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
  height: 100%;
  font-weight: bold;
  font-size: 100px;
  opacity: 0.1;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
}

.edit_form {
  display: grid;
  justify-items: center;
  grid-template-rows: repeat(3, 1fr);
  height: 100%;
  width: 100%;

}

.create_btn {
  /* height: 100%; */

  vertical-align: bottom;
  margin-top: auto;
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
