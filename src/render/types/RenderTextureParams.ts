import { ShapeColorIndex, TileOriginAndSize } from '../../components'
import { Context } from '../../page'

interface RenderTextureParams extends TileOriginAndSize {
	context: Context,
	shapeColorCount: number,
	shapeColorIndex: ShapeColorIndex,
}

export { RenderTextureParams }
