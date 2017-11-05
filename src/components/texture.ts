import { resetClip, setClip } from '../render'
import { TextureParams } from './types'

const texture: (_: TextureParams) => void =
	({ outline, tileSize, executeTexture, shapeColorIndex }: TextureParams): void => {
		setClip({ outline })

		executeTexture({ shapeColorIndex, tileSize })

		resetClip()
	}

export { texture }
