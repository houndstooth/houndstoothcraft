import { Outline, Coordinate } from '../../space'

type RenderFunction = {
	({}: {
		context: any,
		outline: Outline,
		renderTexture?: { ({}: {}): void },
		shapeColorIndex?: number,
		tileColorIndices?: number[]
		tileOrigin?: Coordinate,
		tileSize?: number,
	}): void,
}

export default RenderFunction
