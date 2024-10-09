export enum DistributionType {
  UNIFORM = 'uniform',
  GAUSSIAN = 'gaussian',
}

export const availableDistributions: DistributionType[] = [
  DistributionType.GAUSSIAN,
  DistributionType.UNIFORM,
]