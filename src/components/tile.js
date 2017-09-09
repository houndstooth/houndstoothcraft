import isTileUniform from './isTileUniform'
import codeUtilities from '../utilities/codeUtilities'
import shape from '../render/shape'
import getTileColorIndices from '../components/getTileColorIndices'
import getTileOriginAndSize from '../components/getTileOriginAndSize'
import getStripePositionsForTile from './getStripePositionsForTile'
import squareOutline from '../outlines/squareOutline'
import stripeOutline from '../outlines/stripeOutline'
import { PERIMETER_SCALAR } from '../constants'
import store from '../../store'

export default ({ gridAddress }) => {
	const { tileOrigin, tileSize } = getTileOriginAndSize({ gridAddress })
	if (!tileOrigin) return

	const tileColorIndices = getTileColorIndices({ gridAddress })
	const args = { gridAddress, tileOrigin, tileSize, tileColorIndices }
	shouldUseSquare({ tileColorIndices }) ? squareTile(args) : stripedTile(args)
}

const shouldUseSquare = ({ tileColorIndices }) => {
	const { collapseSameColoredShapesWithinTile } = store.mainHoundstooth.basePattern.tileSettings || {}
	const tileCanBeCollapsed = isTileUniform({ tileColorIndices })
	const shouldCollapseSameColoredShapes = codeUtilities.defaultToTrue(collapseSameColoredShapesWithinTile)
	return shouldCollapseSameColoredShapes && tileCanBeCollapsed
}

const squareTile = args => {
	args.getOutline = squareOutline
	shape(args)
}

const stripedTile = args => {
	const stripePositions = getStripePositionsForTile({ gridAddress: args.gridAddress })
	stripePositions.forEach((stripeStart, stripeIndex) => {
		const stripeArgs = getStripeArgs({ args, stripeStart, stripeIndex, stripePositions })
		shape(stripeArgs)
	})
}

const getStripeArgs = ({ args, stripeStart, stripeIndex, stripePositions }) => {
	const stripeArgs = codeUtilities.deepClone(args)

	stripeArgs.getOutline = stripeOutline
	stripeArgs.stripeIndex = stripeIndex
	const stripeEnd = stripePositions[ stripeIndex + 1 ] || PERIMETER_SCALAR
	stripeArgs.outlineOptions = { stripeStart, stripeEnd }

	return stripeArgs
}
