import { from, mathUtilities, to } from '../../utilities'
import { Coordinate, RotateCoordinateParams } from './types'

const rotateCoordinate: (_: RotateCoordinateParams) => Coordinate =
	({ coordinate, fixedCoordinate, rotation }: RotateCoordinateParams): Coordinate =>
		to.Coordinate(mathUtilities.rotate({
			fixedPoint: from.Coordinate(fixedCoordinate),
			point: from.Coordinate(coordinate),
			rotation,
		}))

export default rotateCoordinate
