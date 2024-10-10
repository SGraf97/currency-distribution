import type { DistributionType } from '@/models/distributions.models'

export interface DistributionSelection {
  selectedDistribution: DistributionType
  lowerBound: number
  upperBound: number
  mean: number
  sigma: number
}
