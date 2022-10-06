<template>
  <BaseButton v-if="editMode"
              :text="text"
              type="button"/>
</template>

<script lang="ts" setup>
import { editMode } from '../../../store/editmode'
import { BaseButton } from '../../BaseButton'
import { RemoveButtonProps } from './RemoveButton.props'

defineProps<RemoveButtonProps>()
</script>

<style module>

</style>
