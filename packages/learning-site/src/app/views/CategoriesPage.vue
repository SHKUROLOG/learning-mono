<template>
  <div :class="$style.root">
    <div v-for="cat in categories"
         :key="cat.id"
         :class="$style.category">
      <div :class="$style.image"
           :style="{ backgroundImage: `url('${cat.image}')` }"/>

      <router-link v-text="cat.title"
                   :class="$style.link"
                   :to="{ name: 'category', params: { categoryId: cat.id } }"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { Category } from '@app/types'

const categories = ref<Category[]>([])

watchEffect(async () => {
  categories.value = await fetch('http://localhost:3030/categories')
    .then(v => v.json())
})
</script>

<style module>
.root {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(auto, 300px));
  grid-gap: 24px;
  justify-content: center;
}
.category {
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
.category:hover {
  box-shadow: 0 2px 5px 0 rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.5);
}
.image {
  position: absolute;
  width: 100%;
  height: 100%;
  transition: all 0.3s ease-in-out;
  opacity: 0;
  pointer-events: none;
  left: 0;
  top: 0;
  transform: rotate(-15deg) translateY(70%);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.category:hover .image {
  opacity: 0.7;
  transform: rotate(0) translateY(0);
}
.link {
  display: block;
  width: 100%;
  height: 100%;
  position: relative;
  transition: all 0.3s ease-in-out;
  padding: 8px;
  box-sizing: border-box;
}

.category:hover .link {
  background: rgba(0, 0, 0, 0.15);
}
</style>
