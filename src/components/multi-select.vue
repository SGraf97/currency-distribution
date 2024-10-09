<script setup lang="ts">

const props = defineProps({
  items: Array<string>,
  label: String
})
const emit = defineEmits(['update:value']);

</script>
<template>
  <v-select @update:modelValue="($event: string | null) =>  emit('update:value', $event)" :label="label" :items="items">
  </v-select>
</template>

<style scoped>


</style>