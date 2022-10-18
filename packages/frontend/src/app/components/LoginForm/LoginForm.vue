<template>
  <div v-if="!isUserLoading"
       :class="$style.root">
    <div :class="$style.container">
      <input v-model="formLogin.login"
             :class="$style.input"
             type="text"
             placeholder="Whats your name son?"
             @keydown.enter="handleLogin">
    </div>

    <div :class="$style.container">
      <input v-model="formLogin.password"
             :class="$style.input"
             type="password"
             placeholder="••••••"
             @keydown.enter="handleLogin">
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { isUserLoading, user } from '../../store/user'
import { api } from '../../api'

const formLogin = reactive({
  login: '',
  password: '',
})

async function handleLogin(): Promise<void> {
  if (!formLogin.login.trim() && !formLogin.password.trim())
    return

  user.value = await api.auth.login(formLogin)
}
</script>

<style module>
.root {
  display: grid;
  padding: 16px;
  justify-self: end;

}

.input {
  font-weight: bold;
  background: transparent;
  color: #25bc50;
  border: none;
  width: 200px;
  border-bottom: 1px solid transparent;
  transition: all 0.3s ease-in-out;
  padding: 4px;
}

.input::placeholder {
  color: #25bc50;
}

.input:focus {
  outline: none;
  border-bottom: 1px solid rgba(37, 188, 80, 0.8);
}

.container {
  opacity: 0.8;
  transition: all 0.2s ease-in-out;
}

.container:hover {
  opacity: 1;
}
</style>
