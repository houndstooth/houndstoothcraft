const isCloseTo: { (numberOne: number, numberTwo: number): boolean } = (numberOne, numberTwo) => {
	const precision = 2

	const pow = Math.pow(10, precision + 1)
	const delta = Math.abs(numberOne - numberTwo)
	const maxDelta = Math.pow(10, -precision) / 2

	return Math.round(delta * pow) / pow <= maxDelta
}

export default isCloseTo
