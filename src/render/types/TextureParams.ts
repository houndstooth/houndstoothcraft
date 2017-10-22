import { TileColorIndex } from '../../components'
import { TileOriginAndSize } from '../../components/types/TileOriginAndSize'
import { RenderTexture } from './RenderTexture'
import { SolidParams } from './SolidParams'

interface TextureParams extends SolidParams, TileOriginAndSize {
	renderTexture: RenderTexture,
	tileColorIndices: TileColorIndex[],
}

export { TextureParams }
