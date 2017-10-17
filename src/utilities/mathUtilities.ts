const triangularNumber: (n: number) => number = n => n * (n + 1) / 2

const triangularRoot: (n: number) => number = n => Math.sqrt(n * 8 + 1) * 0.5 - 0.5

const quarterSquareNumber: (n: number) => number = n => Math.floor(Math.pow(n, 2) / 4)

const trapezoidalNumber: (_: { height: number, start: number}) => number = ({ height, start }) =>
	triangularNumber(start + height) - triangularNumber(start)

const termialRoot: (_: {
	n: number, rangeDelta: number, rangeStart: number,
}) => number = ({ n, rangeDelta, rangeStart }) => {
	const c = rangeStart * 2
	const a = Math.pow(c - rangeDelta, 2)
	const b = rangeDelta * n * 8
	const d = rangeDelta * 2

	return (Math.sqrt(a + b) - c + rangeDelta) / d
}

export {
	trapezoidalNumber,
	triangularNumber,
	triangularRoot,
	quarterSquareNumber,
	termialRoot,
}
