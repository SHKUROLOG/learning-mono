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
  transition: all 0.3s ease-in-out;
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
  border: 1px solid rgba(37, 188, 80, 1);
  border-radius: 2px;
  background: transparent;
}

.explore_bar:hover {
  background: rgba(37, 188, 80, 1);
  color: #000;
  box-shadow: 0px 1px 3px 1px rgba(0, 255, 0, 0.3);
}
</style>
