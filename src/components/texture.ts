import { resetClip, setClip } from '../render'
import { TextureParams } from './types'

const texture: (_: TextureParams) => void =
	({ outline, tileOrigin, tileSize, executeTexture, shapeColorIndex, shapeColorCount }: TextureParams): void => {
		setClip({ outline })

		executeTexture({ shapeColorIndex, shapeColorCount, tileOrigin, tileSize })

		resetClip()
	}

export { texture }
