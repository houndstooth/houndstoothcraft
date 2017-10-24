import { ShapeColorIndex, TileOriginAndSize } from '../'

interface ExecuteTextureParams extends TileOriginAndSize {
	shapeColorCount: number,
	shapeColorIndex: ShapeColorIndex,
}

export { ExecuteTextureParams }
