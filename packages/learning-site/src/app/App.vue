<template>
  <header :class="$style.header">
    <HeaderMenu/>

    <LoginForm v-if="isLoginFormShown && !user "/>
  </header>

  <div>
    <router-view/>
  </div>
</template>

<script lang="ts" setup>
import { LoginForm } from '@app/components/LoginForm'
import { isLoginFormShown, user, userStoreInit } from '@app/store/user'
import { HeaderMenu } from '@app/components/HeaderMenu'

userStoreInit()
</script>

<style module>
.header {
  height: 100px;
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr max-content;
}
</style>

<style lang="css">
a {
  color: aliceblue;
  font-family: "JetBrains Mono ExtraBold", monospace;
  text-decoration: none;
}
body {
  margin-right: 16px;
  font-family: "JetBrains Mono ExtraBold", monospace;
  color: aliceblue;
  height: 100%;
  background: linear-gradient(to right, #c31432, #240b36);
}
</style>
