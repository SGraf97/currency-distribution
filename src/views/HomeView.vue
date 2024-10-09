<script setup lang="ts">
import MultiSelect from '@/components/multi-select.vue'
import DistributionSelect from '@/components/DistributionSelect.vue'
import { computed, ref, toRaw } from 'vue'
import { availableCurrencies } from '@/models/currencies.model'
import type { DistributionSelection } from '@/models/distribution-selection.models'
import { DistributionType } from '@/models/distributions.models'
import { getUniformCCode } from '@/utils/C-code/uniform'
import { getGaussianCCode } from '@/utils/C-code/gauss'
import { getTaskStatus, submitTaskToExecute } from '@/utils/axios.configuration'

const sourceCurrency = ref();
const targetCurrency = ref();
const distParameters = ref();
const currencyValue = ref();
const imageUrl = ref();
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


async function submitRequest() {
  const distParams = toRaw(distParameters.value);
  let codeToExcecute = ``;
  switch (distParams.selectedDistribution) {
    case DistributionType.GAUSSIAN:
      codeToExcecute = getGaussianCCode(distParams.mean, distParams.sigma,currencyValue.value );
      break;
      case DistributionType.UNIFORM:
        codeToExcecute = getUniformCCode(distParams.lowerBound, distParams.upperBound,currencyValue.value );
        break;
  }

  const taskId =await submitTaskToExecute(codeToExcecute);
  console.log(taskId);
  imageUrl.value = await getTaskStatus(taskId);
  console.log(imageUrl.value);
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

  <img  src="https://s3.eu-west-2.amazonaws.com/projectkeacdkstack-prod-plotbucket97cc3f04-4jxgeeeo9ap0/6e21b187-279b-45c6-b112-a14fe9fae217.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIARFIB467WHT63AFGN%2F20241009%2Feu-west-2%2Fs3%2Faws4_request&X-Amz-Date=20241009T231510Z&X-Amz-Expires=604799&X-Amz-SignedHeaders=host&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA8aCWV1LXdlc3QtMiJIMEYCIQDBiLAyDMMydXOvuAsLpl7%2FMJx88cyQhrZwhO8Sve05dwIhAOq9IMnjU9lrPLl2WjwZMgqYGDBO6dfA36vGGQEeFpSoKscDCGgQARoMMDc5OTk3NzYxNTE2IgxHGTtTyOK78Lw4NvAqpAO6zUWO3a2WihM9nGT96txuJrSGUWtJTf3coDil%2BRMr%2B%2B8bwb5yK%2FDkdx3Ij2sn6qN2hOabJDg0GQWuMBLKnOKXCRbmcw4DEjFtcw5qUIwJLQUlAJrz8QeMefO8on662LN8PhnXhASjSxsY25EGtmQq42hQRgks1OiTcaKF%2FyNaFxgs1fgymUDzz1xdhvOdqonEiI%2Fnbo%2FB2D2m0kFr5Lsg9qpct55R77F%2Bvd6Uwzr6i2aMJNd50k7K5VEDafMCg4MkCqD%2BqfNKCTKucWFVd5YMmZNidr1Lrk8kxYFFJOC7MHVZI8rFg6vHiZOXnoeQxw3UxCNq%2FcKDbje0LnNpPiIPmkX3OoUpmEubilOMtoM%2Bm803RZN2rfIzVN7FOA2NzbsLs88BfkY04wppge4JveYc01DXpwnv9ta1s2wPcAUBaPjv0Ua80iaiq58Mh9Jewln2y6pAGzP%2B%2F5O6B3Yo21CBaJRhCE1PfrvxrFidzZ1avNo43cYpWQo98obmY8rqo%2BS0EtqBGmMmEi8ZEVbJMIp%2FhNMCaJadwqaIH5Cl9ViEgUAp1WEw25qcuAY6nQEF9zPZ1Ment6g6jb2DWCWiX8q4kKqFEzgh7C1%2BLr2JtbxW7qCH49r16daWAfkqnLi%2FT%2BhRFbNZHfp2CpXSpCX8fh%2Bcm%2FeA1M7UDCiR0tgpK8WgRdtoX%2F1FrBwgG6%2FfQj5KIgcpUPw3JgL6a2mIv3C9yvBbOIi8PXQsUa5GS9oQfdHCQ7i48l4skJgABdXXJzvYx4FRjeo53Eo%2FgokK&X-Amz-Signature=b2ccbb3ae94d29ee4aaa6967850578ad8b76e4444b1be9011a698a4f305cd48b">
</template>
