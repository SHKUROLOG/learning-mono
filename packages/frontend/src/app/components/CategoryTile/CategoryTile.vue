<template>
  <div :class="$style.root">
    <div :class="$style.image"
         :style="{ backgroundImage: `url('src/app/components/CategoryTile/icons/${category.image}')` }"/>

    <router-link v-text="category.title"
                 :class="$style.link"
                 :to="{ name: 'category', params: { categoryId: category.id } }"/>
  </div>
</template>

<script lang="ts" setup>
import { CategoryTileProps } from './CategoryTile.props'

defineProps<CategoryTileProps>()
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
  min-height: 150px;
}
.root:hover {
  box-shadow: 0px 1px 3px 1px rgba(0, 255, 0, 0.3);
  border: 2px solid rgba(33, 234, 94, 0.5);
}

.svg {
  background-image: url("./icons/vue.svg");
  width: 300px;
  height: 150px;
  background-repeat: no-repeat;
}
.image {
  /* background-image: url('./icons/vue.svg'); */
  /* border: 1px solid red; */
  position: absolute;
  width: 100%;
  height: 100%;
  transition: all 0.3s ease-in-out;
  opacity: 0.1;
  pointer-events: none;
  left: 0;
  top: 0;
  /* transform: rotate(-15deg) translateY(70%); */
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
  width: 100%;
  height: 100%;
  position: relative;
  transition: all 0.3s ease-in-out;
  padding: 8px;
  box-sizing: border-box;
}

.root:hover .link {
  background: rgba(0, 0, 0, 0.15);
}
</style>
