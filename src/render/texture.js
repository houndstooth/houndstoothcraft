import renderUtilities from '../utilities/renderUtilities'

export default textureArgs => {
	const { buildPath, clipPath, resetClip } = renderUtilities
	const { context, outline, renderTexture } = textureArgs

	buildPath({ context, outline })
	clipPath({ context })
	renderTexture(textureArgs)
	resetClip({ context })
}
