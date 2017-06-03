import state from '../state/state'
import colorUtilities from '../utilities/colorUtilities'
import calculateStripes from '../utilities/calculateStripes'
import houndazzleShapeWrapper from '../../houndazzle/houndazzleShapeWrapper'
import calculateDazzle from '../../houndazzle/calculateDazzle'
import standardShapeWrapper from './standardShapeWrapper'

export default ({ address }) => {
	const { stripeCountConfig, colorConfig } = state

	const colors = colorUtilities.calculateColors({ address, colorConfig })

	const dazzle = calculateDazzle({ address })

	const args = { address, colors, dazzle }
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
