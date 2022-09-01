<template>
  <div :class="$style.root">
    <BaseButton v-if="isSaveShow"
                :buttonSize="ButtonSize.S"
                :class="$style.save_btn"
                text="Save"
                @click="$emit('save')"/>

    <BaseButton :buttonSize="ButtonSize.S"
                :class="$style.remove_btn"
                text="Remove"
                @click="$emit('remove')"/>
  </div>
</template>

<script lang="ts" setup>
import { BaseButton, ButtonSize } from '../BaseButton'
import { BaseSaveRemoveButtonsEmits, BaseSaveRemoveButtonsProps } from './BaseSaveRemoveButtons.props'

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
