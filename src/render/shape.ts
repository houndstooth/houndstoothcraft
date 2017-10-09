import { wrappedIndex } from '../utilities/codeUtilities'
import { getCurrentContext } from '../canvas'
import state from '../state'
import solid from './solid'
import texture from './texture'

const shape = ({ tileOrigin, tileSize, tileColorIndices, stripeIndex, getOutline, outlineOptions }) => {
	const outline = getOutline({ tileOrigin, tileSize, outlineOptions })
	if (!outline) return

	const context = getCurrentContext()
	const shapeColorIndex = wrappedIndex({ array: tileColorIndices, index: stripeIndex })

	const textureSettings = state.mainHoundstooth.basePattern.textureSettings
	const renderTexture = textureSettings && textureSettings.renderTexture

	const someArgs = { context, outline, tileColorIndices, tileOrigin, tileSize, renderTexture, shapeColorIndex }
	renderTexture ? texture(someArgs) : solid(someArgs)
}

export default shape
