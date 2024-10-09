export function getUniformCCode(lowBound: number, upperBound: number, amount: number) {
  return `
#include <stdio.h>
#include <stdlib.h>
#include <uxhw.h>

int
main(int argc, char *  argv[])
{
	float lowBound = ${lowBound};	
	float upperBound = ${upperBound};
  float amount = ${amount};
  float exchangeValue = UxHwFloatUniformDist(lowBound, upperBound);
  printf("%f" ,amount * exchangeValue);
	return 0;
}`
}
