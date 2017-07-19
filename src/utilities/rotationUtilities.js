import { QUARTER_OF_CIRCLE_ROTATION } from '../constants'

const ROTATION_OFFSET_FOR_MINOR_DIAGONAL_STRIPES = 0
const ROTATION_OFFSET_FOR_PRINCIPAL_DIAGONAL_STRIPES = QUARTER_OF_CIRCLE_ROTATION

const rotateCoordinateAboutPoint = ({ coordinate, point, rotation }) => {
	const sin = Math.sin(rotation)
	const cos = Math.cos(rotation)

	const relativeX = coordinate[ 0 ] - point[ 0 ]
	const relativeY = coordinate[ 1 ] - point[ 1 ]

	return [
		point[ 0 ] + relativeX * cos - relativeY * sin,
		point[ 1 ] + relativeX * sin + relativeY * cos,
	]
}

const rotateCoordinatesAboutPoint = ({ coordinates, point, rotation }) => {
	return coordinates.map(coordinate => rotateCoordinateAboutPoint({ coordinate, point, rotation }))
}

const getShapeCenter = ({ tileOrigin, sizedUnit }) => [ tileOrigin[ 0 ] + sizedUnit / 2, tileOrigin[ 1 ] + sizedUnit / 2 ]

const applyRotationToShape = ({ coordinates, tileOrigin, sizedUnit }) => {
	const center = getShapeCenter({ tileOrigin, sizedUnit })

	let { baseStripeDiagonal, gridSettings, viewSettings } = current.settings.initial
	const canvasSize = viewSettings && viewSettings.canvasSize
	const gridRotationAboutCanvasCenter = gridSettings && gridSettings.gridRotationAboutCanvasCenter

	let stripeDiagonalRotationOffset
	if (baseStripeDiagonal === 'MINOR') {
		stripeDiagonalRotationOffset = ROTATION_OFFSET_FOR_MINOR_DIAGONAL_STRIPES
	}
	else {
		stripeDiagonalRotationOffset = ROTATION_OFFSET_FOR_PRINCIPAL_DIAGONAL_STRIPES
	}
	if (stripeDiagonalRotationOffset !== 0) {
		coordinates = rotateCoordinatesAboutPoint({
			point: center,
			coordinates: coordinates,
			rotation: stripeDiagonalRotationOffset,
		})
	}

	if (gridRotationAboutCanvasCenter) {
		coordinates = rotateCoordinatesAboutPoint({
			point: [ canvasSize / 2, canvasSize / 2 ],
			coordinates: coordinates,
			rotation: gridRotationAboutCanvasCenter,
		})
	}

	return coordinates
}

export default {
	applyRotationToShape,
}
