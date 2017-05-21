import render from './render'
import calculateAnIndividualStripesCoordinates from '../utilities/calculateAnIndividualStripesCoordinates'
import maybeRotateCoordinates from '../utilities/maybeRotateCoordinates'
import calculateColor from '../../shared/utilities/calculateColor'

export default ({ sizedUnit, center, origin, rotationAboutCenter, rotationAboutOrigin, colors, stripes }) => {
	stripes.forEach((currentPositionAlongPerimeter, index) => {
		const color = calculateColor({ colors, index })
		const nextPositionAlongPerimeter = stripes[ index + 1 ] || 2

		let coordinates = calculateAnIndividualStripesCoordinates({
			currentPositionAlongPerimeter,
			nextPositionAlongPerimeter,
			sizedUnit,
			origin
		})
		coordinates = maybeRotateCoordinates({ coordinates, center, origin, rotationAboutCenter, rotationAboutOrigin })

		render({ color, coordinates })
	})
}