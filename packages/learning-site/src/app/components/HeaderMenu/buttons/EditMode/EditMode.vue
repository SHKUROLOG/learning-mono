<template>
  <BaseButton v-if="user"
              text="Edit mode"
              @click="editMode = !editMode"/>
</template>

<script lang="ts" setup>
import { editMode } from '@app/store/editmode'
import { user } from '@app/store/user'
import { BaseButton } from '@app/components/BaseButton'
</script>

<style module>

</style>
