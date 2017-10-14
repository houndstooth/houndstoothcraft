import { Outline, Coordinate } from '../../space'
import { TileColorIndices, Units } from '../../components'

type RenderTexture = {
	({}: {
		context: CanvasRenderingContext2D,
		outline: Outline,
		shapeColorIndex?: number
		tileColorIndices?: TileColorIndices,
		tileOrigin?: Coordinate,
		tileSize?: Units,
	}): void,
}

type RenderFunction = {
	({}: {
		context: CanvasRenderingContext2D,
		outline: Outline,
		renderTexture?: RenderTexture,
		shapeColorIndex?: number,
		tileColorIndices?: TileColorIndices
		tileOrigin?: Coordinate,
		tileSize?: Units,
	}): void,
}

export default RenderFunction
