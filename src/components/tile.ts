import { PERIMETER_SCALAR } from '../constants'
import { shape, ShapeParams } from '../render'
import { Coordinate, squareOutline, stripeOutline } from '../space'
import state from '../state'
import { defaultToTrue } from '../utilities/codeUtilities'
import getStripePositionsForTile from './getStripePositionsForTile'
import getTileColorIndices from './getTileColorIndices'
import getTileOriginAndSize from './getTileOriginAndSize'
import isTileUniform from './isTileUniform'
import { Address, StripePosition, TileColorIndices, Units } from './types'

type TileParams = { gridAddress: Address, tileColorIndices: TileColorIndices, tileOrigin: Coordinate, tileSize: Units }

const tile: { ({}: { gridAddress: Address }): void } = ({ gridAddress }) => {
	const { tileOrigin = undefined, tileSize = undefined } = getTileOriginAndSize({ gridAddress }) || {}

	let definedTileOrigin: Coordinate
	if (!tileOrigin) {
		return
	}
	else {
		definedTileOrigin = tileOrigin
	}

	let definedTileSize: Units
	if (!tileSize) {
		return
	}
	else {
		definedTileSize = tileSize
	}

	definedTile({ gridAddress, definedTileSize, definedTileOrigin })
}

const definedTile: {
	({}: { definedTileOrigin: Coordinate, definedTileSize: Units, gridAddress: Address }): void,
} = ({ gridAddress, definedTileOrigin: tileOrigin, definedTileSize: tileSize }) => {
	const tileColorIndices = getTileColorIndices({ gridAddress })
	const tileFunction = shouldUseSquare({ tileColorIndices }) ? squareTile : stripedTile
	tileFunction({ gridAddress, tileOrigin, tileSize, tileColorIndices })
}

const shouldUseSquare: { ({}: { tileColorIndices: TileColorIndices }): boolean } = ({ tileColorIndices }) => {
	const basePattern = state.mainHoundstooth.basePattern || {}
	const tileSettings = basePattern.tileSettings || {}
	const { collapseSameColoredShapesWithinTile } = tileSettings
	const shouldCollapseSameColoredShapes = defaultToTrue(collapseSameColoredShapesWithinTile)

	return !!shouldCollapseSameColoredShapes && isTileUniform({ tileColorIndices })
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
		stripeIndex: number,
		stripePositions: StripePosition[],
		stripeStart: StripePosition,
	}): ShapeParams,
} = ({ args, stripeIndex, stripePositions, stripeStart }) =>
	({
		...args,
		getOutline: stripeOutline,
		stripeIndex,
		outlineOptions: {
			stripeEnd: stripePositions[ stripeIndex + 1 ] || PERIMETER_SCALAR,
			stripeStart,
		},
	})

export default tile
