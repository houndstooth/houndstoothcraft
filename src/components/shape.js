import render from '../render/render'
import componentUtilities from '../utilities/componentUtilities'
import codeUtilities from '../utilities/codeUtilities'
import viewUtilities from '../utilities/viewUtilities'

export default ({ tileOrigin, tileSize, tileColors, colorsIndex, getOutline, outlineOptions }) => {
	const shapeColor = codeUtilities.wrappedIndex({ array: tileColors, index: colorsIndex })
	if (shapeColor.a === 0) return

	let outline = getOutline({ tileOrigin, tileSize, outlineOptions })
	if (!outline) return

	outline = componentUtilities.rotateCoordinatesAboutCanvasCenter({ coordinates: outline, tileOrigin, tileSize })

	outline = viewUtilities.applyZoomAndScroll({ coordinates: outline })
	outline = viewUtilities.rotateCoordinatesAboutCanvasCenter({ coordinates: outline })

	render({ shapeColor, outline })
}
