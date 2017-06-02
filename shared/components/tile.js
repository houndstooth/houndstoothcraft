import state from '../state/state'
import colorUtilities from '../utilities/colorUtilities'
import transpositionUtilities from '../utilities/transpositionUtilities'
import calculateStripes from '../utilities/calculateStripes'
import houndazzleShapeWrapper from '../../houndazzle/houndazzleShapeWrapper'
import calculateDazzleForTile from '../../houndazzle/calculateDazzleForTile'
import standardShapeWrapper from './standardShapeWrapper'

export default ({ address, size, colors, rotation, initialDazzle }) => {
	const { stripeCountConfig, colorConfig } = state.shared

	const { origin, sizedUnit } = transpositionUtilities.calculateOriginAndSizedUnit({ address, size })

	colors = colorUtilities.calculateColors({ address, colors, colorConfig })

	const dazzle = calculateDazzleForTile({ address, initialDazzle })

	const args = { sizedUnit, origin, rotation, colors, dazzle }
	const shapeWrapper = colorConfig.mode === 'HOUNDAZZLE' ? houndazzleShapeWrapper : standardShapeWrapper

	if (colorUtilities.isTileUniform({ colors, dazzle })) {
		shapeWrapper(args)
	} else {
		const stripes = calculateStripes({ stripeCount: stripeCountConfig.stripeCount, address })
		stripes.forEach((stripeStart, stripeIndex) => {
			args.stripeIndex = stripeIndex
			args.coordinatesOptions = { stripeStart, stripeEnd: stripes[ stripeIndex + 1 ] || 2 }
			shapeWrapper(args)
		})
	}
}
