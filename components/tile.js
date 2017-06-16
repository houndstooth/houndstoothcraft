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

	const options = state.gatherOptions && gatherOptions({address})
	const args = { shapes, address, tileColors, tileOrigin, sizedUnit, options }

	if (state.tileConfig.collapseSameColoredShapesWithinTile) {
		const isTileUniform = state.tileConfig.isTileUniform || colorUtilities.isTileUniform
		if (isTileUniform(args)) {
			combineShapesWithSquareShape(args)
			return
		}
	}

	combineShapesWithStripeShapes(args)
}

const combineShapesWithSquareShape = args => {
	if (!args.getCoordinates) args.getCoordinates = square
	args.shapes(args)
}

const combineShapesWithStripeShapes = args => {
	if (!args.getCoordinates) args.getCoordinates = stripe
	const stripePositionsForTile = stripeUtilities.getStripePositionsForTile({ address: args.address })
	stripePositionsForTile.forEach((stripeStart, stripeIndex) => {
		args.colorsIndex = stripeIndex
		args.stripeIndex = stripeIndex
		args.stripeCount = stripePositionsForTile.length
		args.coordinatesOptions = { stripeStart, stripeEnd: stripePositionsForTile[ stripeIndex + 1 ] || 2 }
		args.shapes(args)
	})
}
