<template>
  <div v-if="category"
       :class="$style.root">
    <div v-if="!editMode">
      <div :class="$style.glitch">
        <h1 :class="$style.line">
          {{ category.title }}
        </h1>
      </div>

      <hr width="100%" color="#19e57c">

      <CategoryThemes :themes="category.themes"/>
    </div>

    <div v-else>
      <CategoryEditForm v-model:category="category"
                        @changed="fetchCategory"
                        @removed="removeCategory"/>

      <ThemeEditMode v-for="theme in category.themes"
                     :key="theme.id"
                     :theme="theme"
                     @changed="fetchCategory"/>

      <CreateTheme :categoryId="parseInt(categoryId)" @created="fetchCategory"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { editMode } from '../store/editmode'
import { CategoryDto } from '@learning-mono/shared'
import { api } from '../api'
import { CategoryThemes } from '../components/CategoryThemes'
import { CategoryEditForm } from '../components/CategoryEditForm'
import { useRouter } from 'vue-router'
import { CreateTheme } from '../components/CreateTheme'
import { ThemeEditMode } from '../components/ThemeEditMode'

const router = useRouter()

interface Props {
  categoryId: string;
}

const props = defineProps<Props>()

const category = ref<CategoryDto | null>(null)

function removeCategory() {
  router.push({ name: 'home' })
}

watchEffect(fetchCategory)

async function fetchCategory() {
  category.value = await api.category.getById(props.categoryId)
}
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
  display: flex;
  padding: 16px 0;
  user-select: none;
  align-items: center;
}

/* ANIMATION */

/* .glitch {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
}

.glitch div {
  animation: glitch 1s linear infinite;
}

@keyframes glitch{
  2%,64%{
    transform: translate(1px,0) skew(0deg);
  }
  4%,60%{
    transform: translate(-1px,0) skew(0deg);
  }
  62%{
    transform: translate(0,0) skew(5deg);
  }
}

div:before,
div:after{
  content: attr(title);
  position: absolute;
  left: 0;
}

div:before{
  animation: glitchTop 250ms linear infinite;
  clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
  -webkit-clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
}

@keyframes glitchTop{
  2%,64%{
    transform: translate(2px,-2px);
  }
  4%,60%{
    transform: translate(-2px,2px);
  }
  62%{
    transform: translate(2px,-1px) skew(-13deg);
  }
}

div:after{
  animation: glitchBotom 500ms linear infinite;
  clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%);
  -webkit-clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%);
}

@keyframes glitchBotom{
  2%,64%{
    transform: translate(-1px,0);
  }
  4%,60%{
    transform: translate(-1px,0);
  }
  62%{
    transform: translate(-1px,1px) skew(10deg);
  }
} */
</style>
