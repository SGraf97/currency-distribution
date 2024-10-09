<script setup lang="ts">
import MultiSelect from '@/components/multi-select.vue'
import { availableDistributions, DistributionType } from '@/models/distributions.models'
import { ref } from 'vue'
const selectedDistribution = ref(DistributionType.UNIFORM);
</script>

<template>
  <multi-select @update:value="$event => selectedDistribution = $event"  :label="'Type Of Distribution'" :items="availableDistributions"></multi-select>

  <div v-if="selectedDistribution === DistributionType.UNIFORM">
    <h2>uniform</h2>

  </div>

  <div v-if="selectedDistribution === DistributionType.GAUSSIAN">
    <h2>gaussian</h2>

  </div>

</template>
