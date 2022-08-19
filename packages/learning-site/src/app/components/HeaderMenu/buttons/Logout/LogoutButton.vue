<template>
  <BaseButton v-if="user"
              :class="$style.logout"
              text="Logout"
              @click="userLogout"/>
</template>

<script lang="ts" setup>
import { api } from '../../../../api'
import { user } from '../../../../store/user'
import { BaseButton } from '../../../BaseButton'

async function userLogout() {
  await api.auth.logout()
  user.value = null
}
</script>

<style module>
.menu {
  margin: 8px 16px;
}

.logout {
  justify-items: right;
}
</style>
