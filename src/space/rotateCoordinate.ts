import * as from from '../utilities/from'
import { rotate } from '../utilities/mathUtilities'
import * as to from '../utilities/to'
import { Coordinate, RotateCoordinateParams } from './types'

const rotateCoordinate: (_: RotateCoordinateParams) => Coordinate =
	({ coordinate, fixedCoordinate, rotation }: RotateCoordinateParams): Coordinate =>
		to.Coordinate(rotate({
			fixedPoint: from.Coordinate(fixedCoordinate),
			point: from.Coordinate(coordinate),
			rotation,
		}))

export { rotateCoordinate }
