import viewUtilities from '../utilities/viewUtilities'
import componentUtilities from '../utilities/componentUtilities'

export default (outline, { tileOrigin, tileSize }) => {
	outline = componentUtilities.adjustForBaseStripeDiagonal({ coordinates: outline, tileOrigin, tileSize })
	outline = viewUtilities.applyZoomAndScroll(outline)
	return viewUtilities.rotateOutlineAboutCanvasCenter(outline)
}
