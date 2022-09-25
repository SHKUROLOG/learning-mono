<template>
  <div :class="$style.menu">
    <div :class="$style.left">
      <EscButton :class="$style.esc"/>
    </div>

    <div :class="$style.right">
      <LoginForm v-if="isLoginFormShown && !user "/>
      <EditMode/>
      <LogoutButton/>
      <SignIn/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { EscButton, EditMode, SignIn, LogoutButton } from './buttons'
import LoginForm from '../LoginForm/LoginForm.vue'
import { isLoginFormShown, user } from '../../store/user'
</script>

<style module>
.menu {
  display: grid;
  margin: 8px 16px;
  justify-content: stretch;
  grid-auto-flow: column;
  align-items: start;
  border: 2px solid #25bc50;
  align-items: center;
  padding: 0px 40px;
}

.left, .right {
  display: grid;
  grid-auto-flow: column;
}
.left {
  justify-content: start;
}
.right {
  justify-content: end;
}
</style>
