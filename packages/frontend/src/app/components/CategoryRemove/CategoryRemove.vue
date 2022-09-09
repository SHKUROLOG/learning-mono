<template>
  <div v-if="editMode"/>
</template>

<script lang="ts" setup>
import { CategoryRemoveProps } from './CategoryRemove.props'
import { api } from '../../api'
import { BaseButton } from '../BaseButton'
import { editMode } from '../../store/editmode'

const props = defineProps<CategoryRemoveProps>()
</script>

<style>

</style>
