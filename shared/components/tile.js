import calculateOriginAndCenter from '../utilities/calculateOriginAndCenter'
import drawStripes from '../render/drawStripes'
import calculateColors from '../utilities/calculateColors'
import calculateStripes from '../utilities/calculateStripes'
import state from '../../state'

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
	const { unit, tileSize, stripeCount: stateStripeCount } = state.shared

	colors = calculateColors({ origin: initialOrigin, colors })

	size = size || tileSize
	const sizedUnit = size * unit

	const { origin, center } = calculateOriginAndCenter({
		initialOrigin,
		initialCenter,
		scaleFromGridCenter,
		sizedUnit
	})

	stripeCount = stripeCount || stateStripeCount
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