import isCloseTo from '../../helpers/isCloseTo'

export default (expected, actual) => {
	return actual.every((coordinate, x) => {
		return coordinate.every((dimension, y) => {
			return isCloseTo(dimension, expected[ x ][ y ])
		})
	})
}
