import isCloseTo from '../../helpers/isCloseTo'
import { Coordinate } from '../../../src/space'

const coordinatesMatch: { (expected: Coordinate[], actual: Coordinate[]): boolean } = (expected, actual) =>
	actual.every((coordinate, x) =>
		coordinate.every((dimension, y) =>
			isCloseTo(dimension as any, expected[ x ][ y ] as any)))

export default coordinatesMatch
