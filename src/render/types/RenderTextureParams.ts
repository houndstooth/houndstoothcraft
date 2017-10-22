import { ShapeColorIndex, TileOriginAndSize } from '../../components'
import { Context } from '../../page'

interface RenderTextureParams extends TileOriginAndSize {
	context: Context,
	shapeColorIndex: ShapeColorIndex,
	shapeColorIndices: ShapeColorIndex[],
}

export { RenderTextureParams }
