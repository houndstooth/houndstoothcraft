import { defaultToTrue } from '../utilities/codeUtilities'
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

const squareTile: { ({}: TileParams): void } = args => {
	const squareArgs = getSquareArgs({ args })
	shape(squareArgs)
}

const stripedTile: { ({}: TileParams): void } = args => {
	const stripePositions = getStripePositionsForTile({ gridAddress: args.gridAddress })
	stripePositions.forEach((stripeStart, stripeIndex) => {
		const stripeArgs = getStripeArgs({ args, stripeStart, stripeIndex, stripePositions })
		shape(stripeArgs)
	})
}

const getSquareArgs: { ({}: { args: TileParams }): ShapeParams } = ({ args }) => ({
	...args,
	getOutline: squareOutline,
})

const getStripeArgs: {
	({}: {
		args: TileParams,
		stripeStart: StripePosition,
		stripeIndex: number,
		stripePositions: StripePosition[],
	}): ShapeParams,
} = ({ args, stripeStart, stripeIndex, stripePositions }) =>
	({
		...args,
		getOutline: stripeOutline,
		stripeIndex,
		outlineOptions: {
			stripeStart,
			stripeEnd: (stripePositions[ stripeIndex + 1 ] || PERIMETER_SCALAR) as StripePosition,
		},
	})

export default tile
