export enum DistributionType {
  UNIFORM = 'Uniform',
  GAUSSIAN = 'Gaussian'
}

export const availableDistributions: DistributionType[] = [
  DistributionType.GAUSSIAN,
  DistributionType.UNIFORM
]
