<template>
  <div :class="$style.root">
    <div :class="$style.image"
         :style="{ backgroundImage: `url(${svg})` }"/>

    <router-link :class="$style.link"
                 :to="{ name: 'category', params: { categoryId: category.id } }">
      <div v-text="category.title"
           :class="$style.title"/>
    </router-link>
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
  background: rgba(0, 0, 0, 0.15);
  position: relative;
  min-height: 200px;
}
.root:hover {
  box-shadow: 0px 1px 3px 1px rgba(0, 255, 0, 0.3);
  border: 1px solid rgba(33, 234, 94, 0.5);
  scale: 1.1;
}

.title {
  position: absolute;
  text-align: center;
  width: 100%;
  opacity: 0;
  background: rgba(37, 188, 80, 0.8);
  /* clip-path: polygon(90% 0%, 100% 100%, 0% 100%, 0% 0%); */
  clip-path: polygon(95% 0%, 100% 100%, 0% 100%, 0% 0%);
  /* clip-path: polygon(100% 0%, 90% 100%, 0% 100%, 0% 0%); */
}

.image {
  position: absolute;
  width: 100%;
  height: 100%;
  transition: all 0.3s ease-in-out;
  opacity: 0.3;
  pointer-events: none;
  left: 0;
  top: 0;
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
  box-sizing: border-box;
}

.root:hover .title {
  color: rgba(0, 0, 0, 0.8);
  opacity: 0.3;
  animation: slide-in-blurred-left 0.6s cubic-bezier(0.230, 1.000, 0.320, 1.000) both;
}

@-webkit-keyframes slide-in-blurred-left {
  0% {
    -webkit-transform: translateX(-100px) scaleX(2.5) scaleY(0.2);
            transform: translateX(-100px) scaleX(2.5) scaleY(0.2);
    -webkit-transform-origin: 100% 50%;
            transform-origin: 100% 50%;
    -webkit-filter: blur(40px);
            filter: blur(40px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0) scaleY(1) scaleX(1);
            transform: translateX(0) scaleY(1) scaleX(1);
    -webkit-transform-origin: 50% 50%;
            transform-origin: 50% 50%;
    -webkit-filter: blur(0);
            filter: blur(0);
    opacity: 1;
  }
}

@keyframes slide-in-blurred-left {
  0% {
    -webkit-transform: translateX(-100px) scaleX(2.5) scaleY(0.2);
            transform: translateX(-100px) scaleX(2.5) scaleY(0.2);
    -webkit-transform-origin: 100% 50%;
            transform-origin: 100% 50%;
    -webkit-filter: blur(40px);
            filter: blur(40px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0) scaleY(1) scaleX(1);
            transform: translateX(0) scaleY(1) scaleX(1);
    -webkit-transform-origin: 50% 50%;
            transform-origin: 50% 50%;
    -webkit-filter: blur(0);
            filter: blur(0);
    opacity: 1;
  }
}
</style>
