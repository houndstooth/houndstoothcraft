import state from '../../state'
import { MINOR_DIAGONAL_OFFSET, PRINCIPAL_DIAGONAL_OFFSET } from '../constants'
import rotateCoordinatesAboutPoint from '../utilities/rotateCoordinatesAboutPoint'

export default ({ coordinates, center, origin, rotationAboutCenter }) => {
	if (rotationAboutCenter) {
		coordinates = rotateCoordinatesAboutPoint({
			point: center,
			coordinates: coordinates,
			rotation: rotationAboutCenter
		})
	}

	// if (rotationAboutOrigin) {
	// 	coordinates = rotateCoordinatesAboutPoint({
	// 		point: origin,
	// 		coordinates: coordinates,
	// 		rotation: rotationAboutOrigin
	// 	})
	// }

	const { baseStripeDiagonal, tileRotationAboutTileCenter, canvasSize, gridRotationAboutCenter } = state.shared

	const offset = baseStripeDiagonal === "MINOR" ? MINOR_DIAGONAL_OFFSET : PRINCIPAL_DIAGONAL_OFFSET
	const extraRotation = offset + tileRotationAboutTileCenter
	if (extraRotation !== 0) {
		coordinates = rotateCoordinatesAboutPoint({
			point: center,
			coordinates: coordinates,
			rotation: extraRotation
		})
	}

	if (gridRotationAboutCenter) {
		coordinates = rotateCoordinatesAboutPoint({
			point: [ canvasSize / 2, canvasSize / 2],
			coordinates: coordinates,
			rotation: gridRotationAboutCenter
		})
	}

	return coordinates
}