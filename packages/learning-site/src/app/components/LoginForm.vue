<template>
  <div v-if="!user && !isUserLoading"
       :class="$style.root">
    <div :class="$style.container">
      > <input v-model="formLogin.login"
               :class="$style.input"
               type="text"
               placeholder="Whats your name son?"
               @keydown.enter="handleLogin">
    </div>

    <div :class="$style.container">
      > <input v-model="formLogin.password"
               :class="$style.input"
               type="password"
               placeholder="••••••"
               @keydown.enter="handleLogin">
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { isUserLoading, user } from '@app/store/user'

const formLogin = reactive({
  login: 'root',
  password: '12345678',
})

async function handleLogin(): Promise<void> {
  if (!formLogin.login.trim() && !formLogin.password.trim())
    return

  const response = await fetch('http://localhost:3030/login', {
    method: 'POST',
    body: JSON.stringify(formLogin),
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    credentials: 'include',
  }).then((r) => r.json())

  user.value = response.user

  // formLogin.login = ''
  // formLogin.password = ''
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
