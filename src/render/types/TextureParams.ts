import { TileColorIndices } from '../../components'
import { RenderTexture } from './RenderTexture'
import { SolidParams } from './SolidParams'
import { TileOriginAndSize } from '../../components/types/TileOriginAndSize'

interface TextureParams extends SolidParams, TileOriginAndSize {
	renderTexture: RenderTexture,
	tileColorIndices: TileColorIndices,
}

export { TextureParams }
