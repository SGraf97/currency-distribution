<script setup lang="ts">
import MultiSelect from '@/components/multi-select.vue'
import DistributionSelect from '@/components/DistributionSelect.vue'
import { ref } from 'vue'
import { availableCurrencies } from '@/models/currencies.model'
import type { DistributionSelection } from '@/models/distribution-selection.models'

const sourceCurrency = ref();
const targetCurrency = ref();
const distParameters = ref();
function isCurrenciesSelectionValid() {
  if(!sourceCurrency.value || !targetCurrency.value) return false;
  return sourceCurrency.value !== targetCurrency.value;
}


</script>

<template>
  <main>
    <multi-select v-model="sourceCurrency" :label="'Source Currency'" :items="availableCurrencies"></multi-select>
    <multi-select v-model="targetCurrency" :label="'Target Currency'" :items="availableCurrencies"></multi-select>
    <div v-if="isCurrenciesSelectionValid()">
      <distribution-select @value:change="($event: DistributionSelection) => console.log($event)" />
    </div>

  </main>
</template>
