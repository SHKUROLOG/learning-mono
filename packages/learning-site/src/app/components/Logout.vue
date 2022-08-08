<template>
  <div :class="$style.btn_logout">
    <button :class="$style.logout"
            @click="userLogout">
      Logout
    </button>
  </div>
</template>

<script lang="ts" setup>
import { api } from '@app/api'
import { user } from '@app/store/user'

async function userLogout() {
  await api.logout()
  user.value = null
}
</script>

<style module>
.btn_logout {

}
.logout {

}
</style>
