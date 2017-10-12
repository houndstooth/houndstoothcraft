import { Outline, Coordinate } from '../../space'
import { TileColorIndices } from '../../components'

type RenderTexture = {
	({}: {
		context: CanvasRenderingContext2D,
		outline: Outline,
		shapeColorIndex?: number
		tileColorIndices?: TileColorIndices,
		tileOrigin?: Coordinate,
		tileSize?: number,
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
		tileSize?: number,
	}): void,
}

export default RenderFunction
