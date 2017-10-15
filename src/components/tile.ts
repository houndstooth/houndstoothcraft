import { defaultToTrue, deepClone } from '../utilities/codeUtilities'
import { shape, ShapeParams } from '../render'
import { squareOutline, stripeOutline, Coordinate } from '../space'
import { PERIMETER_SCALAR } from '../constants'
import state from '../state'
import getStripePositionsForTile from './getStripePositionsForTile'
import getTileColorIndices from './getTileColorIndices'
import getTileOriginAndSize from './getTileOriginAndSize'
import isTileUniform from './isTileUniform'
import { Address, StripePosition, TileColorIndices, Units } from './types'

type TileParams = { gridAddress: Address, tileOrigin: Coordinate, tileSize: Units, tileColorIndices: TileColorIndices }

type Tile = { ({}: TileParams): void }

const tile: { ({}: { gridAddress: Address }): void } = ({ gridAddress }) => {
	const { tileOrigin, tileSize } = getTileOriginAndSize({ gridAddress })
	if (!tileOrigin) {
		return
	}

	const tileColorIndices = getTileColorIndices({ gridAddress })
	const tileFunction = shouldUseSquare({ tileColorIndices }) ? squareTile : stripedTile
	tileFunction({ gridAddress, tileOrigin, tileSize, tileColorIndices })
}

const shouldUseSquare: { ({}: { tileColorIndices: TileColorIndices }): boolean } = ({ tileColorIndices }) => {
	const tileSettings = state.mainHoundstooth.basePattern.tileSettings || {}
	const { collapseSameColoredShapesWithinTile } = tileSettings
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
	({}: { args: TileParams }): ShapeParams,
}
const getSquareArgs: GetSquareArgs = ({ args }) => {
	const squareArgs = deepClone(args)

	squareArgs.getOutline = squareOutline

	return squareArgs
}

type GetStripeArgs = {
	({}: {
		args: TileParams,
		stripeStart: StripePosition,
		stripeIndex: number,
		stripePositions: StripePosition[],
	}): ShapeParams,
}
const getStripeArgs: GetStripeArgs = ({ args, stripeStart, stripeIndex, stripePositions }) => {
	const stripeArgs = deepClone(args)

	stripeArgs.getOutline = stripeOutline
	stripeArgs.stripeIndex = stripeIndex
	const stripeEnd = stripePositions[ stripeIndex + 1 ] || PERIMETER_SCALAR
	stripeArgs.outlineOptions = { stripeStart, stripeEnd }

	return stripeArgs
}

export default tile
