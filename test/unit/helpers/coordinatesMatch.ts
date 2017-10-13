import isCloseTo from '../../helpers/isCloseTo'
import { Coordinate } from '../../../src/space'

const coordinatesMatch: { (expected: Coordinate[], actual: Coordinate[]): boolean } = (expected, actual) => {
	return actual.every((coordinate, x) => {
		return coordinate.every((dimension, y) => {
			return isCloseTo(dimension, expected[ x ][ y ])
		})
	})
}

export default coordinatesMatch
