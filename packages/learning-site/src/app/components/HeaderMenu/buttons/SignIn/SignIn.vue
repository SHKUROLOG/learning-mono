<template>
  <BaseButton v-if="!user && !isLoginFormShown"
              text="Sign In"
              @click="isLoginFormShown = !isLoginFormShown"/>
</template>

<script lang="ts" setup>
import { isLoginFormShown, user } from '../../../../store/user'
import { BaseButton } from '../../../BaseButton'
</script>
