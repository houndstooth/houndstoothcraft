import { buildPath } from './buildPath'
import { clipPath } from './clipPath'
import { resetClip } from './resetClip'
import { Texture } from './types'

const texture: Texture = textureArgs => {
	const { context, outline, renderTexture } = textureArgs

	buildPath({ context, outline })
	clipPath({ context })
	renderTexture(textureArgs)
	resetClip({ context })
}

export { texture }
