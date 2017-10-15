import { Coordinate } from './types'

type RotateCoordinateAboutPoint = { ({}: { coordinate: Coordinate, point: Coordinate, rotation: number }): Coordinate }
const rotateCoordinateAboutPoint: RotateCoordinateAboutPoint = ({ coordinate, point, rotation }) => {
	const sin = Math.sin(rotation)
	const cos = Math.cos(rotation)

	const pointX = point[ 0 ] as any
	const pointY = point[ 1 ] as any

	const relativeX = coordinate[ 0 ] as any - pointX
	const relativeY = coordinate[ 1 ] as any - pointY

	return [
		pointX + relativeX * cos - relativeY * sin,
		pointY + relativeX * sin + relativeY * cos,
	] as Coordinate
}

export default rotateCoordinateAboutPoint
