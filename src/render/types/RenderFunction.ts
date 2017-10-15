import { Outline, Coordinate } from '../../space'
import { TileColorIndices, Units } from '../../components'
import { Context } from '../../page'

type RenderTexture = {
	({}: {
		context: Context,
		outline: Outline,
		shapeColorIndex?: number
		tileColorIndices?: TileColorIndices,
		tileOrigin?: Coordinate,
		tileSize?: Units,
	}): void,
}

type RenderFunction = {
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
