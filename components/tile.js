import state from '../state/state'
import colorUtilities from '../utilities/colorUtilities'
import stripes from './stripes'
import houndazzleShapes from '../variations/houndazzle/houndazzleShapes'
import getDazzle from '../variations/houndazzle/getDazzle'
import shape from './shape'

export default ({ address }) => {
	const { stripeCountConfig, colorConfig } = state

	const tileColors = colorUtilities.getColorsForTile({ address, colorConfig })

	const tileDazzle = colorConfig.mode === 'HOUNDAZZLE' && getDazzle({ address })

	const args = { address, tileColors, tileDazzle }
	const shapesFunction = colorConfig.mode === 'HOUNDAZZLE' ? houndazzleShapes : shape

	if (colorUtilities.isTileUniform({ tileColors, tileDazzle })) {
		shapesFunction(args)
	} else {
		const tileStripes = stripes({ stripeCount: stripeCountConfig.stripeCount, address })
		tileStripes.forEach((stripeStart, stripeIndex) => {
			args.stripeIndex = stripeIndex
			args.stripeCount = tileStripes.length
			args.coordinatesOptions = { stripeStart, stripeEnd: tileStripes[ stripeIndex + 1 ] || 2 }
			shapesFunction(args)
		})
	}
}
