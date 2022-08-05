<template>
  <header :class="$style.header">
    <div :class="$style.menu">
      <router-link :class="$style.esc" to="/">
        Esc
      </router-link>
    </div>

    <LoginForm/>
  </header>
  <div :class="$style.stackedLinear">
    <router-view/>
  </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { Category } from '@app/types'
import { LoginForm } from '@app/components'

const categories = ref<Category[]>([])

watchEffect(async () => {
  categories.value = await fetch('http://localhost:3030/categories').then(v => v.json())
})
</script>

<style module>
.menu {
  margin: 16px 32px;
}
.esc {
  padding: 8px 16px;
  font-size: 18px;
  opacity: 0.8;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  user-select: none;
}
.esc:hover {
  opacity: 1;
  background: rgba(255, 255, 255, 0.05);
}

.header {
  height: 100px;
  display: grid;
  justify-items: stretch;
  grid-auto-flow: column;

}
</style>

<style lang="css">
a {
  color: aliceblue;
  font-family: "JetBrains Mono ExtraBold", monospace;
  text-decoration: none;
}
body {
  font-family: "JetBrains Mono ExtraBold", monospace;
  margin: 0;
  color: aliceblue;
  height: 100%;
  background: linear-gradient(to right, #c31432, #240b36);
}
</style>
