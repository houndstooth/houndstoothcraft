import { PERIMETER_SCALAR } from '../constants'
import { shape, ShapeParams } from '../render'
import { Coordinate, squareOutline, stripeOutline } from '../space'
import { getFromBaseOrDefaultPattern, TileSettings } from '../store'
import { defaultToTrue } from '../utilities/codeUtilities'
import { getStripePositionsForTile } from './getStripePositionsForTile'
import { getTileColorIndices } from './getTileColorIndices'
import { getTileOriginAndSize } from './getTileOriginAndSize'
import { isTileUniform } from './isTileUniform'
import { Address, StripePosition, TileColorIndices, Unit } from './types'

interface TileParams {
	gridAddress: Address,
	tileColorIndices: TileColorIndices,
	tileOrigin: Coordinate,
	tileSize: Unit
}

const tile: (_: { gridAddress: Address }) => void = ({ gridAddress }) => {
	const { tileOrigin = undefined, tileSize = undefined } = getTileOriginAndSize({ gridAddress }) || {}

	let definedTileOrigin: Coordinate
	if (!tileOrigin) {
		return
	}
	else {
		definedTileOrigin = tileOrigin
	}

	let definedTileSize: Unit
	if (!tileSize) {
		return
	}
	else {
		definedTileSize = tileSize
	}

	definedTile({ gridAddress, definedTileSize, definedTileOrigin })
}

const definedTile: (_: {
	definedTileOrigin: Coordinate, definedTileSize: Unit, gridAddress: Address,
}) => void = ({ gridAddress, definedTileOrigin: tileOrigin, definedTileSize: tileSize }) => {
	const tileColorIndices = getTileColorIndices({ gridAddress })
	const tileFunction = shouldUseSquare({ tileColorIndices }) ? squareTile : stripedTile
	tileFunction({ gridAddress, tileOrigin, tileSize, tileColorIndices })
}

const shouldUseSquare: (_: { tileColorIndices: TileColorIndices }) => boolean = ({ tileColorIndices }) => {
	const { collapseSameColoredShapesWithinTile }: TileSettings = getFromBaseOrDefaultPattern('tile')
	const shouldCollapseSameColoredShapes = defaultToTrue(collapseSameColoredShapesWithinTile)

	return !!shouldCollapseSameColoredShapes && isTileUniform({ tileColorIndices })
}

const squareTile: (_: TileParams) => void = args => {
	const squareArgs = getSquareArgs({ args })
	shape(squareArgs)
}

const stripedTile: (_: TileParams) => void = args => {
	const stripePositions = getStripePositionsForTile({ gridAddress: args.gridAddress })
	stripePositions.forEach((stripeStart, stripeIndex) => {
		const stripeArgs = getStripeArgs({ args, stripeStart, stripeIndex, stripePositions })
		shape(stripeArgs)
	})
}

const getSquareArgs: (_: { args: TileParams }) => ShapeParams = ({ args }) => ({
	...args,
	getOutline: squareOutline,
})

const getStripeArgs: (_: {
	args: TileParams,
	stripeIndex: number,
	stripePositions: StripePosition[],
	stripeStart: StripePosition,
}) => ShapeParams = ({ args, stripeIndex, stripePositions, stripeStart }) =>
	({
		...args,
		getOutline: stripeOutline,
		outlineOptions: {
			stripeEnd: stripePositions[ stripeIndex + 1 ] || PERIMETER_SCALAR,
			stripeStart,
		},
		stripeIndex,
	})

export { tile }
