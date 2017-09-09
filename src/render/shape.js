import codeUtilities from '../utilities/codeUtilities'
import texture from './texture'
import display from '../display'
import store from '../../store'
import solid from './solid'

export default ({ tileOrigin, tileSize, tileColorIndices, stripeIndex, getOutline, outlineOptions }) => {
	let outline = getOutline({ tileOrigin, tileSize, outlineOptions })
	if (!outline) return

	const context = display.getCurrentContext()
	const shapeColorIndex = codeUtilities.wrappedIndex({ array: tileColorIndices, index: stripeIndex })

	const textureSettings = store.mainHoundstooth.basePattern.textureSettings
	const renderTexture = textureSettings && textureSettings.renderTexture

	const someArgs = { context, outline, tileColorIndices, tileOrigin, tileSize, renderTexture, shapeColorIndex }
	renderTexture ? texture(someArgs) : solid(someArgs)
}
