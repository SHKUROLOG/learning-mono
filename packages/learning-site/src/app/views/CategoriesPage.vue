<template>
  <div :key="cat.id"
       v-for="cat in categories"
       class="app">

    <router-link :to="{name: 'category', params: {id: cat.id}}">
      {{ cat.title }}
    </router-link>

  </div>
</template>

<script lang="ts" setup>
import {ref, watchEffect} from "vue";
import {Category} from "@app/types";

const categories = ref<Category[]>([])

watchEffect(async ()=> {
  categories.value = await fetch(`http://localhost:3030/categories`)
      .then( v => v.json())
})


</script>

<style module>

</style>