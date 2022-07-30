<template>
  <div v-if="category">
    <router-link :to="{ name: 'categories' }">
      Back
    </router-link>

    {{ category.title }}
  </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { Category } from '@app/types'

interface Props {
  id: string
}

const props = defineProps<Props>()

const category = ref<Category>()

watchEffect(async () => {
  category.value = await fetch(`http://localhost:3030/categories/${props.id}`)
    .then(v => v.json())
})
</script>

<style module>

</style>
