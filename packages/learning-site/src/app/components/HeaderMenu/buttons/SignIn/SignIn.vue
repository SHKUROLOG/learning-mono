<template>
  <BaseButton v-if="!user && !isLoginFormShown"
              text="Sign In"
              @click="isLoginFormShown = !isLoginFormShown"/>
</template>

<script lang="ts" setup>
import { isLoginFormShown, user } from '@app/store/user'
import { BaseButton } from '@app/components/BaseButton'
</script>
