<template>
  <div v-if="category" :class="$style.category">
    {{ category.title }}
    <div v-for="theme in category.themes"
         :key="theme.id"
         :class="$style.themes">
      <router-link :to="{ name: 'theme', params: { themeId: theme.id } }">
        {{ theme.title }}
      </router-link>
    </div>

    <router-link :to="{ name: 'categories' }">
      Back
    </router-link>
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
.category {
  display: grid;
  grid-gap: 10px;
  grid-auto-rows: minmax(20px, auto);
  background: rgba( 240, 240, 240, 0.25 );
  box-shadow: 0 8px 32px 0 rgba(218, 219, 231, 0.37);
  backdrop-filter: blur( 7px );
  -webkit-backdrop-filter: blur( 7px );
  border-radius: 10px;
  border: 1px solid rgba( 255, 255, 255, 0.25 );
  width: 1000px;
}
.themes {
  border-radius: 20px;
  /*width: 500px;*/
  /*background-color: rgba(43, 43, 44, 0.85);*/
}
.themes:hover {
  transform: scale(1.1);

}
</style>
