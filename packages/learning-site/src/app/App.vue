<template>
<div>
  <router-view/>
</div>
</template>

<script lang="ts" setup>

import {ref, watchEffect} from "vue";
import {Category} from "@app/types";

const categories = ref<Category[]>([])


watchEffect(async ()=> {
  categories.value = await fetch('http://localhost:3030/categories').then( v => v.json())
})


</script>

<style module>

</style>
