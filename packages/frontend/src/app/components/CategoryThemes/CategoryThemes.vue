<template>
  <div v-for="theme in themes"
       :key="theme.id"
       :class="$style.root">
    <Transition name="theme" appear>
      <router-link :class="$style.link"
                   :to="{ name: 'theme', params: { themeId: theme.id } }">
        <BaseText :text="`${theme.title}`"/>
      </router-link>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { CategoryThemesProps } from './CategoryThemes.props'
import { BaseText } from '../BaseText'

defineProps<CategoryThemesProps>()
</script>

<style module>
.root {
  transition: all 0.3s ease-in-out;
  user-select: none;
  cursor: pointer;
  justify-content: flex-start;
  padding: 10px;
  border-left: 3px solid rgba(37, 190, 80, 0.3);
}

.root:hover {
  transform: scale(1.04) translateX(4px);
  background: #25bc50;
  color: #000;
  box-shadow: 0px -5px -5px 0px rgba(0, 0, 0, 0.6) inset;
  border-left: 3px solid rgba(37, 190, 80, 1);
}

.root:hover a {
  color: #000;
}
.link {
  display: block;
  width: 100%;
  height: 100%;
}
</style>

<style>
.theme-enter-active {
  animation: slide-in-left 0.2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

.theme-leave-active {
  animation: slide-in-left 0.2s cubic-bezier(0.250, 0.460, 0.450, 0.940) reverse;
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
