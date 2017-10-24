import { resetClip, setClip } from '../render'
import { Texture } from './types'

const texture: Texture = params => {
	const { outline, tileOrigin, tileSize, executeTexture, shapeColorIndex, shapeColorCount } = params
	setClip({ outline })

	executeTexture({ shapeColorIndex, shapeColorCount, tileOrigin, tileSize })

	resetClip()
}

export { texture }
