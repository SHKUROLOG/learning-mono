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
import { LoginForm } from '../LoginForm'
import { isLoginFormShown, user } from '../../store/user'
</script>

<style module>
.menu {
  display: grid;
  margin: 16px 16px;
  justify-content: stretch;
  grid-auto-flow: column;
  align-items: start;
  border-bottom: 2px solid rgba(37, 188, 80, 0.3);
  align-items: center;
  padding: 0px 40px;
}

.menu:hover {
  border-bottom: 2px solid rgba(37, 188, 80, 1);
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
