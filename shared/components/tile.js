import calculateOriginAndCenter from '../utilities/calculateOriginAndCenter'
import drawStripes from '../render/drawStripes'
import drawSquare from '../render/drawSquare'
import calculateColors from '../utilities/calculateColors'
import calculateStripes from '../utilities/calculateStripes'
import isOnCanvas from '../utilities/isOnCanvas'
import colorsAreTheSame from '../utilities/colorsAreTheSame'
import calculateGinghamChevronContinuumStripeCount from '../../gingham-chevron-continuum/utilities/calculateGinghamChevronContinuumStripeCount'
import calculateFluidGinghamChevronContinuumStripes from '../../gingham-chevron-continuum-animated/utilities/calculateFluidGinghamChevronContinuumStripes'
import state from '../application/state'

export default ({
					origin: initialOrigin,
					center: initialCenter,
					size,
					colors,
					scaleFromGridCenter,
					rotationAboutCenter
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
		const color = colors[0]
		if (color.a == 0) return
		drawSquare({
			sizedUnit,
			center,
			origin,
			rotationAboutCenter,
			color
		})
	} else {
		let stripes
		let stripeCount = stateStripeCount.baseCount
		if (stateStripeCount.ginghamChevronContinuum.on) {
			if (stateStripeCount.ginghamChevronContinuum.style == 'ALIGNING') {
				stripeCount = calculateGinghamChevronContinuumStripeCount({ origin: initialOrigin })
			} else if (stateStripeCount.ginghamChevronContinuum.style == 'FLUID') {
				// it's nice to do this at the tile level, but wasteful computationally
				// maybe it's smart to cache the overall stripes answer locally, ie in this file
				stripes = calculateFluidGinghamChevronContinuumStripes({ origin: initialOrigin })
			}
		}
		stripes = stripes || calculateStripes({ stripeCount })

		drawStripes({
			sizedUnit,
			center,
			origin,
			rotationAboutCenter,
			colors,
			stripes
		})
	}
}