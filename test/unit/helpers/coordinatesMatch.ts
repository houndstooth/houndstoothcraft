import { from } from '../../../src'
import { Coordinate } from '../../../src/space'
import { isCloseTo } from '../../helpers/isCloseTo'

const coordinatesMatch: (expected: Coordinate[], actual: Coordinate[]) => boolean = (expected, actual) =>
	actual.every((coordinate, x) =>
		coordinate.every((axis, y) =>
			isCloseTo(from.Units(axis), from.Units(expected[ x ][ y ]))))

export { coordinatesMatch }
