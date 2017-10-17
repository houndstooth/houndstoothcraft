import { Coordinate, Radian } from './types'

const rotateCoordinateAboutPoint: {
	({}: { coordinate: Coordinate, point: Coordinate, rotation: Radian }): Coordinate,
} = ({ coordinate, point, rotation }) => {
	const sin = Math.sin(rotation as any)
	const cos = Math.cos(rotation as any)

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
