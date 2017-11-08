import { ColorOptions, ShapeColorIndex } from '../color'
import { Unit } from '../grid'
import { GetOutline, GetOutlineParams, Outline, OutlineAsParam } from '../stripe'
import { TileOriginAndSize } from '../tile'

interface ComponentParams extends ColorOptions, OutlineAsParam {
}

type ExecuteTexture = (_: ExecuteTextureParams) => void

interface ExecuteTextureParams extends ColorOptions {
	readonly tileSize: Unit,
}

interface ShapeParams extends GetOutlineParams {
	readonly getOutline: GetOutline,
	readonly shapeColorIndices: ShapeColorIndex[],
	readonly stripeIndex?: number,
}

interface SolidParams {
	readonly outline: Outline,
	readonly shapeColorIndex: ShapeColorIndex,
}

interface ShapeArgs extends TileOriginAndSize {
	readonly shapeColorIndices: ShapeColorIndex[],
}

interface TextureParams extends ComponentParams {
	readonly executeTexture: ExecuteTexture,
	readonly tileSize: Unit,
}

export {
	ComponentParams,
	ExecuteTexture,
	ExecuteTextureParams,
	ShapeParams,
	SolidParams,
	ShapeArgs,
	TextureParams,
}
