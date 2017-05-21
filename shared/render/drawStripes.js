import render from './render'
import calculateAnIndividualStripesCoordinates from '../utilities/calculateAnIndividualStripesCoordinates'
import maybeRotateCoordinates from '../utilities/maybeRotateCoordinates'
import calculateColor from '../../shared/utilities/calculateColor'

export default ({ sizedUnit, center, origin, rotationAboutCenter, colors, stripes }) => {
	stripes.forEach((currentPositionAlongPerimeter, index) => {
		const color = calculateColor({ colors, index })
		if (color.a == 0) return
		const nextPositionAlongPerimeter = stripes[ index + 1 ] || 2

		let coordinates = calculateAnIndividualStripesCoordinates({
			currentPositionAlongPerimeter,
			nextPositionAlongPerimeter,
			sizedUnit,
			origin
		})
		coordinates = maybeRotateCoordinates({ coordinates, center, origin, rotationAboutCenter })

		render({ color, coordinates })
	})
}