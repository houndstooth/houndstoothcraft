import buildPath from './buildPath'
import clipPath from './clipPath'
import resetClip from './resetClip'

export default textureArgs => {
	const { context, outline, renderTexture } = textureArgs

	buildPath({ context, outline })
	clipPath({ context })
	renderTexture(textureArgs)
	resetClip({ context })
}
