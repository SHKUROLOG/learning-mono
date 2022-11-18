<template>
  <div ref="cards"
       :class="$style.cards"
       @mousemove="handleMouseMove">
    <div v-for="category in categories"
         :key="category.id"
         :class="$style.card"
         :style="{ '--mouse-x': `${x}px`, '--mouse-y': `${y}px` }"
         @click="$router.push('category'+`/${category.id}`)">
      <div :class="$style.card_content">
        <div v-text="category.title"
             :class="$style.title"/>
        <img :class="$style.image" :src="`${getSvgUrl(category.image)}`">
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { CategoryTileProps } from './CategoryTiles.props'
import { router } from '../../router/index'

const props = defineProps<CategoryTileProps>()

function getSvgUrl(name: string): string {
  return new URL(`./icons/${name}.svg`, import.meta.url).pathname
}

// const svg = computed(() => getSvgUrl(props.category.image))

function handleClick() {
  // router.push()
}

const x = ref(0)
const y = ref(0)
const cards = ref<HTMLDivElement>()

function handleMouseMove(e: MouseEvent): void {
  if (!cards.value)
    return

  const rect = cards.value.getBoundingClientRect()

  x.value = e.clientX - rect.left
  y.value = e.clientY - rect.top
}
</script>

<style module>
.cards {
  display: grid;
  grid-template-columns: repeat(4, max-content);
  gap: 10px;
  justify-content: center;
}

.cards:hover > .card::after {
  opacity: 1;
}

.card {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  cursor: pointer;
  height: 200px;
  position: relative;
  width: 350px;
  margin-bottom: 32px;
}

.card:hover .title {
  opacity: 1;
}

.card:hover .image {
  opacity: 1;
}

.card:hover::before {
  opacity: 1;
}

.card::before,
.card::after {
  border-radius: inherit;
  content: "";
  height: 100%;
  left: 0px;
  opacity: 0;
  position: absolute;
  top: 0px;
  transition: opacity .5s;
  width: 100%;
}

.card::before {
  background: radial-gradient(
    800px circle at var(--mouse-x) var(--mouse-y),
    rgba(37, 188, 80, 0.16),
    transparent 40%
  );
  z-index: 3;
}

.card::after {
  background: radial-gradient(
    600px circle at var(--mouse-x) var(--mouse-y),
    rgba(37, 188, 80, 1),
    transparent 40%
  );
  z-index: 1;
}

.card > .card_content {
  background-color: #091f13;
  border-radius: inherit;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  inset: 2px;
  padding: 10px;
  position: absolute;
  z-index: 2;
}

.title {
  position: absolute;
  top: 100%;
  opacity: 0;
  align-self: center;
  font-size: 1.4rem;
  font-weight: bold;
  transition: opacity .5s;
  letter-spacing: 1px;
}

.image {
  opacity: 0.2;
  position: absolute;
  top: 10%;
  width: 100%;
  transition: opacity .5s;
}
</style>
