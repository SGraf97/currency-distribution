<script setup lang="ts">
const props = defineProps({
  items: Array<string>,
  label: String
})
const emit = defineEmits(['update:value'])
const selected = defineModel()
</script>
<template>
  <v-select
    v-model="selected"
    @update:modelValue="($event: string | null) => emit('update:value', $event)"
    :label="label"
    :items="items"
  >
  </v-select>
</template>
