export function getGaussianCCode(mu: number, sigma: number, amount: number) {
  return `
#include <stdio.h>
#include <stdlib.h>
#include <uxhw.h>

int
main(int argc, char *  argv[])
{
	float mu = ${mu};	
	float sigma = ${sigma};
  float amount = ${amount};
  float exchangeValue = UxHwFloatGaussDist(mu, sigma);
  printf("%f" ,amount * exchangeValue);
	return 0;
}`
}
