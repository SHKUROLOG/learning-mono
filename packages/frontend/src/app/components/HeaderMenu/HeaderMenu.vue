<template>
  <div :class="$style.menu">
    <div :class="$style.left">
      <EscButton :class="$style.esc"/>
    </div>

    <div :class="$style.right">
      <EditMode/>
      <LogoutButton/>
      <SignIn/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { EscButton, EditMode, SignIn, LogoutButton } from './buttons'
</script>

<style module>
.menu {
  display: grid;
  margin: 8px 16px;
  justify-content: stretch;
  grid-auto-flow: column;
  align-items: start;
  border: 2px solid #19e57c;
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
