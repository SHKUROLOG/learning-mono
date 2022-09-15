<template>
  <div :class="$style.root">
    <div v-for="i in ammount"
         :key="i"
         :class="[$style.box, { [$style.active_box] : i <= current } ]"/>

    <div :class="$style.percent">
      [ {{ dynamicPercent + '%' }} ]
    </div>
  </div>
</template>

<script lang="ts" setup>
import { easeInOutCubic, tween } from '@learning-mono/shared'
import { computed, ref, watch } from 'vue'
import { ProgressBarProps } from './ProgressBar.props'

const props = defineProps<ProgressBarProps>()

// const time = 10000

const dynamicPercent = ref(0)

const percent = computed(() => (props.current / props.ammount * 100))

watch(percent, (value, oldValue) => {
  tween(oldValue, value, {
    // time,
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
  /* border: 1px solid #19e57c; */
  align-items: center;
  padding: 10px;
  margin-left: 20px;
}

.box {
  width: 10px;
  height: 10px;
  background: #19e57c;
  opacity: 0.1;
  margin-right: 4px;

}

.active_box {
  opacity: 1;
  box-shadow: 0px 1px 3px 1px rgba(26, 255, 167, 0.3);
}

.active_box_red {
  background: #ff0000;
}

.percent {
  margin-left: 10px;
}
</style>
