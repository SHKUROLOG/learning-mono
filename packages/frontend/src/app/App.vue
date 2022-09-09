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
import { isLoginFormShown, user, userStoreInit } from './store/user'
import { HeaderMenu } from './components/HeaderMenu'
import { LoginForm } from './components/LoginForm'

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
* {
  padding: 0;
  margin: 0;
}

a {
  font-family: "JetBrains Mono ExtraBold", monospace;
  text-decoration: none;
  color: #19e57c;
  cursor: pointer;
}
body {
  font-family: "JetBrains Mono ExtraBold", monospace;
  color: #19e57c;
  height: 100%;
  background: linear-gradient(to right, #212121, #171717);
}
</style>
