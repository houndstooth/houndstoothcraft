import { TileColorIndices, Units } from '../../components'
import { Context } from '../../page'
import { Coordinate, Outline } from '../../space'

interface RenderTexture {
	({}: {
		context: Context,
		outline: Outline,
		shapeColorIndex?: number
		tileColorIndices?: TileColorIndices,
		tileOrigin?: Coordinate,
		tileSize?: Units,
	}): void,
}

interface RenderFunction {
	({}: {
		context: Context,
		outline: Outline,
		renderTexture?: RenderTexture,
		shapeColorIndex?: number,
		tileColorIndices?: TileColorIndices
		tileOrigin?: Coordinate,
		tileSize?: Units,
	}): void,
}

export default RenderFunction
