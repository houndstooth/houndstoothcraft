import { resetClip, setClip } from '../../app'
import { TextureParams } from './types'

const texture: (_: TextureParams) => void =
	({ outline, tileSize, executeTexture, shapeColorIndex }: TextureParams): void => {
		setClip.default({ outline })

		executeTexture({ shapeColorIndex, tileSize })

		resetClip.default()
	}

export default texture
