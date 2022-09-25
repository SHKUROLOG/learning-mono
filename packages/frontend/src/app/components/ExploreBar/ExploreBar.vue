<template>
  <div :class="$style.root">
    <div v-if="categoryTitle"
         :class="$style.explore_bar">
      {{ categoryTitle }}
    </div>

    <div v-if="themeTitle"
         :class="$style.explore_bar">
      {{ themeTitle }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ExploreBarProps } from './ExploreBar.props'

const props = defineProps<ExploreBarProps>()

// const themeTitle = props.category.themes.find(v => v.id === props.themeId)
</script>

<style module>
.root {
  display: flex;
}
.explore_bar {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 35px;
  padding-right: 25px;
  min-width: 200px;
  height: 50px;
  color: #141912;
  background: #25bc50;
  clip-path: polygon(0% 0%, 90% 0%, 100% 50%, 100% 50%, 90% 100%, 0% 100%, 10% 50%);
}
/* clip-path: polygon(0% 0%, 90% 0%, 100% 50%, 100% 50%, 90% 100%, 0% 100%, 10% 50.3%); */
</style>
