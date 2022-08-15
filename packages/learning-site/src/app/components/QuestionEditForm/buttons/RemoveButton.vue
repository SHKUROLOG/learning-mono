<template>
  <BaseButton v-if="editMode"
              text="Remove question"
              type="button"/>
</template>

<script lang="ts" setup>
import { editMode } from '@app/store/editmode'
import BaseButton from '@app/components/BaseButton/BaseButton.vue'

// interface RemoveButtonTargetProps {
//   targetId: number
// }
//
// defineProps<RemoveButtonTargetProps>()
</script>

<style module>

</style>
