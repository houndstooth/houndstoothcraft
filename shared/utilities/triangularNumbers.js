const triangularNumber = n => n * (n + 1) / 2

const inverseTriangularNumber = n => 0.5 * Math.sqrt(8 * n + 1) - 0.5

export default {
	triangularNumber,
	inverseTriangularNumber
}
