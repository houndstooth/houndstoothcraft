import { getFromBaseOrDefaultPattern } from '../../app'
import { PERIMETER_SCALAR } from '../../constants'
import { getShapeColorIndices, isTileUniform, ShapeColorIndex } from '../color'
import { GetStripeArgsParams, getStripePositionsForTile, squareOutline, stripeOutline, StripePosition } from '../stripe'
import { shape, ShapeArgs, ShapeParams } from '../texture'
import { TileSettings } from './tileSettings'
import { DefinedTileParams, Tile, TileParams } from './types'

const tile: (_: DefinedTileParams) => void =
	({ gridAddress, tileOrigin, tileSize }: DefinedTileParams): void => {
		const shapeColorIndices: ShapeColorIndex[] = getShapeColorIndices.main({ gridAddress })
		const tileFunction: Tile = shouldUseSquare({ shapeColorIndices }) ? squareTile : stripedTile
		tileFunction({ gridAddress, tileOrigin, tileSize, shapeColorIndices })
	}

const shouldUseSquare: (_: { shapeColorIndices: ShapeColorIndex[] }) => boolean =
	({ shapeColorIndices }: { shapeColorIndices: ShapeColorIndex[] }): boolean => {
		const { collapseSameColoredShapesWithinTile }: TileSettings = getFromBaseOrDefaultPattern.main('tileSettings')

		return collapseSameColoredShapesWithinTile && isTileUniform.main({ shapeColorIndices })
	}

const squareTile: Tile =
	({ gridAddress, ...args }: TileParams): void => {
		const squareArgs: ShapeParams = getSquareArgs({ args })
		shape.main(squareArgs)
	}

const stripedTile: Tile =
	({ gridAddress, ...args }: TileParams): void => {
		const stripePositions: StripePosition[] = getStripePositionsForTile.main({ gridAddress })
		stripePositions.forEach((stripeStart: StripePosition, stripeIndex: number): void => {
			const stripeArgs: ShapeParams = getStripeArgs({ args, stripeStart, stripeIndex, stripePositions })
			shape.main(stripeArgs)
		})
	}

const getSquareArgs: (_: { args: ShapeArgs }) => ShapeParams =
	({ args }: { args: ShapeArgs }): ShapeParams => ({
		...args,
		getOutline: squareOutline.main,
	})

const getStripeArgs: (_: GetStripeArgsParams) => ShapeParams =
	({ args, stripeIndex, stripePositions, stripeStart }: GetStripeArgsParams): ShapeParams =>
		({
			...args,
			getOutline: stripeOutline.main,
			outlineOptions: {
				stripeEnd: stripePositions[ stripeIndex + 1 ] || PERIMETER_SCALAR,
				stripeStart,
			},
			stripeIndex,
		})

export { tile as main }
