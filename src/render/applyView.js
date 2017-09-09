import applyZoomAndScroll from './applyZoomAndScroll'
import rotateOutlineAboutCanvasCenter from '../outlines/rotateOutlineAboutCanvasCenter'

export default outline => {
	outline = applyZoomAndScroll(outline)
	return rotateOutlineAboutCanvasCenter(outline)
}
