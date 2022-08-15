<template>
  <BaseButton v-if="user"
              :class="$style.logout"
              text="Logout"
              @click="userLogout"/>
</template>

<script lang="ts" setup>
import { api } from '@app/api'
import { user } from '@app/store/user'
import { BaseButton } from '@app/components/BaseButton'

async function userLogout() {
  await api.logout()
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
