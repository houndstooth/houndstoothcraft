import * as from from '../../from'
import * as to from '../../to'
import { mathUtilities } from '../../utilities'
import { Coordinate, RotateCoordinateParams } from './types'

const rotateCoordinate: (_: RotateCoordinateParams) => Coordinate =
	({ coordinate, fixedCoordinate, rotation }: RotateCoordinateParams): Coordinate =>
		to.Coordinate(mathUtilities.rotate({
			fixedPoint: from.Coordinate(fixedCoordinate),
			point: from.Coordinate(coordinate),
			rotation,
		}))

export { rotateCoordinate }
