import state from '../state/state'

const ROTATION_OFFSET_FOR_MINOR_DIAGONAL_STRIPES = 0
const ROTATION_OFFSET_FOR_PRINCIPAL_DIAGONAL_STRIPES = Math.PI / 2

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

const getCenter = ({ origin, sizedUnit }) => [ origin[ 0 ] + sizedUnit / 2, origin[ 1 ] + sizedUnit / 2 ]

const applyRotation = ({ coordinates, origin, sizedUnit }) => {
	const center = getCenter({ origin, sizedUnit })

	const { baseStripeDiagonal, tileRotationAboutTileCenter, canvasSize, gridRotationAboutCenter } = state

	const stripeDiagonalRotationOffset = baseStripeDiagonal === "MINOR" ? ROTATION_OFFSET_FOR_MINOR_DIAGONAL_STRIPES : ROTATION_OFFSET_FOR_PRINCIPAL_DIAGONAL_STRIPES
	const tileRotation = stripeDiagonalRotationOffset + tileRotationAboutTileCenter
	if (tileRotation !== 0) {
		coordinates = rotateCoordinatesAboutPoint({
			point: center,
			coordinates: coordinates,
			rotation: tileRotation
		})
	}

	if (gridRotationAboutCenter) {
		coordinates = rotateCoordinatesAboutPoint({
			point: [ canvasSize / 2, canvasSize / 2 ],
			coordinates: coordinates,
			rotation: gridRotationAboutCenter
		})
	}

	return coordinates
}

export default {
	applyRotation
}
