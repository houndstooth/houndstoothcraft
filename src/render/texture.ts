import { applyView } from '../view'
import { buildPath } from './buildPath'
import { clipPath } from './clipPath'
import { resetClip } from './resetClip'
import { Path, Texture } from './types'

const texture: Texture = params => {
	const { context, outline, tileOrigin, tileSize, renderTexture, shapeColorIndex, shapeColorCount } = params
	const path: Path = applyView(outline)
	buildPath({ context, path })
	clipPath({ context })

	renderTexture({ context, shapeColorIndex, shapeColorCount, tileOrigin, tileSize })

	resetClip({ context })
}

export { texture }
