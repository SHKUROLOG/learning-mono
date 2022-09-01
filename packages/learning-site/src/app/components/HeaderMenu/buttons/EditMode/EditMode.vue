<template>
  <BaseButton v-if="user"
              :buttonSize="ButtonSize.L"
              text="Edit mode"
              @click="editMode = !editMode"/>
</template>

<script lang="ts" setup>
import { editMode } from '../../../../store/editmode'
import { BaseButton, ButtonSize } from '../../../BaseButton'
import { user } from '../../../../store/user'
</script>

<style module>

</style>
