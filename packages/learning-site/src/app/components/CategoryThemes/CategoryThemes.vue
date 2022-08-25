<template>
  <div v-if="!editMode">
    <div v-for="theme in themes"
         :key="theme.id"
         :class="$style.theme">
      <router-link v-text="`> ${theme.title}`"
                   :to="{ name: 'theme', params: { themeId: theme.id } }"/>
    </div>
  </div>
  <div v-if="editMode">
    <ThemeEditMode v-for="theme in themes"
                   :key="theme.id"
                   :theme="theme"/>
  </div>
</template>

<script lang="ts" setup>
import { CategoryThemesProps } from './CategoryThemes.props'
import { editMode } from '../../store/editmode'
import ThemeEditMode from '../ThemeEditMode/ThemeEditMode.vue'

defineProps<CategoryThemesProps>()
</script>

<style module>
.theme {
  transition: all 0.3s ease-in-out;
  user-select: none;
  cursor: pointer;
  padding: 8px;
}
.theme:hover {
  transform: scale(1.04) translateX(4px);
}
</style>
