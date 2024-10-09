<template>
  <multi-select :label="'Type Of Distribution'" :items="['Uniform', 'Gaussian']"></multi-select>
</template>
<script>
export default {
  name: 'distribution-select'
}
</script>