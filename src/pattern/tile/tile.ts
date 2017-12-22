import { getShapeColorIndices, isTileUniform, ShapeColorIndex } from '../color'
import { PERIMETER_SCALAR } from '../constants'
import { AddressAsParam } from '../grid'
import { patternState } from '../patternState'
import { GetStripeArgsParams, getStripePositionsForTile, squareOutline, stripeOutline, StripePosition } from '../stripe'
import { shape, ShapeArgs, ShapeParams } from '../texture'
import { TileSettings } from './tileSettings'
import { Tile, TileParams } from './types'

const tile: (_: AddressAsParam) => void =
	({ address }: AddressAsParam): void => {
		const {
			tileOrigin = undefined,
			tileSize = undefined,
		} = patternState.tileSettings.getTileOriginAndSize({ address }) || {}

		if (!(tileOrigin && tileSize)) {
			return
		}

		const shapeColorIndices: ShapeColorIndex[] = getShapeColorIndices.default({ address })
		const tileFunction: Tile = shouldUseSquare({ shapeColorIndices }) ? squareTile : stripedTile
		tileFunction({ address, tileOrigin, tileSize, shapeColorIndices })
	}

const shouldUseSquare: (_: { shapeColorIndices: ShapeColorIndex[] }) => boolean =
	({ shapeColorIndices }: { shapeColorIndices: ShapeColorIndex[] }): boolean => {
		const { collapseSameColoredShapesWithinTile }: TileSettings = patternState.tileSettings

		return collapseSameColoredShapesWithinTile && isTileUniform.default({ shapeColorIndices })
	}

const squareTile: Tile =
	({ address, ...args }: TileParams): void => {
		const squareArgs: ShapeParams = getSquareArgs({ args })
		shape.default(squareArgs)
	}

const stripedTile: Tile =
	({ address, ...args }: TileParams): void => {
		const stripePositions: StripePosition[] = getStripePositionsForTile.default({ address })
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
