import codeUtilities from '../utilities/codeUtilities'
import texture from './texture'
import canvas from '../canvas'
import state from '../../state'
import solid from './solid'

export default ({ tileOrigin, tileSize, tileColorIndices, stripeIndex, getOutline, outlineOptions }) => {
	let outline = getOutline({ tileOrigin, tileSize, outlineOptions })
	if (!outline) return

	const context = canvas.getCurrentContext()
	const shapeColorIndex = codeUtilities.wrappedIndex({ array: tileColorIndices, index: stripeIndex })

	const textureSettings = state.mainHoundstooth.basePattern.textureSettings
	const renderTexture = textureSettings && textureSettings.renderTexture

	const someArgs = { context, outline, tileColorIndices, tileOrigin, tileSize, renderTexture, shapeColorIndex }
	renderTexture ? texture(someArgs) : solid(someArgs)
}
