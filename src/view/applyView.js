import applyZoom from './applyZoom'
import applyScroll from './applyScroll'
import applyTilt from './applyTilt'

const applyView = outline => {
	outline = applyZoom(outline)
	outline = applyScroll(outline)
	outline = applyTilt(outline)
	return outline
}

export default applyView
