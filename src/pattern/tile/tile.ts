import { PERIMETER_SCALAR } from '../../constants'
import { getShapeColorIndices, isTileUniform, ShapeColorIndex } from '../color'
import { patternState } from '../patternState'
import { GetStripeArgsParams, getStripePositionsForTile, squareOutline, stripeOutline, StripePosition } from '../stripe'
import { shape, ShapeArgs, ShapeParams } from '../texture'
import { TileSettings } from './tileSettings'
import { DefinedTileParams, Tile, TileParams } from './types'

const tile: (_: DefinedTileParams) => void =
	({ gridAddress, tileOrigin, tileSize }: DefinedTileParams): void => {
		const shapeColorIndices: ShapeColorIndex[] = getShapeColorIndices.default({ gridAddress })
		const tileFunction: Tile = shouldUseSquare({ shapeColorIndices }) ? squareTile : stripedTile
		tileFunction({ gridAddress, tileOrigin, tileSize, shapeColorIndices })
	}

const shouldUseSquare: (_: { shapeColorIndices: ShapeColorIndex[] }) => boolean =
	({ shapeColorIndices }: { shapeColorIndices: ShapeColorIndex[] }): boolean => {
		const { collapseSameColoredShapesWithinTile }: TileSettings = patternState.tileSettings

		return collapseSameColoredShapesWithinTile && isTileUniform.default({ shapeColorIndices })
	}

const squareTile: Tile =
	({ gridAddress, ...args }: TileParams): void => {
		const squareArgs: ShapeParams = getSquareArgs({ args })
		shape.default(squareArgs)
	}

const stripedTile: Tile =
	({ gridAddress, ...args }: TileParams): void => {
		const stripePositions: StripePosition[] = getStripePositionsForTile.default({ gridAddress })
		stripePositions.forEach((stripeStart: StripePosition, stripeIndex: number): void => {
			const stripeArgs: ShapeParams = getStripeArgs({ args, stripeStart, stripeIndex, stripePositions })
			shape.default(stripeArgs)
		})
	}

const getSquareArgs: (_: { args: ShapeArgs }) => ShapeParams =
	({ args }: { args: ShapeArgs }): ShapeParams => ({
		...args,
		getOutline: squareOutline.default,
	})

const getStripeArgs: (_: GetStripeArgsParams) => ShapeParams =
	({ args, stripeIndex, stripePositions, stripeStart }: GetStripeArgsParams): ShapeParams =>
		({
			...args,
			getOutline: stripeOutline.default,
			outlineOptions: {
				stripeEnd: stripePositions[ stripeIndex + 1 ] || PERIMETER_SCALAR,
				stripeStart,
			},
			stripeIndex,
		})

export default tile
