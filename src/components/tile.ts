import { defaultToTrue, deepClone } from '../utilities/codeUtilities'
import { shape } from '../render'
import { squareOutline, stripeOutline } from '../space'
import { PERIMETER_SCALAR } from '../constants'
import state from '../state'
import getStripePositionsForTile from './getStripePositionsForTile'
import getTileColorIndices from './getTileColorIndices'
import getTileOriginAndSize from './getTileOriginAndSize'
import isTileUniform from './isTileUniform'

const tile = ({ gridAddress }) => {
	const { tileOrigin, tileSize } = getTileOriginAndSize({ gridAddress })
	if (!tileOrigin) {
		return
	}

	const tileColorIndices = getTileColorIndices({ gridAddress })
	const tileFunction = shouldUseSquare({ tileColorIndices }) ? squareTile : stripedTile
	tileFunction({ gridAddress, tileOrigin, tileSize, tileColorIndices })
}

const shouldUseSquare = ({ tileColorIndices }) => {
	const {
		collapseSameColoredShapesWithinTile,
	} : {
		collapseSameColoredShapesWithinTile?
		} = state.mainHoundstooth.basePattern.tileSettings || {}
	const shouldCollapseSameColoredShapes = defaultToTrue(collapseSameColoredShapesWithinTile)
	return shouldCollapseSameColoredShapes && isTileUniform({ tileColorIndices })
}

const squareTile = args => {
	args.getOutline = squareOutline
	shape(args)
}

const stripedTile = args => {
	const stripePositions = getStripePositionsForTile({ gridAddress: args.gridAddress })
	stripePositions.forEach((stripeStart, stripeIndex) => {
		const stripeArgs: any = getStripeArgs({ args, stripeStart, stripeIndex, stripePositions })
		shape(stripeArgs)
	})
}

const getStripeArgs = ({ args, stripeStart, stripeIndex, stripePositions }) => {
	const stripeArgs: any = deepClone(args)

	stripeArgs.getOutline = stripeOutline
	stripeArgs.stripeIndex = stripeIndex
	const stripeEnd = stripePositions[ stripeIndex + 1 ] || PERIMETER_SCALAR
	stripeArgs.outlineOptions = { stripeStart, stripeEnd }

	return stripeArgs
}

export default tile
