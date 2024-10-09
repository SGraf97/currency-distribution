<script setup lang="ts">
const props = defineProps({
  items: Array<string>,
  label: String
})
</script>
<template>
  <v-select :label="label" :items="items">
  </v-select>
</template>

<style scoped>

</style>