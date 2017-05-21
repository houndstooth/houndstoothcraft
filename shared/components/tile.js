import calculateOriginAndCenter from '../utilities/calculateOriginAndCenter'
import drawStripes from '../render/drawStripes'
import drawSquare from '../render/drawSquare'
import calculateColors from '../utilities/calculateColors'
import calculateStripes from '../utilities/calculateStripes'
import isOnCanvas from '../utilities/isOnCanvas'
import colorsAreTheSame from '../utilities/colorsAreTheSame'
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

	size = size || tileSize
	const sizedUnit = size * unit

	const { origin, center } = calculateOriginAndCenter({
		initialOrigin,
		initialCenter,
		scaleFromGridCenter,
		sizedUnit
	})

	// if (!isOnCanvas({ center, sizedUnit })) return

	colors = calculateColors({ origin: initialOrigin, colors })

	if (colorsAreTheSame({ colors })) {
		drawSquare({
			sizedUnit,
			center,
			origin,
			rotationAboutCenter,
			rotationAboutOrigin,
			color: colors[0]
		})
	} else {
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
}