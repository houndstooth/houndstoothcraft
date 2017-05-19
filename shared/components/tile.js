import { UNIT, SQUARE_SIZE, STRIPE_COUNT } from '../common/customize'
import calculateOriginAndCenter from '../utilities/calculateOriginAndCenter'
import drawStripes from '../render/drawStripes'
import calculateColors from '../utilities/calculateColors'
import calculateStripes from '../utilities/calculateStripes'

export default ({
					origin: initialOrigin,
					center: initialCenter,
					size,
					colors,
					scaleFromGridCenter,
					rotationAboutCenter,
					rotationAboutOrigin,
					stripes,
					stripeCount
				}) => {

	colors = calculateColors({ origin: initialOrigin, colors })

	size = size || SQUARE_SIZE
	const sizedUnit = size * UNIT

	const { origin, center } = calculateOriginAndCenter({
		initialOrigin,
		initialCenter,
		scaleFromGridCenter,
		sizedUnit
	})

	stripeCount = stripeCount || STRIPE_COUNT
	stripes = stripes || calculateStripes({ stripeCount })

	drawStripes({
		sizedUnit,
		center,
		origin,
		rotationAboutCenter,
		rotationAboutOrigin,
		colors,
		stripes
	})
}