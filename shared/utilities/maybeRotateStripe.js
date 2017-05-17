import { BASE_STRIPE_DIAGONAL, STRIPE_ROTATION } from '../common/customize'
import { MINOR_DIAGONAL_OFFSET, PRINCIPAL_DIAGONAL_OFFSET } from '../common/constants'
import rotateCoordinatesAboutPoint from '../utilities/rotateCoordinatesAboutPoint'

export default ({coordinates, center, origin, rotationAboutCenter, rotationAboutOrigin }) => {
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

	const offset = BASE_STRIPE_DIAGONAL === "MINOR" ? MINOR_DIAGONAL_OFFSET : PRINCIPAL_DIAGONAL_OFFSET
	const extraRotation = offset + STRIPE_ROTATION
	if (extraRotation !== 0) {
		coordinates = rotateCoordinatesAboutPoint({
			point: center,
			coordinates: coordinates,
			rotation: extraRotation
		})
	}

	return coordinates
}