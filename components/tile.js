import state from '../state/state'
import colorUtilities from '../utilities/colorUtilities'
import stripes from './stripes'
import houndazzleShapeWrapper from '../variations/houndazzle/houndazzleShapeWrapper'
import getDazzle from '../variations/houndazzle/getDazzle'
import standardShapeWrapper from './standardShapeWrapper'

export default ({ address }) => {
	const { stripeCountConfig, colorConfig } = state

	const tileColors = colorUtilities.getColorsForTile({ address, colorConfig })

	const tileDazzle = colorConfig.mode === 'HOUNDAZZLE' && getDazzle({ address })

	const args = { address, tileColors, tileDazzle }
	const shapeWrapper = colorConfig.mode === 'HOUNDAZZLE' ? houndazzleShapeWrapper : standardShapeWrapper

	if (colorUtilities.isTileUniform({ tileColors, tileDazzle })) {
		shapeWrapper(args)
	} else {
		const tileStripes = stripes({ stripeCount: stripeCountConfig.stripeCount, address })
		tileStripes.forEach((stripeStart, stripeIndex) => {
			args.stripeIndex = stripeIndex
			args.stripeCount = tileStripes.length
			args.coordinatesOptions = { stripeStart, stripeEnd: tileStripes[ stripeIndex + 1 ] || 2 }
			shapeWrapper(args)
		})
	}
}
