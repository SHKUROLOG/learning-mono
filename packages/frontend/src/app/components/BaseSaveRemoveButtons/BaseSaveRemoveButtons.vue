<template>
  <div :class="$style.root">
    <BaseButton :buttonSize="ButtonSize.S"
                :class="[$style.remove_btn, {
                  [$style.remove_btn_all]: !isShow
                }]"
                text="✖"
                @click="$emit('remove')"/>

    <BaseButton v-if="isShow"
                :buttonSize="ButtonSize.S"
                :class="$style.save_btn"
                text="✔"
                @click="$emit('save')"/>
  </div>
</template>

<script lang="ts" setup>
import { isEqual } from 'lodash'
import { watch, ref } from 'vue'
import { BaseButton, ButtonSize } from '../BaseButton'
import { BaseSaveRemoveButtonsEmits, BaseSaveRemoveButtonsProps } from './BaseSaveRemoveButtons.props'

const isShow = ref(false)

const props = defineProps<BaseSaveRemoveButtonsProps>()
defineEmits<BaseSaveRemoveButtonsEmits>()

watch(props.currentForm || props.initialForm, () => {
  isShow.value = !isEqual(props.currentForm, props.initialForm)
})
</script>

<style module>
.root {
  display: flex;
  align-items: center;
  width: 100%;
  transition: all 0.3s ease-in-out;
  font-weight: bold;
}

.save_btn {
  font-size: 16px;
  opacity: 0.2;
  pointer-events: none;
  width: 50%;
  font-size: 24px;
}

.remove_btn {
  font-size: 16px;
  opacity: 0.2;
  pointer-events: none;
  width: 50%;
  font-size: 24px;
}

.remove_btn_all {
  width: 100%;
}
.root:hover * {
  opacity: 1;
  pointer-events: all;
}
</style>
