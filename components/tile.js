import state from '../state/state'
import colorUtilities from '../utilities/colorUtilities'
import stripeUtilities from '../utilities/stripeUtilities'
import houndazzleShapes from '../effects/houndazzle/houndazzleShapes'
import getDazzle from '../effects/houndazzle/getDazzle'
import shape from './shape'

export default ({ address }) => {
	const { colorConfig } = state

	const tileColors = colorUtilities.getColorsForTile({ address, colorConfig })

	const tileDazzle = colorConfig.mode === 'HOUNDAZZLE' && getDazzle({ address })

	const args = { address, tileColors, tileDazzle }
	const shapes = colorConfig.mode === 'HOUNDAZZLE' ? houndazzleShapes : shape

	if (colorUtilities.isTileUniform({ tileColors, tileDazzle })) {
		shapes(args)
	} else {
		const stripePositionsForTile = stripeUtilities.getStripePositionsForTile({ address })
		stripePositionsForTile.forEach((stripeStart, stripeIndex) => {
			args.stripeIndex = stripeIndex
			args.stripeCount = stripePositionsForTile.length
			args.coordinatesOptions = { stripeStart, stripeEnd: stripePositionsForTile[ stripeIndex + 1 ] || 2 }
			shapes(args)
		})
	}
}
