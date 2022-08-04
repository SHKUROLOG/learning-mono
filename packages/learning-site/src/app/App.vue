<template>
  <header :class="$style.header">
    header
  </header>
  <div :class="$style.stackedLinear">
    <router-view/>
  </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { Category } from '@app/types'

const categories = ref<Category[]>([])

watchEffect(async () => {
  categories.value = await fetch('http://localhost:3030/categories').then(v => v.json())
})
</script>

<style module>
.stackedLinear {

}
.header {
  height: 100px;
  border: 1px solid aliceblue;
  border-radius: 20px;
}
</style>

<style lang="css">
a {
  color: aliceblue;
  font-family: "JetBrains Mono ExtraBold", monospace;
}
body {
  font-family: "JetBrains Mono ExtraBold", monospace;
  margin: 0;
  color: aliceblue;
  text-align: center;
  height: 100%;
  background: linear-gradient(to right, #c31432, #240b36);
}
</style>
