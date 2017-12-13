import { ColorOptions, ShapeColorIndex } from '../color'
import { GetOutline, GetOutlineParams, Outline, OutlineAsParam } from '../stripe'
import { TileOriginAndSize, Unit } from '../tile'

interface ComponentParams extends ColorOptions, OutlineAsParam {
}

type ExecuteTexture = (_: ExecuteTextureParams) => void

interface ExecuteTextureParams extends ColorOptions {
	tileSize: Unit,
}

interface ShapeParams extends GetOutlineParams {
	getOutline: GetOutline,
	shapeColorIndices: ShapeColorIndex[],
	stripeIndex?: number,
}

interface SolidParams {
	outline: Outline,
	shapeColorIndex: ShapeColorIndex,
}

interface ShapeArgs extends TileOriginAndSize {
	shapeColorIndices: ShapeColorIndex[],
}

interface TextureParams extends ComponentParams {
	executeTexture: ExecuteTexture,
	tileSize: Unit,
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
