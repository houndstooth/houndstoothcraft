import renderUtilities from '../utilities/renderUtilities'

export default ({ context, tileColors, tileOrigin, tileSize, colorsIndex, outline, renderTexture }) => {
	const { buildPath, clipPath, resetClip } = renderUtilities
	buildPath({ context, outline })
	clipPath({ context })
	renderTexture({ tileColors, tileOrigin, tileSize, colorsIndex })
	resetClip({ context })
}
