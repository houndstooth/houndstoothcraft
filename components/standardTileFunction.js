import colorUtilities from '../utilities/colorUtilities'
import stripeUtilities from '../utilities/stripeUtilities'
import shape from './shape'


export default ({ address, tileColors }) => {
	const args = { address, tileColors }

	if (colorUtilities.isTileUniform({ tileColors })) {
		shape(args)
	} else {
		const stripePositionsForTile = stripeUtilities.getStripePositionsForTile({ address })
		stripePositionsForTile.forEach((stripeStart, stripeIndex) => {
			args.stripeIndex = stripeIndex
			args.stripeCount = stripePositionsForTile.length
			args.coordinatesOptions = { stripeStart, stripeEnd: stripePositionsForTile[ stripeIndex + 1 ] || 2 }
			shape(args)
		})
	}
}
