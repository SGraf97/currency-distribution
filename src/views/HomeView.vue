<script setup lang="ts">
import MultiSelect from '@/components/multi-select.vue'
import DistributionSelect from '@/components/DistributionSelect.vue'
import { computed, ref, toRaw } from 'vue'
import { availableCurrencies } from '@/models/currencies.model'
import type { DistributionSelection } from '@/models/distribution-selection.models'
import { DistributionType } from '@/models/distributions.models'
import { getUniformCCode } from '@/utils/C-code/uniform'
import { getGaussianCCode } from '@/utils/C-code/gauss'
import { getTaskPlotImage, submitTaskToExecute } from '@/utils/axios.configuration'

const sourceCurrency = ref()
const targetCurrency = ref()
const distParameters = ref()
const currencyValue = ref()
const imageUrl = ref()
const isLoading = ref(false)
let taskID = ''
const retry = ref(false)
const isCurrenciesSelectionValid = computed(() => {
  if (!sourceCurrency.value || !targetCurrency.value) return false
  return sourceCurrency.value !== targetCurrency.value
})

const isFormValid = function () {
  const selectedDist = distParameters?.value?.selectedDistribution
  const distParams = toRaw(distParameters.value)
  if (!selectedDist) return false
  if (!isCurrenciesSelectionValid.value) return false
  switch (selectedDist) {
    case DistributionType.UNIFORM:
      return distParams.lowerBound?.length > 0 && distParams.upperBound?.length > 0
    case DistributionType.GAUSSIAN:
      return distParams.sigma?.length > 0 && distParams.mean?.length > 0
    default: {
      return false
    }
  }
}

async function submitRequest() {
  const distParams = toRaw(distParameters.value)
  let codeToExcecute = ``
  switch (distParams.selectedDistribution) {
    case DistributionType.GAUSSIAN:
      codeToExcecute = getGaussianCCode(distParams.mean, distParams.sigma, currencyValue.value)
      break
    case DistributionType.UNIFORM:
      codeToExcecute = getUniformCCode(
        distParams.lowerBound,
        distParams.upperBound,
        currencyValue.value
      )
      break
  }
  isLoading.value = true
  taskID = await submitTaskToExecute(codeToExcecute)

  try {
    getTaskPlotImage(taskID).then((res) => {
      console.log(res)
      imageUrl.value = res
      if (!imageUrl.value) {
        retry.value = true
      } else {
        retry.value = false
      }
    })
    console.log('here')
  } catch {
    console.error('Something went wrong while submitting the task')
  }
  isLoading.value = false
  console.log(imageUrl.value)
}
function retryGettingImage() {
  getTaskPlotImage(taskID).then((res) => {
    console.log(res)
    imageUrl.value = res
    if (!imageUrl.value) {
      retry.value = true
    } else {
      retry.value = false
    }
  })
}
</script>
<template>
  <main>
    <multi-select
      v-model="sourceCurrency"
      :label="'Source Currency'"
      :items="availableCurrencies"
    ></multi-select>
    <multi-select
      v-model="targetCurrency"
      :label="'Target Currency'"
      :items="availableCurrencies"
    ></multi-select>
    <v-text-field v-model="currencyValue" type="number" :label="'Amount'"></v-text-field>
    <div v-if="isCurrenciesSelectionValid">
      <distribution-select
        @value:change="
          ($event: DistributionSelection) => {
            distParameters = $event
          }
        "
      />
    </div>
    <p v-if="retry">Task has not completed yet. Please retry</p>
    <v-btn variant="outlined" :disabled="!isFormValid()" @click="submitRequest"> Calculate </v-btn>
    <v-btn variant="outlined" :disabled="!retry" @click="retryGettingImage">
      Retry getting task plot
    </v-btn>
    <v-progress-linear color="green" indeterminate v-if="isLoading"></v-progress-linear>
    <img v-if="imageUrl" :src="imageUrl" />
  </main>
</template>
