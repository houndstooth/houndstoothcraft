import { resetClip, setClip } from '../render'
import { TextureParams } from './types'

const texture: (_: TextureParams) => void = params => {
	const { outline, tileOrigin, tileSize, executeTexture, shapeColorIndex, shapeColorCount } = params
	setClip({ outline })

	executeTexture({ shapeColorIndex, shapeColorCount, tileOrigin, tileSize })

	resetClip()
}

export { texture }
