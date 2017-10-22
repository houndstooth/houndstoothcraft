import { TileColorIndices, TileOriginAndSize } from '../../components'
import { Context } from '../../page'

interface RenderTextureParams extends TileOriginAndSize {
	context: Context,
	shapeColorIndex: number,
	tileColorIndices: TileColorIndices,
}

export { RenderTextureParams }
