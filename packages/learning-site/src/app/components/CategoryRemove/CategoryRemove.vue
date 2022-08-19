<template>
  <div v-if="editMode">
    <BaseButton text="X"
                @click="removeCategory"/>
  </div>
</template>

<script lang="ts" setup>
import { CategoryRemoveProps } from './CategoryRemove.props'
import { api } from '../../api'
import { BaseButton } from '../BaseButton'
import { editMode } from '../../store/editmode'

const props = defineProps<CategoryRemoveProps>()

function removeCategory() {
  api.category.remove(props.category.id)
}
</script>

<style>

</style>
