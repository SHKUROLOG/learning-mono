<template>
  <div :class="$style.container">
    > <input v-model="signUp.firstName"
             :class="$style.input"
             type="text"
             placeholder="Whats your name son?"
             @keydown.enter="handleLogin">
  </div>

  <div :class="$style.container">
    > <input v-model="signUp.lastName"
             :class="$style.input"
             type="text"
             placeholder="Your Last Name"
             @keydown.enter="handleLogin">
  </div>

  <div :class="$style.container">
    > <input v-model="signUp.email"
             :class="$style.input"
             type="text"
             placeholder="Your email"
             @keydown.enter="handleLogin">
  </div>

  <div :class="$style.container">
    > <input v-model="signUp.password"
             :class="$style.input"
             type="password"
             placeholder="Придумай пароль"
             @keydown.enter="handleLogin">
  </div>

  <div :class="$style.container">
    > <input v-model="repeatPassword"
             :class="$style.input"
             type="password"
             placeholder="Повтори пароль"
             @keydown.enter="comparePassword(signUp.password, repeatPassword)">
  </div>
</template>

<script lang="ts" setup>
import { SignUp } from '../types'
import { ref } from 'vue'

// interface Props {
//   signUp: SignUp
// }

const repeatPassword = ref('')

const signUp = ref<SignUp>({
  email: '',
  firstName: '',
  lastName: '',
  password: '',
})

// function comparePassword(password: SignUp, repeatPassword: string) {
//   if (!password.password.trim() && !repeatPassword.trim())
//     return
// }
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
