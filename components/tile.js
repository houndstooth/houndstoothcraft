import state from '../state/state'
import colorUtilities from '../utilities/colorUtilities'
import calculateStripes from '../utilities/calculateStripes'
import houndazzleShapeWrapper from '../variations/houndazzle/houndazzleShapeWrapper'
import calculateDazzle from '../variations/houndazzle/calculateDazzle'
import standardShapeWrapper from './standardShapeWrapper'

export default ({ address }) => {
	const { stripeCountConfig, colorConfig } = state

	const tileColors = colorUtilities.calculateColorsForTile({ address, colorConfig })

	const tileDazzle = colorConfig.mode === 'HOUNDAZZLE' && calculateDazzle({ address })

	const args = { address, tileColors, tileDazzle }
	const shapeWrapper = colorConfig.mode === 'HOUNDAZZLE' ? houndazzleShapeWrapper : standardShapeWrapper

	if (colorUtilities.isTileUniform({ tileColors, tileDazzle })) {
		shapeWrapper(args)
	} else {
		const stripes = calculateStripes({ stripeCount: stripeCountConfig.stripeCount, address })
		stripes.forEach((stripeStart, stripeIndex) => {
			args.stripeIndex = stripeIndex
			args.stripeCount = stripes.length
			args.coordinatesOptions = { stripeStart, stripeEnd: stripes[ stripeIndex + 1 ] || 2 }
			shapeWrapper(args)
		})
	}
}
