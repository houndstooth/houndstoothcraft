import colorUtilities from '../utilities/colorUtilities'
import codeUtilities from '../utilities/codeUtilities'
import shape from './shape'
import componentUtilities from '../utilities/componentUtilities'
import stripeUtilities from '../utilities/stripeUtilities'
import squareOutline from '../outlines/squareOutline'
import stripeOutline from '../outlines/stripeOutline'
import { PERIMETER_SCALAR } from '../constants'
import store from '../../store'

export default ({ gridAddress }) => {
	const { tileOrigin, tileSize } = componentUtilities.getTileOriginAndSize({ gridAddress })
	if (!tileOrigin) return

	const tileColorIndices = componentUtilities.getSetIndicesForTile({ gridAddress })

	const args = { gridAddress, tileOrigin, tileSize, tileColorIndices }
	convertTileToShapes({
		tileToShapesArgs: Object.assign({ args }, getTileToShapesArgs(store.mainHoundstooth.basePattern.tileSettings)),
		shouldUseUniform: shouldUseUniform({ tileColorIndices }),
	})
}

const getTileToShapesArgs = ({ getOutline } = {}) => ({
	whenTileIsUniform: getOutline && getOutline.whenTileIsUniform || squareOutline,
	whenTileIsMultiform: getOutline && getOutline.whenTileIsMultiform || stripeOutline,
})

const shouldUseUniform = ({ tileColorIndices }) => {
	const { collapseSameColoredShapesWithinTile } = store.mainHoundstooth.basePattern.tileSettings || {}
	const tileIsUniform = colorUtilities.isTileUniform({ tileColorIndices })
	const shouldCollapseSameColoredShapes = codeUtilities.defaultToTrue(collapseSameColoredShapesWithinTile)
	return shouldCollapseSameColoredShapes && tileIsUniform
}

const convertTileToShapes = ({ tileToShapesArgs, shouldUseUniform }) => {
	shouldUseUniform ? uniformTileToShapes(tileToShapesArgs) : multiformTileToShapes(tileToShapesArgs)
}

const uniformTileToShapes = ({ args, whenTileIsUniform }) => {
	args.getOutline = whenTileIsUniform
	shape(args)
}

const multiformTileToShapes = ({ args, whenTileIsMultiform }) => {
	const stripePositions = stripeUtilities.getStripePositionsForTile({ gridAddress: args.gridAddress })
	stripePositions.forEach((stripeStart, stripeIndex) => {
		const stripeArgs = getStripeArgs({ args, stripeStart, stripeIndex, stripePositions, whenTileIsMultiform })
		shape(stripeArgs)
	})
}

const getStripeArgs = ({ args, stripeStart, stripeIndex, stripePositions, whenTileIsMultiform }) => {
	const stripeArgs = codeUtilities.deepClone(args)

	stripeArgs.getOutline = whenTileIsMultiform
	stripeArgs.stripeIndex = stripeIndex
	const stripeEnd = stripePositions[ stripeIndex + 1 ] || PERIMETER_SCALAR
	stripeArgs.outlineOptions = { stripeStart, stripeEnd }

	return stripeArgs
}
