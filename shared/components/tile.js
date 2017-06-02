import state from '../state/state'
import colorUtilities from '../utilities/colorUtilities'
import transpositionUtilities from '../utilities/transpositionUtilities'
import calculateStripes from '../utilities/calculateStripes'
import houndazzleShapeWrapper from '../../houndazzle/houndazzleShapeWrapper'
import calculateDazzleForTile from '../../houndazzle/calculateDazzleForTile'
import standardShapeWrapper from './standardShapeWrapper'

const uniformTile = (args) => {
	if (state.shared.colorConfig.mode === 'HOUNDAZZLE') {
		houndazzleShapeWrapper(args)
	} else {
		standardShapeWrapper(args)
	}
}

const stripedTile = (args, stripes) => {
	stripes.forEach((stripeStart, stripeIndex) => {
		args.stripeIndex = stripeIndex
		args.coordinatesOptions = { stripeStart, stripeEnd: stripes[ stripeIndex + 1 ] || 2 }
		if (state.shared.colorConfig.mode === 'HOUNDAZZLE') {
			houndazzleShapeWrapper(args)
		} else {
			standardShapeWrapper(args)
		}
	})
}

export default ({ address, size, colors, rotation, initialDazzle }) => {
	const { stripeCountConfig, colorConfig } = state.shared

	const { origin, sizedUnit } = transpositionUtilities.calculateOriginAndSizedUnit({ address, size })

	colors = colorUtilities.calculateColors({ address, colors, colorConfig })

	const dazzle = calculateDazzleForTile({ address, initialDazzle })

	const args = { sizedUnit, origin, rotation, colors, dazzle }
	if (colorUtilities.isTileUniform({ colors, dazzle })) {
		uniformTile(args)
	} else {
		stripedTile(args, calculateStripes({ stripeCount: stripeCountConfig.stripeCount, address }))
	}
}
