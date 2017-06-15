import colorUtilities from '../utilities/colorUtilities'
import stripeUtilities from '../utilities/stripeUtilities'
import state from '../state/state'

export default (args) => {
	if (state.tileConfig.collapseSameColoredShapesWithinTile) {
		const isTileUniform = state.tileConfig.isTileUniform || colorUtilities.isTileUniform
		if (isTileUniform(args)) {
			combineShapesWithSquareShape(args)
			return
		}
	}

	combineShapesWithStripeShapes(args)
}

const combineShapesWithSquareShape = args => args.shapes(args)

const combineShapesWithStripeShapes = args => {
	const stripePositionsForTile = stripeUtilities.getStripePositionsForTile({ address: args.address })
	stripePositionsForTile.forEach((stripeStart, stripeIndex) => {
		args.stripeIndex = stripeIndex
		args.stripeCount = stripePositionsForTile.length
		args.coordinatesOptions = { stripeStart, stripeEnd: stripePositionsForTile[ stripeIndex + 1 ] || 2 }
		args.shapes(args)
	})
}
