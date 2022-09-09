<template>
  <BaseButton v-if="!user && !isLoginFormShown"
              :buttonSize="ButtonSize.L"
              text="Sign In"
              @click="isLoginFormShown = !isLoginFormShown"/>
</template>

<script lang="ts" setup>
import { isLoginFormShown, user } from '../../../../store/user'
import { BaseButton, ButtonSize } from '../../../BaseButton'
</script>
