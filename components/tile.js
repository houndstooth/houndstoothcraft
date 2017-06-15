import state from '../state/state'
import colorUtilities from '../utilities/colorUtilities'
import shape from './shape'
import transpositionUtilities from '../utilities/transpositionUtilities'
import combineShapesWithStripeShapes from './combineShapesWithEitherSquareShapeOrStripeShapes'

export default ({ address }) => {
	const { colorConfig } = state

	const tileColors = colorUtilities.getColorsForTile({ address, colorConfig })

	const { tileOrigin, sizedUnit } = transpositionUtilities.getTileOriginAndSizedUnit({ address })
	if (!tileOrigin) return

	const shapes = state.tileConfig.tileToShapes || shape

	const options = state.gatherOptions && state.gatherOptions({ address })
	combineShapesWithStripeShapes({ shapes, address, tileColors, tileOrigin, sizedUnit, options })
}
