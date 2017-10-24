import { ExecuteTexture } from './ExecuteTexture'
import { SolidParams } from './SolidParams'
import { TileOriginAndSize } from './TileOriginAndSize'

interface TextureParams extends SolidParams, TileOriginAndSize {
	executeTexture: ExecuteTexture,
	shapeColorCount: number,
}

export { TextureParams }
