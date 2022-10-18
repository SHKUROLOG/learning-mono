<template>
  <div v-if="ammount && !editMode"
       :class="$style.root">
    <div :class="$style.title">PROGRESS</div>
    <div v-for="actual in ammount"
         :key="actual"
         :class="[$style.box, {
           [$style.active_box]: actual <= current,
           [$style.active_box_red]: !correctItems[actual -1] && actual <= current
         }]"/>

    <div :class="$style.percent">
      [ {{ dynamicPercent + '%' }} ]
    </div>
  </div>
</template>

<script lang="ts" setup>
import { easeInOutCubic, tween } from '@learning-mono/shared'
import { computed, ref, watch } from 'vue'
import { editMode } from '../../store/editmode'
import { ProgressBarProps } from './ProgressBar.props'

const props = defineProps<ProgressBarProps>()

const time = 500

const dynamicPercent = ref(0)

const percent = computed(() => (props.current / props.ammount * 100))

watch(percent, (value, oldValue) => {
  tween(oldValue, value, {
    time,
    progress: (result) => {
      dynamicPercent.value = +result.toFixed(1)
    },

    ease: easeInOutCubic,
  })
})
</script>

<style module>
.root {
  display: flex;
  align-items: center;
  padding: 10px;
}

.title {
  margin-right: 8px;
}

.box {
  min-width: 10px;
  min-height: 10px;
  background: #25bc50;
  opacity: 0.1;
  margin-right: 4px;
  box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.3);
}

.active_box {
  opacity: 1;
}

.active_box_red {
  background: #ff0000;
  box-shadow: 0px 1px 3px 1px rgba(255, 0, 0, 0.3);
}

.percent {
  margin-left: 16px;
}
</style>
