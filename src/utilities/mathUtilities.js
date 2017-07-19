const triangularNumber = n => n * (n + 1) / 2

const triangularRoot = n => 0.5 * Math.sqrt(8 * n + 1) - 0.5

const quarterSquareNumber = n => Math.floor(Math.pow(n, 2) / 4)

const trapezoidalNumber = ({ start, height }) => triangularNumber(start + height) - triangularNumber(start)

const termialRoot = ({ initial, delta, n }) => {
	return (
		Math.sqrt(
			Math.pow(
				2 * initial - delta,
				2
			)
				+
				8 * delta * n
		)
			-
			2 * initial + delta
	) / (
		2 * delta
	)
}

export default {
	triangularNumber,
	triangularRoot,
	quarterSquareNumber,
	trapezoidalNumber,
	termialRoot,
}
