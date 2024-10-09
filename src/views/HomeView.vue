<script setup lang="ts">
import MultiSelect from '@/components/multi-select.vue'
import DistributionSelect from '@/components/DistributionSelect.vue'

</script>

<template>
  <main>
    <multi-select :label="'Target Currency'" :items="['EUR', 'GBP']"></multi-select>
    <multi-select :label="'Source Currency'" :items="['EUR', 'GBP']"></multi-select>
    <distribution-select />

  </main>
</template>
