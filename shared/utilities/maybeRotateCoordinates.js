import state from '../../state'
import { MINOR_DIAGONAL_OFFSET, PRINCIPAL_DIAGONAL_OFFSET, CENTER } from '../constants'
import rotateCoordinatesAboutPoint from '../utilities/rotateCoordinatesAboutPoint'

export default ({ coordinates, center, origin, rotationAboutCenter, rotationAboutOrigin }) => {
	if (rotationAboutCenter) {
		coordinates = rotateCoordinatesAboutPoint({
			point: center,
			coordinates: coordinates,
			rotation: rotationAboutCenter
		})
	}

	if (rotationAboutOrigin) {
		coordinates = rotateCoordinatesAboutPoint({
			point: origin,
			coordinates: coordinates,
			rotation: rotationAboutOrigin
		})
	}

	const offset = state.shared.baseStripeDiagonal === "MINOR" ? MINOR_DIAGONAL_OFFSET : PRINCIPAL_DIAGONAL_OFFSET
	const extraRotation = offset + state.shared.tileRotationAboutTileCenter
	if (extraRotation !== 0) {
		coordinates = rotateCoordinatesAboutPoint({
			point: center,
			coordinates: coordinates,
			rotation: extraRotation
		})
	}

	if (state.shared.gridRotationAboutCenter) {
		coordinates = rotateCoordinatesAboutPoint({
			point: CENTER,
			coordinates: coordinates,
			rotation: state.shared.gridRotationAboutCenter
		})
	}

	return coordinates
}