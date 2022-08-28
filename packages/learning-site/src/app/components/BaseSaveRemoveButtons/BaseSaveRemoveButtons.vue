<template>
  <div :class="$style.root">
    <BaseButton v-if="!isEqual(currentForm, initialForm)"
                :class="$style.save_btn"
                text="Save"
                @click="$emit('save')"/>

    <BaseButton :class="$style.remove_btn"
                text="Remove"
                @click="$emit('remove')"/>
  </div>
</template>

<script lang="ts" setup>
import { BaseButton } from '../BaseButton'
import { BaseSaveRemoveButtonsEmits, BaseSaveRemoveButtonsProps } from './BaseSaveRemoveButtons.props'
import { isEqual } from 'lodash'

defineProps<BaseSaveRemoveButtonsProps>()
defineEmits<BaseSaveRemoveButtonsEmits>()
</script>

<style module>
.root {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.save_btn {
  font-size: 12px;
  opacity: 0.2;
  pointer-events: none;
}

.remove_btn {
  font-size: 12px;
  opacity: 0.2;
  pointer-events: none;
}
.root:hover * {
  opacity: 1;
  pointer-events: all;
}
</style>
