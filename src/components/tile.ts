import { PERIMETER_SCALAR } from '../constants'
import { Coordinate, squareOutline, stripeOutline } from '../space'
import { getFromBaseOrDefaultPattern, TileSettings } from '../store'
import { getShapeColorIndices } from './getShapeColorIndices'
import { getStripePositionsForTile } from './getStripePositionsForTile'
import { getTileOriginAndSize } from './getTileOriginAndSize'
import { isTileUniform } from './isTileUniform'
import { shape } from './shape'
import { Address, ShapeColorIndex, ShapeParams, StripePosition, Unit } from './types'

interface TileParams {
	gridAddress: Address,
	shapeColorIndices: ShapeColorIndex[],
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
	const shapeColorIndices = getShapeColorIndices({ gridAddress })
	const tileFunction = shouldUseSquare({ shapeColorIndices }) ? squareTile : stripedTile
	tileFunction({ gridAddress, tileOrigin, tileSize, shapeColorIndices })
}

const shouldUseSquare: (_: { shapeColorIndices: ShapeColorIndex[] }) => boolean = ({ shapeColorIndices }) => {
	const { collapseSameColoredShapesWithinTile }: TileSettings = getFromBaseOrDefaultPattern('tileSettings')

	return collapseSameColoredShapesWithinTile && isTileUniform({ shapeColorIndices })
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
