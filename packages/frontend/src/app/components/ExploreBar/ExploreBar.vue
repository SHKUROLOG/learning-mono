<template>
  <div :class="$style.root">
    <div v-if="categoryTitle"
         :class="$style.explore_bar"
         @click="handleClick">
      {{ categoryTitle }}
    </div>

    <div v-if="themeTitle"
         :class="$style.explore_bar"
         @click="handleClick">
      {{ themeTitle }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { ExploreBarProps } from './ExploreBar.props'

const router = useRouter()

defineProps<ExploreBarProps>()

function handleClick() {
  router.go(-1)
}
</script>

<style module>
.root {
  display: flex;
  height: 100%;
  text-transform: uppercase;
}
.explore_bar {
  writing-mode: vertical-rl;
  text-orientation: upright;
  font-weight: bold;
  font-size: 24px;
  cursor: pointer;
  text-align: center;
  justify-content: center;
  align-items: center;
  padding: 8px;
  color: #000;
  background: #25bc50;
}

.explore_bar:hover {
  color: #25bc50;
  background: transparent;
  animation-name: textflicker;
  animation-duration: 0.01s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  /* box-shadow: 0px 1px 3px 1px rgba(0, 255, 0, 0.3); */
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
