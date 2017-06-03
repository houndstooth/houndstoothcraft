import state from '../state/state'
import colorUtilities from '../utilities/colorUtilities'
import calculateStripes from '../utilities/calculateStripes'
import houndazzleShapeWrapper from '../../houndazzle/houndazzleShapeWrapper'
import calculateDazzleForTile from '../../houndazzle/calculateDazzleForTile'
import standardShapeWrapper from './standardShapeWrapper'

export default ({ address, colors, rotation, initialDazzle }) => {
	const { stripeCountConfig, colorConfig } = state

	colors = colorUtilities.calculateColors({ address, colors, colorConfig })

	const dazzle = calculateDazzleForTile({ address, initialDazzle })

	const args = { address, colors, rotation, dazzle }
	const shapeWrapper = colorConfig.mode === 'HOUNDAZZLE' ? houndazzleShapeWrapper : standardShapeWrapper

	if (colorUtilities.isTileUniform({ colors, dazzle })) {
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
