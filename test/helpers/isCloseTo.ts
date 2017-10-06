const isCloseTo = (numberOne, numberTwo) => {
	const precision = 2

	let pow = Math.pow(10, precision + 1)
	let delta = Math.abs(numberOne - numberTwo)
	let maxDelta = Math.pow(10, -precision) / 2

	return Math.round(delta * pow) / pow <= maxDelta
}

export default isCloseTo
