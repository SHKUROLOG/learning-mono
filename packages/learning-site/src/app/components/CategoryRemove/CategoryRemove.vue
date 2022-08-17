<template>
  <div v-if="editMode">
    <BaseButton text="X"
                @click="removeCategory"/>
  </div>
</template>

<script lang="ts" setup>
import { api } from '@app/api'
import { CategoryRemoveProps } from './CategoryRemove.props'
import { BaseButton } from '@app/components/BaseButton'
import { editMode } from '@app/store/editmode'

const props = defineProps<CategoryRemoveProps>()

function removeCategory() {
  api.category.remove(props.category.id)
}
</script>

<style>

</style>
