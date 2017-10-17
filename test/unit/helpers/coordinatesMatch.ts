import { Coordinate } from '../../../src/space'
import isCloseTo from '../../helpers/isCloseTo'

const coordinatesMatch: (expected: Coordinate[], actual: Coordinate[]) => boolean = (expected, actual) =>
	actual.every((coordinate, x) =>
		coordinate.every((dimension, y) =>
			isCloseTo(dimension as any, expected[ x ][ y ] as any)))

export default coordinatesMatch
