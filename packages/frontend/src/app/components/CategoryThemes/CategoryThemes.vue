<template>
  <div v-for="theme in themes"
       :key="theme.id"
       :class="$style.theme">
    <router-link :class="$style.link"
                 :to="{ name: 'theme', params: { themeId: theme.id } }">
      <BaseText :text="`> ${theme.title}`"/>
    </router-link>
  </div>
</template>

<script lang="ts" setup>
import { CategoryThemesProps } from './CategoryThemes.props'
import { BaseText } from '../BaseText'

defineProps<CategoryThemesProps>()
</script>

<style module>
.theme {
  transition: all 0.3s ease-in-out;
  user-select: none;
  cursor: pointer;
  justify-content: flex-start;
  padding: 10px;
  margin: 0px 40px;
  /* position: relative; */
  /* transition: all .3s ease; */
  /* transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  transform: translateX(10px); */
}

.theme:hover {
  transform: scale(1.04) translateX(4px);
  background: linear-gradient(to right, #21ea5e, #0ded50);
  color: #000;
  box-shadow: 0px -5px -5px 0px rgba(0, 0, 0, 0.6) inset;
}

.theme:hover a {
  color: #000;
}
.link {
  display: block;
  width: 100%;
  height: 100%;
}

.theme_edit {
}
</style>
