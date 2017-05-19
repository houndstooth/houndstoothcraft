import { UNIT, SQUARE_SIZE, STRIPE_COUNT } from '../common/customize'
import calculateOriginAndCenter from '../utilities/calculateOriginAndCenter'
import drawStripes from '../render/drawStripes'
import calculateColors from '../utilities/calculateColors'
import calculateStripes from '../utilities/calculateStripes'

export default ({
					x,
					y,
					center: initialCenter,
					size,
					colors,
					scaleFromGridCenter,
					rotationAboutCenter,
					rotationAboutOrigin,
					stripes,
					stripeCount
				}) => {

	size = size || SQUARE_SIZE
	const sizedUnit = size * UNIT
	const { origin, center } = calculateOriginAndCenter({
		x,
		y,
		initialCenter,
		scaleFromGridCenter,
		sizedUnit
	})

	colors = colors || calculateColors({ x, y })

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