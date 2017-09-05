import componentUtilities from '../utilities/componentUtilities'
import codeUtilities from '../utilities/codeUtilities'
import viewUtilities from '../utilities/viewUtilities'
import texture from './texture'
import renderUtilities from '../utilities/renderUtilities'
import store from '../../store'
import solid from './solid'

export default ({ tileOrigin, tileSize, tileColorIndices, stripeIndex, getOutline, outlineOptions }) => {
	let outline = getOutline({ tileOrigin, tileSize, outlineOptions })
	if (!outline) return

	outline = componentUtilities.rotateCoordinatesAboutTileCenter({ coordinates: outline, tileOrigin, tileSize })

	outline = viewUtilities.applyZoomAndScroll({ coordinates: outline })
	outline = viewUtilities.rotateCoordinatesAboutCanvasCenter({ coordinates: outline })

	const context = renderUtilities.getCurrentContext()
	const shapeColorIndex = codeUtilities.wrappedIndex({ array: tileColorIndices, index: stripeIndex })

	const textureSettings = store.mainHoundstooth.basePattern.textureSettings
	const renderTexture = textureSettings && textureSettings.renderTexture

	if (renderTexture) {
		texture({ context, outline, tileColorIndices, tileOrigin, tileSize, renderTexture, shapeColorIndex })
	}
	else {
		solid({ context, outline, shapeColorIndex })
	}
}
