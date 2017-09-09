import applyZoomAndScroll from './applyZoomAndScroll'
import rotateOutlineAboutCanvasCenter from './rotateOutlineAboutCanvasCenter'

export default outline => {
	outline = applyZoomAndScroll(outline)
	return rotateOutlineAboutCanvasCenter(outline)
}
