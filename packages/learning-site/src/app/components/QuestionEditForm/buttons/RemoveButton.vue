<template>
  <BaseButton v-if="editMode"
              text="Remove question"
              type="button"/>
</template>

<script lang="ts" setup>
import { editMode } from '../../../store/editmode'
import { BaseButton } from '../../BaseButton'

// interface RemoveButtonTargetProps {
//   targetId: number
// }
//
// defineProps<RemoveButtonTargetProps>()
</script>

<style module>

</style>
