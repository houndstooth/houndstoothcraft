import state from '../state/state'
import colorUtilities from '../utilities/colorUtilities'
import shape from './shape'
import transpositionUtilities from '../utilities/transpositionUtilities'
import gatherOptions from '../state/gatherOptions'
import stripeUtilities from '../utilities/stripeUtilities'
import square from '../shapes/square'
import stripe from '../shapes/stripe'

export default ({ address }) => {
	const { colorConfig } = state

	const tileColors = colorUtilities.getColorsForTile({ address, colorConfig })

	const { tileOrigin, sizedUnit } = transpositionUtilities.getTileOriginAndSizedUnit({ address })
	if (!tileOrigin) return

	const shapes = state.tileConfig.tileToShapes || shape

	const options = state.gatherOptions && gatherOptions({ address })

	if (state.tileConfig.collapseSameColoredShapesWithinTile) {
		const isTileUniform = state.tileConfig.isTileUniform || colorUtilities.isTileUniform
		if (isTileUniform({ tileColors, options })) {
			shapes({
				getCoordinates: square,
				address,
				tileColors,
				tileOrigin,
				sizedUnit,
				options,
			})
			return
		}
	}

	const stripePositionsForTile = stripeUtilities.getStripePositionsForTile({ address })
	stripePositionsForTile.forEach((stripeStart, stripeIndex) => {
		shapes({
			getCoordinates: stripe,
			address,
			tileColors,
			tileOrigin,
			sizedUnit,
			options,
			colorsIndex: stripeIndex,
			stripeIndex,
			stripeCount: stripePositionsForTile.length,
			coordinatesOptions: { stripeStart, stripeEnd: stripePositionsForTile[ stripeIndex + 1 ] || 2 }
		})
	})
}
