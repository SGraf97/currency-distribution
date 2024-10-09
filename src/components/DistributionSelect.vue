<script setup lang="ts">
import MultiSelect from '@/components/multi-select.vue'
import { availableDistributions, DistributionType } from '@/models/distributions.models'
import { ref } from 'vue'


const selectedDistribution = ref();
const lowerBound = defineModel('lowerBound');
const upperBound = defineModel('upperBound');
const mean = defineModel('mean');
const sigma = defineModel('sigma');

const emit = defineEmits(['value:change']);
</script>

<template>
  <form @change="emit('value:change', {selectedDistribution, lowerBound, upperBound, mean, sigma})">
  <multi-select v-model="selectedDistribution"  :label="'Type Of Distribution'" :items="availableDistributions"></multi-select>
  <div v-if="selectedDistribution">
    <h4>Provide additional info about your distribution</h4>
  </div>
  <div v-if="selectedDistribution == DistributionType.UNIFORM">
    <v-text-field v-model="lowerBound" type="number" :label="'Lower Bound'" ></v-text-field>
    <v-text-field v-model="upperBound" type="number" :label="'Upper Bound'" ></v-text-field>
  </div>
  <div v-if="selectedDistribution == DistributionType.GAUSSIAN">
    <v-text-field v-model="mean" type="number" :label="'Mean value'" ></v-text-field>
    <v-text-field v-model="sigma" type="number" :label="'Standard deviation'" ></v-text-field>
  </div>
  </form>
</template>
<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type=number] {
  -moz-appearance: textfield;
}
</style>