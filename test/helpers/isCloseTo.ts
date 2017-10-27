const isCloseTo: (numberOne: number, numberTwo: number) => boolean =
	(numberOne: number, numberTwo: number): boolean => {
		const precision: number = 2

		const pow: number = Math.pow(10, precision + 1)
		const delta: number = Math.abs(numberOne - numberTwo)
		const maxDelta: number = Math.pow(10, -precision) / 2

		return Math.round(delta * pow) / pow <= maxDelta
	}

export { isCloseTo }
