import * as from from '../utilities/from'
import { rotate } from '../utilities/mathUtilities'
import * as to from '../utilities/to'
import { Coordinate, Radian } from './types'

const rotateCoordinate: (_: {
	coordinate: Coordinate, fixedCoordinate: Coordinate, rotation: Radian,
}) => Coordinate = ({ coordinate, fixedCoordinate, rotation }) => {
	const rotatedPoint = rotate({
		fixedPoint: from.Coordinate(fixedCoordinate),
		point: from.Coordinate(coordinate),
		rotation,
	})

	return to.Coordinate(rotatedPoint)
}

export { rotateCoordinate }
