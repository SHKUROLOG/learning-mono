<template>
  <BaseButton v-if="user"
              :class="{ [$style.active]: editMode }"
              :buttonSize="ButtonSize.L"
              text="<Edit mode>"
              @click="editMode = !editMode"/>
</template>

<script lang="ts" setup>
import { editMode } from '../../../../store/editmode'
import { BaseButton, ButtonSize } from '../../../BaseButton'
import { user } from '../../../../store/user'
</script>

<style module>
.active {
  color: #000;
  background: rgba(37, 188, 80, 1);
}
</style>
