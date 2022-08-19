<template>
  <BaseButton v-if="user"
              text="Edit mode"
              @click="editMode = !editMode"/>
</template>

<script lang="ts" setup>
import { editMode } from '../../../../store/editmode'
import { BaseButton } from '../../../BaseButton'
import { user } from '../../../../store/user'
</script>

<style module>

</style>
