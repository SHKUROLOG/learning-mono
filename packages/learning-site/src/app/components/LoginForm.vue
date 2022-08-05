<template>
  <div :class="$style.root">
    <div :class="$style.container">
      > <input v-model="form.login"
               :class="$style.input"
               type="text"
               placeholder="Whats your name son?"
               @keydown.enter="handleLogin">
    </div>

    <div :class="$style.container">
      > <input v-model="form.password"
               :class="$style.input"
               type="password"
               placeholder="••••••"
               @keydown.enter="handleLogin">
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

const form = reactive({
  login: '',
  password: '',
})

function handleLogin() {
  if (!form.login.trim() && !form.password.trim())
    return

  form.login = ''
  form.password = ''
}
</script>

<style module>
.root {
  display: grid;
  padding: 16px;
  justify-self: end;

}

.input {
  background: transparent;
  color: aliceblue;
  border: none;
  width: 200px;
  border-bottom: 1px solid transparent;
  transition: all 0.3s ease-in-out;
  padding: 4px;

}
.input::placeholder {
  color: aliceblue;
}
.input:focus {
  outline: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.8);
}

.container {
  opacity: 0.8;
  transition: all 0.2s ease-in-out;
}

.container:hover {
  opacity: 1;
}
</style>
