import state from '../state/state'
import { QUARTER_OF_CIRCLE_ROTATION } from '../application/constants'

const ROTATION_OFFSET_FOR_MINOR_DIAGONAL_STRIPES = 0
const ROTATION_OFFSET_FOR_PRINCIPAL_DIAGONAL_STRIPES = QUARTER_OF_CIRCLE_ROTATION

const rotateCoordinateAboutPoint = ({ coordinate, point, rotation }) => {
	const sin = Math.sin(rotation)
	const cos = Math.cos(rotation)

	const relativeX = coordinate[ 0 ] - point[ 0 ]
	const relativeY = coordinate[ 1 ] - point[ 1 ]

	return [
		point[ 0 ] + relativeX * cos - relativeY * sin,
		point[ 1 ] + relativeX * sin + relativeY * cos
	]
}

const rotateCoordinatesAboutPoint = ({ coordinates, point, rotation }) => {
	return coordinates.map(coordinate => rotateCoordinateAboutPoint({ coordinate, point, rotation }))
}

const getShapeCenter = ({ origin, sizedUnit }) => [ origin[ 0 ] + sizedUnit / 2, origin[ 1 ] + sizedUnit / 2 ]

const applyRotationToShape = ({ coordinates, origin, sizedUnit }) => {
	const center = getShapeCenter({ origin, sizedUnit })

	const { baseStripeDiagonal, tileRotationAboutTileCenter, canvasSize, gridRotationAboutGridCenter } = state

	const stripeDiagonalRotationOffset = baseStripeDiagonal === "MINOR" ? ROTATION_OFFSET_FOR_MINOR_DIAGONAL_STRIPES : ROTATION_OFFSET_FOR_PRINCIPAL_DIAGONAL_STRIPES
	const rotationFromTile = stripeDiagonalRotationOffset + tileRotationAboutTileCenter
	if (rotationFromTile !== 0) {
		coordinates = rotateCoordinatesAboutPoint({
			point: center,
			coordinates: coordinates,
			rotation: rotationFromTile
		})
	}

	if (gridRotationAboutGridCenter) {
		coordinates = rotateCoordinatesAboutPoint({
			point: [ canvasSize / 2, canvasSize / 2 ],
			coordinates: coordinates,
			rotation: gridRotationAboutGridCenter
		})
	}

	return coordinates
}

export default {
	applyRotationToShape
}
