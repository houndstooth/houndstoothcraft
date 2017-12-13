import { ColorOptions, ShapeColorIndex } from '../color'
import { GetOutline, GetOutlineParams } from '../stripe'
import { Outline, TileOriginAndSize, Unit } from '../tile'

interface OutlineAsParam {
	outline: Outline,
}

interface TileSizeAsParam {
	tileSize: Unit,
}

interface ShapeColorIndicesAsParam {
	shapeColorIndices: ShapeColorIndex[],
}

interface ComponentParams extends ColorOptions, OutlineAsParam {
}

type ExecuteTexture = (_: ExecuteTextureParams) => void

interface ExecuteTextureParams extends ColorOptions, TileSizeAsParam {
}

interface ShapeParams extends GetOutlineParams, ShapeColorIndicesAsParam {
	getOutline: GetOutline,
	stripeIndex?: number,
}

interface SolidParams extends OutlineAsParam {
	shapeColorIndex: ShapeColorIndex,
}

interface ShapeArgs extends TileOriginAndSize, ShapeColorIndicesAsParam {
}

interface TextureParams extends ComponentParams, TileSizeAsParam {
	executeTexture: ExecuteTexture,
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
