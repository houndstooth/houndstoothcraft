import { defaultToTrue, deepClone } from '../utilities/codeUtilities'
import { shape, ShapeArgs } from '../render'
import { squareOutline, stripeOutline } from '../space'
import { PERIMETER_SCALAR } from '../constants'
import state from '../state'
import getStripePositionsForTile from './getStripePositionsForTile'
import getTileColorIndices from './getTileColorIndices'
import getTileOriginAndSize from './getTileOriginAndSize'
import isTileUniform from './isTileUniform'
import TileArgs from './TileArgs'

const tile: { ({}: { gridAddress: number[] }): void } = ({ gridAddress }) => {
	const { tileOrigin, tileSize } = getTileOriginAndSize({ gridAddress })
	if (!tileOrigin) {
		return
	}

	const tileColorIndices = getTileColorIndices({ gridAddress })
	const tileFunction = shouldUseSquare({ tileColorIndices }) ? squareTile : stripedTile
	tileFunction({ gridAddress, tileOrigin, tileSize, tileColorIndices })
}

const shouldUseSquare: { ({}: { tileColorIndices: number[] }): boolean } = ({ tileColorIndices }) => {
	const {
		collapseSameColoredShapesWithinTile,
	}: {
		collapseSameColoredShapesWithinTile?,
		} = state.mainHoundstooth.basePattern.tileSettings || {}
	const shouldCollapseSameColoredShapes = defaultToTrue(collapseSameColoredShapesWithinTile)
	return shouldCollapseSameColoredShapes && isTileUniform({ tileColorIndices })
}

const squareTile: Tile = args => {
	const squareArgs = getSquareArgs({ args })
	shape(squareArgs)
}

const stripedTile: Tile = args => {
	const stripePositions = getStripePositionsForTile({ gridAddress: args.gridAddress })
	stripePositions.forEach((stripeStart, stripeIndex) => {
		const stripeArgs = getStripeArgs({ args, stripeStart, stripeIndex, stripePositions })
		shape(stripeArgs)
	})
}

type GetSquareArgs = {
	({}: { args: TileArgs }): ShapeArgs,
}
const getSquareArgs: GetSquareArgs = ({ args }) => {
	const squareArgs = deepClone(args)

	squareArgs.getOutline = squareOutline

	return squareArgs
}

type GetStripeArgs = {
	({}: { args: TileArgs, stripeStart: number, stripeIndex: number, stripePositions: number[] }): ShapeArgs,
}
const getStripeArgs: GetStripeArgs = ({ args, stripeStart, stripeIndex, stripePositions }) => {
	const stripeArgs = deepClone(args)

	stripeArgs.getOutline = stripeOutline
	stripeArgs.stripeIndex = stripeIndex
	const stripeEnd = stripePositions[ stripeIndex + 1 ] || PERIMETER_SCALAR
	stripeArgs.outlineOptions = { stripeStart, stripeEnd }

	return stripeArgs
}

type Tile = {
	({}: TileArgs): void,
}

export default tile
