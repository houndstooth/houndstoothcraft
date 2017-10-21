import * as from from '../from'
import * as to from '../to'
import { Coordinate, Radian } from './types'

const rotateCoordinateAboutPoint: (_: {
	coordinate: Coordinate, point: Coordinate, rotation: Radian,
}) => Coordinate = ({ coordinate, point, rotation }) => {
	const sin = Math.sin(from.Radian(rotation))
	const cos = Math.cos(from.Radian(rotation))

	const pointX = from.Units(point[ 0 ])
	const pointY = from.Units(point[ 1 ])

	const relativeX = from.Units(coordinate[ 0 ]) - pointX
	const relativeY = from.Units(coordinate[ 1 ]) - pointY

	return to.Coordinate([
		pointX + relativeX * cos - relativeY * sin,
		pointY + relativeX * sin + relativeY * cos,
	])
}

export { rotateCoordinateAboutPoint }
