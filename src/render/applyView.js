import viewUtilities from '../utilities/viewUtilities'

export default outline => {
	outline = viewUtilities.applyZoomAndScroll(outline)
	return viewUtilities.rotateOutlineAboutCanvasCenter(outline)
}
