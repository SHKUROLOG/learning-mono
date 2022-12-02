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
  animation: slide-in-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
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
  transition: all 0.3s ease-in-out;
}

.explore_bar:hover {
  background: rgba(37, 188, 80, 1);
  color: #000;
  box-shadow: 0px 1px 3px 1px rgba(0, 255, 0, 0.3);
}

@keyframes slide-in-left {
  0% {
    -webkit-transform: translateX(-1000px);
            transform: translateX(-1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
    opacity: 1;
  }
}
</style>
