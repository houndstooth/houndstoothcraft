import { resetClip, setClip } from '../render'
import { TextureParams } from './types'

const texture: (_: TextureParams) => void =
	({ outline, tileOrigin, tileSize, executeTexture, shapeColorIndex }: TextureParams): void => {
		setClip({ outline })

		executeTexture({ shapeColorIndex, tileOrigin, tileSize })

		resetClip()
	}

export { texture }
