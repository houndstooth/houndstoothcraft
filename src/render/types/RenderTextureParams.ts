import { TileColorIndex, TileOriginAndSize } from '../../components'
import { Context } from '../../page'

interface RenderTextureParams extends TileOriginAndSize {
	context: Context,
	shapeColorIndex: TileColorIndex,
	tileColorIndices: TileColorIndex[],
}

export { RenderTextureParams }
