import colorUtilities from '../utilities/colorUtilities'
import stripeUtilities from '../utilities/stripeUtilities'

export default (args) => {
	if (colorUtilities.isTileUniform(args)) {
		args.shape(args)
	} else {
		const stripePositionsForTile = stripeUtilities.getStripePositionsForTile({ address: args.address })
		stripePositionsForTile.forEach((stripeStart, stripeIndex) => {
			args.stripeIndex = stripeIndex
			args.stripeCount = stripePositionsForTile.length
			args.coordinatesOptions = { stripeStart, stripeEnd: stripePositionsForTile[ stripeIndex + 1 ] || 2 }
			args.shape(args)
		})
	}
}