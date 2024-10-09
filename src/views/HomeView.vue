<script setup lang="ts">
import MultiSelect from '@/components/multi-select.vue'
import DistributionSelect from '@/components/DistributionSelect.vue'
import { computed, ref, toRaw } from 'vue'
import { availableCurrencies } from '@/models/currencies.model'
import type { DistributionSelection } from '@/models/distribution-selection.models'
import { DistributionType } from '@/models/distributions.models'

const sourceCurrency = ref();
const targetCurrency = ref();
const distParameters = ref();
const currencyValue = ref();
const  isCurrenciesSelectionValid = computed(() =>  {
  if(!sourceCurrency.value || !targetCurrency.value) return false;
  return sourceCurrency.value !== targetCurrency.value;
})

const isFormValid = function()  {
  const selectedDist = distParameters?.value?.selectedDistribution;
  const distParams = toRaw(distParameters.value);
  if(!selectedDist) return false;
  if(!isCurrenciesSelectionValid.value) return false;
  switch (selectedDist) {
    case DistributionType.UNIFORM:
      return distParams.lowerBound?.length > 0 && distParams.upperBound?.length > 0;
    case DistributionType.GAUSSIAN:
      return distParams.sigma?.length > 0 && distParams.mean?.length > 0;
    default: {
      return false;
    }
  }
}


function submitRequest() {

}

</script>
<template>
  <main>
    <multi-select v-model="sourceCurrency" :label="'Source Currency'" :items="availableCurrencies"></multi-select>
    <multi-select v-model="targetCurrency" :label="'Target Currency'" :items="availableCurrencies"></multi-select>
    <v-text-field v-model="currencyValue" type="number" :label="'Amount'"></v-text-field>
    <div v-if="isCurrenciesSelectionValid">
      <distribution-select @value:change="($event: DistributionSelection) =>{ distParameters = $event;}" />
    </div>
  </main>
  <v-btn variant="outlined" :disabled="!isFormValid()" @click="submitRequest">
    Calculate
  </v-btn>
</template>
