<template>
  <div :class="$style.root">
    <div :class="$style.image"
         :style="{ backgroundImage: `url(${svg})` }"/>

    <router-link v-text="category.title"
                 :class="$style.link"
                 :to="{ name: 'category', params: { categoryId: category.id } }"/>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { CategoryTileProps } from './CategoryTile.props'

const props = defineProps<CategoryTileProps>()

function getSvgUrl(name: string): string {
  return new URL(`./icons/${name}.svg`, import.meta.url).pathname
}

const svg = computed(() => getSvgUrl(props.category.image))
</script>

<style module>
.root {
  box-sizing: border-box;
  justify-content: center;
  text-align: center;
  font-size: 24px;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  user-select: none;
  backdrop-filter: blur(3px);
  border-radius: 2px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  position: relative;
  min-height: 200px;
}
.root:hover {
  box-shadow: 0px 1px 3px 1px rgba(0, 255, 0, 0.3);
  border: 2px solid rgba(33, 234, 94, 0.5);
  scale: 1.1;
}

/* .svg {
  background-image: url("./icons/vue.svg");
  width: 300px;
  height: 150px;
  background-repeat: no-repeat;
} */
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
.root:hover .image {
  opacity: 1;
  transform: rotate(0) translateY(0);
}
.link {
  display: block;
  text-align: start;
  width: 100%;
  height: 100%;
  position: relative;
  transition: all 0.3s ease-in-out;
  padding: 8px;
  box-sizing: border-box;
}

.root:hover .link {
  background: rgba(0, 0, 0, 0.15);
  /* animation: textflicker 100ms ; */
  animation-name: textflicker;
  animation-duration: 0.01s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

@keyframes textflicker {
  from {
    text-shadow: 1px 0 0 #ea36af, -2px 0 0 #75fa69;
  }
  to {
    text-shadow: 2px 0.5px 2px #ea36af, -1px -0.5px 2px #75fa69;
  }
}
</style>
