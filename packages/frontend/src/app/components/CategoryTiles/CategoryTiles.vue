<template>
  <div ref="cards"
       :class="$style.cards"
       :style="{ '--mouse-x': `${x}px`, '--mouse-y': `${y}px` }"
       @mousemove="handleMouseMove">
    <div v-for="category in categories"
         :key="category.id"
         :class="$style.card">
      <div :class="$style.card_content">
        {{ category.title }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { CategoryTileProps } from './CategoryTiles.props'

const props = defineProps<CategoryTileProps>()

const x = ref(0)
const y = ref(0)
const card = ref<HTMLDivElement>()

function handleMouseMove(e: MouseEvent): void {
  if (!card.value)
    return

  const rect = card.value.getBoundingClientRect()

  x.value = e.clientX - rect.left
  y.value = e.clientY - rect.top
}
</script>

<style module>
.cards {
  display: grid;
  grid-template-columns: repeat(4, max-content);
}

#cards:hover > .card::after {
  opacity: 1;
}

.card {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  height: 260px;
  flex-direction: column;
  position: relative;
  width: 300px;
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
  transition: opacity 500ms;
  width: 100%;
}

.card::before {
  background: radial-gradient(
    800px circle at var(--mouse-x) var(--mouse-y),
    rgba(255, 255, 255, 0.06),
    transparent 40%
  );
  z-index: 3;
}

.card::after {
  background: radial-gradient(
    600px circle at var(--mouse-x) var(--mouse-y),
    rgba(255, 255, 255, 0.4),
    transparent 40%
  );
  z-index: 1;
}

.card > .card_content {
  background-color: #000;
  border-radius: inherit;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  inset: 1px;
  padding: 10px;
  position: absolute;
  z-index: 2;
}
</style>
