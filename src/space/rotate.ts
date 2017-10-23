import { Pixel } from '../render'
import * as from from '../utilities/from'
import { Coordinate, Radian } from './types'

const rotate: {
	(_: { fixedPoint: Coordinate, point: Coordinate, rotation: Radian }): Coordinate
	(_: { fixedPoint: Pixel, point: Pixel, rotation: Radian }): Pixel,
} = ({ fixedPoint, point, rotation }) => {
	const downcastPoint = point as number
	const downcastFixedPoint = fixedPoint as number

	const sin = Math.sin(from.Radian(rotation))
	const cos = Math.cos(from.Radian(rotation))

	const pointX = from.Unit(downcastFixedPoint[ 0 ])
	const pointY = from.Unit(downcastFixedPoint[ 1 ])

	const relativeX = from.Unit(downcastPoint[ 0 ]) - pointX
	const relativeY = from.Unit(downcastPoint[ 1 ]) - pointY

	return [
		pointX + relativeX * cos - relativeY * sin,
		pointY + relativeX * sin + relativeY * cos,
	] as any
}

export { rotate }
