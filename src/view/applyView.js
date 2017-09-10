import applyZoom from './applyZoom'
import applyScroll from './applyScroll'
import applyTilt from './applyTilt'

export default outline => {
	outline = applyZoom(outline)
	outline = applyScroll(outline)
	outline = applyTilt(outline)
	return outline
}
