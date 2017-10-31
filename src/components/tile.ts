import { PERIMETER_SCALAR } from '../constants'
import { squareOutline, stripeOutline } from '../space'
import { getFromBaseOrDefaultPattern, TileSettings } from '../store'
import { getShapeColorIndices } from './getShapeColorIndices'
import { getStripePositionsForTile } from './getStripePositionsForTile'
import { isTileUniform } from './isTileUniform'
import { shape } from './shape'
import {
	DefinedTileParams,
	GetStripeArgsParams,
	ShapeArgs,
	ShapeColorIndex,
	ShapeParams,
	StripePosition,
	Tile,
	TileParams,
} from './types'

const tile: (_: DefinedTileParams) => void =
	({ gridAddress, tileOrigin, tileSize }: DefinedTileParams): void => {
		const shapeColorIndices: ShapeColorIndex[] = getShapeColorIndices({ gridAddress })
		const tileFunction: Tile = shouldUseSquare({ shapeColorIndices }) ? squareTile : stripedTile
		tileFunction({ gridAddress, tileOrigin, tileSize, shapeColorIndices })
	}

const shouldUseSquare: (_: { shapeColorIndices: ShapeColorIndex[] }) => boolean =
	({ shapeColorIndices }: { shapeColorIndices: ShapeColorIndex[] }): boolean => {
		const { collapseSameColoredShapesWithinTile }: TileSettings = getFromBaseOrDefaultPattern('tileSettings')

		return collapseSameColoredShapesWithinTile && isTileUniform({ shapeColorIndices })
	}

const squareTile: Tile =
	({ gridAddress, ...args }: TileParams): void => {
		const squareArgs: ShapeParams = getSquareArgs({ args })
		shape(squareArgs)
	}

const stripedTile: Tile =
	({ gridAddress, ...args }: TileParams): void => {
		const stripePositions: StripePosition[] = getStripePositionsForTile({ gridAddress })
		stripePositions.forEach((stripeStart: StripePosition, stripeIndex: number): void => {
			const stripeArgs: ShapeParams = getStripeArgs({ args, stripeStart, stripeIndex, stripePositions })
			shape(stripeArgs)
		})
	}

const getSquareArgs: (_: { args: ShapeArgs }) => ShapeParams =
	({ args }: { args: ShapeArgs }): ShapeParams => ({
		...args,
		getOutline: squareOutline,
	})

const getStripeArgs: (_: GetStripeArgsParams) => ShapeParams =
	({ args, stripeIndex, stripePositions, stripeStart }: GetStripeArgsParams): ShapeParams =>
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
