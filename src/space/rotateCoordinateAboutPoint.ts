import * as from from '../utilities/from'
import * as to from '../utilities/to'
import { Coordinate, Radian } from './types'

const rotateCoordinateAboutPoint: (_: {
	coordinate: Coordinate, point: Coordinate, rotation: Radian,
}) => Coordinate = ({ coordinate, point, rotation }) => {
	const sin = Math.sin(from.Radian(rotation))
	const cos = Math.cos(from.Radian(rotation))

	const pointX = from.Unit(point[ 0 ])
	const pointY = from.Unit(point[ 1 ])

	const relativeX = from.Unit(coordinate[ 0 ]) - pointX
	const relativeY = from.Unit(coordinate[ 1 ]) - pointY

	return to.Coordinate([
		pointX + relativeX * cos - relativeY * sin,
		pointY + relativeX * sin + relativeY * cos,
	])
}

export { rotateCoordinateAboutPoint }
