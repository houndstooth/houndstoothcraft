import state from '../state/state'

const MINOR_DIAGONAL_OFFSET = 0
const PRINCIPAL_DIAGONAL_OFFSET = Math.PI / 2

const rotateCoordinateAboutPoint = ({ coordinate, point, rotation }) => {
	const sin = Math.sin(rotation)
	const cos = Math.cos(rotation)

	const offsetX = coordinate[ 0 ] - point[ 0 ]
	const offsetY = coordinate[ 1 ] - point[ 1 ]

	return [
		point[ 0 ] + offsetX * cos - offsetY * sin,
		point[ 1 ] + offsetX * sin + offsetY * cos
	]
}

const rotateCoordinatesAboutPoint = ({ coordinates, point, rotation }) => {
	return coordinates.map(coordinate => rotateCoordinateAboutPoint({ coordinate, point, rotation }))
}

const calculateCenter = ({ origin, sizedUnit }) => [ origin[ 0 ] + sizedUnit / 2, origin[ 1 ] + sizedUnit / 2 ]

const applyRotation = ({ coordinates, origin, sizedUnit }) => {
	const center = calculateCenter({ origin, sizedUnit })

	const { baseStripeDiagonal, tileRotationAboutTileCenter, canvasSize, gridRotationAboutCenter } = state

	const offset = baseStripeDiagonal === "MINOR" ? MINOR_DIAGONAL_OFFSET : PRINCIPAL_DIAGONAL_OFFSET
	const tileRotation = offset + tileRotationAboutTileCenter
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
